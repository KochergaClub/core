import re
from collections import namedtuple
import logging
import asyncio
from random import random

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

async def fill_date_time(page, dt):
    for i in range(15):
        await page.keyboard.press('Backspace')
        await page.keyboard.press('Delete')
    await page.keyboard.type(dt.strftime('%d.%m.%Y'))
    await page.keyboard.press('Tab')
    await page.keyboard.type(str(dt.hour))
    await page.keyboard.press('Tab')
    await page.keyboard.type(str(dt.minute))

async def select_from_listbox(page, fb_id):
    selector = f'[role=listbox] [src*="{fb_id}"], [role=listbox] [style*="{fb_id}"]'
    await page.waitForSelector(selector)
    await page.click(selector)

async def fill_entity(page, entity):
    if not entity.name:
        raise Exception('Having a name is a must')
    await page.keyboard.type('@' + entity.name[:20])

    await select_from_listbox(page, entity.fb_id)

async def fill_description(page, description):
    details = await page.J('[data-testid=event-create-dialog-details-field]')
    await details.click()

    markup_parts = kocherga.events.markup.parse_to_parts(description)
    for part in markup_parts:
        if isinstance(part, kocherga.events.markup.Text):
            await page.keyboard.type(part.text)
        elif isinstance(part, kocherga.events.markup.Entity):
            await fill_entity(page, part)
        elif isinstance(part, kocherga.events.markup.SelfMention):
            await page.keyboard.type(FB_CONFIG['main_page']['autoreplace']['to'])
            await select_from_listbox(page, FB_CONFIG['main_page']['id'])
        else:
            raise Exception('unknown part encountered while parsing: ' + str(part))

async def _create(page, event, debugging):
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
    await page.keyboard.type(FB_CONFIG['main_page']['name'])

    await select_from_listbox(page, FB_CONFIG['main_page']['id'])

    logging.info('Filling dates')
    await page.focus('[data-testid=event-create-dialog-start-time] input[placeholder="дд.мм.гггг"]')
    await fill_date_time(page, event.start_dt)
    await page.focus('[data-testid=event-create-dialog-end-time] input[placeholder="дд.мм.гггг"]')
    await fill_date_time(page, event.end_dt)

    logging.info('Filling description')
    await fill_description(page, event.description)

    if debugging:
        # don't confirm
        return page

    logging.info('Confirming')
    await asyncio.gather(
        page.click('[data-testid=event-create-dialog-confirm-button]'),
        page.waitForNavigation()
    )

    return FbAnnouncement(page.url)

async def create(event, debugging=False):
    browser = await pyppeteer.launch(
        headless=False if debugging else True,
        args=['--disable-notifications'] # required to avoid the "do you want to enable notifications?" popup which blocks all page interactions
    )
    logging.info(f'Started browser at {browser.wsEndpoint}')
    page = await browser.newPage()

    try:
        return await _create(page, event, debugging)
    except Exception as e:
        logging.info(f'Error while creating a FB announcement: {str(e)}')
        image_bytes = await page.screenshot()
        image_storage.save_screenshot('error', image_bytes)
        logging.info(f'Screenshot saved')
        raise
