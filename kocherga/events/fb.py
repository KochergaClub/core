import re
from collections import namedtuple
import logging
import asyncio

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

    parsed = kocherga.events.markup.parse(description)
    for part in parsed:
        if type(part) == str:
            await page.keyboard.type(part)
        elif type(part) == kocherga.events.markup.Entity:
            await fill_entity(page, entity)
        elif type(part) == kocherga.events.markup.SelfMention:
            await page.keyboard.type(FB_CONFIG['main_page']['autoreplace']['to'])
            await select_from_listbox(page, FB_CONFIG['main_page']['id'])
        else:
            raise Exception('unknown part encountered while parsing: ' + str(part))

async def create(event, debugging=False):
    browser = await pyppeteer.launch(
        headless=False if debugging else True,
        args=['--disable-notifications'] # required to avoid the "do you want to enable notifications?" popup which blocks all page interactions
    )
    print(browser.wsEndpoint)
    page = await browser.newPage()
    await page.goto('https://facebook.com')

    await page.focus('input[name=email]')
    await page.keyboard.type(FB_CONFIG['announcer_login'])

    await page.focus('input[name=pass]')
    await page.keyboard.type(PASSWORD)

    await page.keyboard.press('Enter')

    await page.waitForNavigation()

    events_page = event.fb_announce_page() + '/events'
    logging.debug('going to page:', events_page)
    await page.goto(events_page)
    await page.click('[data-testid=event-create-button]')

    await page.waitForSelector('[data-testid=event-create-dialog-name-field]')

    await page.waitForSelector('[data-testid=event-create-dialog-image-selector')
    el = await page.J('[data-testid=event-create-dialog-image-selector')
    await el.uploadFile(event.image_file('default'))

    await page.focus('[data-testid=event-create-dialog-name-field]')
    await page.keyboard.type(event.title)

    await page.focus('[data-testid=event-create-dialog-where-field]')
    await page.keyboard.type(FB_CONFIG['main_page']['name'])

    await select_from_listbox(page, FB_CONFIG['main_page']['id'])

    await page.focus('[data-testid=event-create-dialog-start-time] input[placeholder="дд.мм.гггг"]')
    await fill_date_time(page, event.start_dt)
    await page.focus('[data-testid=event-create-dialog-end-time] input[placeholder="дд.мм.гггг"]')
    await fill_date_time(page, event.end_dt)

    await fill_description(page, event.description)

    if debugging:
        # don't confirm
        return page

    await asyncio.gather([
        page.click('[data-testid=event-create-dialog-confirm-button]'),
        page.waitForNavigation()
    ])

    return FbAnnouncement(page.url)
