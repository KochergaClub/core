import re
from collections import namedtuple
import logging
import asyncio
from random import random
import requests

import pyppeteer

import kocherga.events.db
import kocherga.events.markup
import kocherga.config
import kocherga.secrets
from kocherga.images import image_storage
from kocherga.events.announcement import BaseAnnouncement

PASSWORD = kocherga.secrets.plain_secret('facebook_announcer_password')

FB_CONFIG = kocherga.config.config()['fb']

class FbAnnouncement(BaseAnnouncement):
    def __init__(self, link):
        self._link = link

    @property
    def link(self):
        return self._link

async def find_browser_page(endpoint):
    browser = await pyppeteer.launcher.connect({'browserWSEndpoint': endpoint})
    page = next(p for p in await browser.pages() if 'facebook' in p.url)
    return page

def get_image_id(fb_id: str, access_token: str):
    # Facebook groups have a cover. Facebook pages have a picture. We have to be smart about this because graph API returns an error if we ask a group for a picture.
    for field in ('picture', 'cover'):
        r = requests.get(f'https://graph.facebook.com/v2.12/{fb_id}', params={
            'access_token': access_token,
            'fields': field
        })
        if r.status_code != 200:
            logging.warn(f"Can't read {fb_id}/{field}: {r.status_code}, {str(r.json())}")
            continue
        logging.info(f'Got JSON for field {field}: {str(r.json())}')

        url = None
        if field == 'cover':
            url = r.json()['cover']['source']
        elif field == 'picture':
            picture = r.json()['picture']
            if type(picture) == str:
                url = picture
            else:
                url = picture['data']['url']
        else:
            raise NotImplemented
        match = re.match(r'https://.*?/v/.*?/p\d+x\d+/(\d+_\d+_\d+)', url)
        if not match:
            raise Exception(f'Unparsable FB image url: {url}')
        return match.group(1)
    raise Exception("Couldn't find picture or cover")


class AnnounceSession:
    def __init__(self):
        pass

    @classmethod
    async def create(cls, browser, access_token, event, auto_confirm=True, select_self_location=True):
        self = cls()
        self.page = await browser.newPage()
        self.event = event
        self.access_token = access_token
        self.auto_confirm = auto_confirm
        self.select_self_location = select_self_location
        return self

    async def clean_field(self, max_length=20, both_directions=False):
        for i in range(max_length):
            await self.page.keyboard.press('Backspace')
            if both_directions:
                await self.page.keyboard.press('Delete')

    async def fill_date_time(self, dt):
        await self.clean_field(15, both_directions=True)
        await self.page.keyboard.type(dt.strftime('%d.%m.%Y'))
        await self.page.keyboard.press('Tab')
        await self.page.keyboard.type(str(dt.hour))
        await self.page.keyboard.press('Tab')
        await self.page.keyboard.type(str(dt.minute))

    async def select_from_listbox(self, fb_id):
        image_id = get_image_id(fb_id, self.access_token)
        logging.info(f'Looking for image {image_id}')
        selector = f'[role=listbox] [src*="{image_id}"], [role=listbox] [style*="{image_id}"]'
        await self.page.waitForSelector(selector)
        await self.page.click(selector)

    async def fill_entity(self, entity):
        if not entity.name:
            raise Exception('Having a name is a must')
        await self.page.keyboard.type('@' + entity.name[:20])

        await self.select_from_listbox(entity.fb_id)

    async def fill_description(self, description):
        details = await self.page.J('[data-testid=event-create-dialog-details-field]')
        await details.click()

        markup_parts = kocherga.events.markup.parse_to_parts(description)
        for part in markup_parts:
            if isinstance(part, kocherga.events.markup.Text):
                await self.page.keyboard.type(part.text)
            elif isinstance(part, kocherga.events.markup.Entity):
                await self.fill_entity(part)
            elif isinstance(part, kocherga.events.markup.SelfMention):
                await self.page.keyboard.type(FB_CONFIG['main_page']['autoreplace']['to'])
                await self.select_from_listbox(FB_CONFIG['main_page']['id'])
            else:
                raise Exception('unknown part encountered while parsing: ' + str(part))

    async def run(self):
        page = self.page
        event = self.event

        logging.info('Going to facebook')
        await page.goto('https://facebook.com')

        logging.info('Signing in')
        await page.focus('input[name=email]')
        await page.keyboard.type(FB_CONFIG['announcer_login'])

        await page.focus('input[name=pass]')
        await page.keyboard.type(PASSWORD)

        await page.keyboard.press('Enter')

        await page.waitForNavigation()

        logging.info('Signed in')
        events_page = event.fb_announce_page() + '/events'
        logging.info('Going to page: ' + events_page)
        await page.goto(events_page)

        logging.info('Opening an event creation form')
        await page.click('[data-testid=event-create-button]')
        await page.waitForSelector('[data-testid=event-create-dialog-name-field]')

        logging.info('Uploading an image')
        await page.waitForSelector('[data-testid=event-create-dialog-image-selector')
        el = await page.J('[data-testid=event-create-dialog-image-selector')
        await el.uploadFile(event.image_file('default'))

        logging.info('Filling title')
        await page.focus('[data-testid=event-create-dialog-name-field]')
        await page.keyboard.type(event.title)

        logging.info('Filling where')
        await page.focus('[data-testid=event-create-dialog-where-field]')
        await self.clean_field(40)
        await page.keyboard.type(FB_CONFIG['main_page']['name'])

        if self.select_self_location:
            await self.select_from_listbox(FB_CONFIG['main_page']['id'])

        logging.info('Filling dates')
        await page.focus('[data-testid=event-create-dialog-start-time] input[placeholder="дд.мм.гггг"]')
        await self.fill_date_time(event.start_dt)
        await page.focus('[data-testid=event-create-dialog-end-time] input[placeholder="дд.мм.гггг"]')
        await self.fill_date_time(event.end_dt)

        logging.info('Filling description')
        await self.fill_description(event.description)

        if not self.auto_confirm:
            return page

        logging.info('Confirming')
        await page.click('[data-testid=event-create-dialog-confirm-button]')
        await page.waitForSelector('h1[data-testid=event-permalink-event-name]')

        return FbAnnouncement(page.url)

    async def screenshot(self):
        return await self.page.screenshot()


# FB access tokens are portable (see https://developers.facebook.com/docs/facebook-login/access-tokens/portability),
# so it's not a hack that we usually bring a token from a client from a client side to server to make an announcement.
#
# It _is_ a hack that we use headless Chrome (through pyppeteer), though - FB dosn't have an API for creating an event.
async def create(event, access_token, headless=True, **kwargs):
    browser = await pyppeteer.launch(
        headless=headless,
        args=['--disable-notifications'] # required to avoid the "do you want to enable notifications?" popup which blocks all page interactions
    )
    logging.info(f'Started browser at {browser.wsEndpoint}')

    session = await AnnounceSession.create(browser, access_token, event, **kwargs)
    try:
        logging.info(f'Trying to create')
        return await session.run()
    except Exception as e:
        logging.info(f'Error while creating a FB announcement: {str(e)}')
        image_bytes = await session.screenshot()
        filename = image_storage.save_screenshot('error', image_bytes)
        logging.info(f'Screenshot saved to {filename}')
        raise
