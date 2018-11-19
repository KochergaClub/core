import logging
logger = logging.getLogger(__name__)

import re
from collections import namedtuple
from random import random
import traceback

import asyncio
import requests

import pyppeteer

from kocherga.db import Session
from kocherga.events.event import Event
import kocherga.events.db
import kocherga.events.markup
import kocherga.config
import kocherga.secrets
from kocherga.images import image_storage
from kocherga.events.announcement import BaseAnnouncement

PASSWORD = kocherga.secrets.plain_secret("facebook_announcer_password")

FB_CONFIG = kocherga.config.config()["fb"]


class FbAnnouncement(BaseAnnouncement):

    def __init__(self, link):
        self._link = link

    @property
    def link(self):
        return self._link

def all_groups():
    logger.info("Selecting all fb groups")
    query = Session().query(Event.fb_group.distinct().label("fb_group"))
    groups = [row.fb_group for row in query.all()]
    logger.info(f"Got {len(groups)} groups")
    return groups

async def find_browser_page(endpoint):
    browser = await pyppeteer.launcher.connect({"browserWSEndpoint": endpoint})
    page = next(p for p in await browser.pages() if "facebook" in p.url)
    return page


def get_image_id(fb_id: str, access_token: str):
    # Facebook groups have a cover. Facebook pages have a picture. We have to be smart about this because graph API returns an error if we ask a group for a picture.
    for field in ("picture", "cover"):
        r = requests.get(
            f"https://graph.facebook.com/v2.12/{fb_id}",
            params={"access_token": access_token, "fields": field},
        )
        if r.status_code != 200:
            logger.warn(f"Can't read {fb_id}/{field}: {r.status_code}, {str(r.json())}")
            continue
        logger.info(f"Got JSON for field {field}: {str(r.json())}")

        url = None
        if field == "cover":
            url = r.json()["cover"]["source"]
        elif field == "picture":
            picture = r.json()["picture"]
            if type(picture) == str:
                url = picture
            else:
                url = picture["data"]["url"]
        else:
            raise NotImplemented
        match = re.match(r"https://.*?/v/.*?/p\d+x\d+/(\d+_\d+_\d+)", url)
        if not match:
            raise Exception(f"Unparsable FB image url: {url}")
        return match.group(1)

    logger.warning("Couldn't find picture or cover")
    return None


class AnnounceSession:

    def __init__(self):
        pass

    @classmethod
    async def create(
        cls, browser, access_token, event, auto_confirm=True, select_self_location=True
    ):
        self = cls()
        self.page = await browser.newPage()
        self.event = event
        self.access_token = access_token
        self.auto_confirm = auto_confirm
        self.select_self_location = select_self_location
        return self

    async def clean_field(self, max_length=20, both_directions=False):
        for i in range(max_length):
            await self.page.keyboard.press("Backspace")
            if both_directions:
                await self.page.keyboard.press("Delete")

    async def fill_date_time(self, dt):
        await self.clean_field(15, both_directions=True)
        await self.page.keyboard.type(dt.strftime("%d.%m.%Y"))
        await self.page.keyboard.press("Tab")
        await self.page.keyboard.type(f"{dt.hour:02}")
        await self.page.keyboard.press("Tab")
        await self.page.keyboard.type(f"{dt.minute:02}")

    async def select_from_listbox(self, fb_id):
        image_id = get_image_id(fb_id, self.access_token)
        if not image_id:
            return False

        logger.info(f"Looking for image {image_id}")
        await self.page.waitForSelector('[role=listbox]')
        selector = (
            f'[role=listbox] [src*="{image_id}"], [role=listbox] [style*="{image_id}"]'
        )
        if await self.page.J(selector):
            try:
                logger.info("Clicking on listbox item")
                await self.page.click(selector)
                logger.info("Listbox click succeeded")
                return True
            except:
                return False
        return False

    async def fill_entity(self, entity):
        if not entity.name:
            raise Exception("Having a name is a must")

        # Problems? See https://gitlab.com/kocherga/code/core/issues/26
        if entity.fb_id:
            logger.info(f'Looking for {entity.name} in listbox')
            prefix = '@' + entity.name[:20]
            await self.page.keyboard.type(prefix)
            selected = await self.select_from_listbox(entity.fb_id)
            if selected:
                return # yay

            logger.info('Listbox failed, rollback and type entity name as is')
            for i in range(len(prefix)):
                await self.page.keyboard.press("Backspace")

        await self.page.keyboard.type(entity.name)

    async def fill_category(self):
        dropdown = await self.page.J(".uiPopover[data-testid=event_category_selector]")
        if not dropdown:
            return
        await dropdown.click()

        logger.info('Waiting for dropdown list to appear')
        await self.page.waitForSelector('.uiLayer[data-testid=event_category_selector]')

        logger.info('Looking for "Другое" item')
        links = await self.page.xpath(
            '//*[contains(concat(" ", @class, " "), " uiLayer ") and @data-testid="event_category_selector"]//a//span[contains(text(), "Другое")]'
        )
        logger.info(f'Got {len(links)} items')
        if len(links):
            await links[0].click()

    async def fill_description(self):
        details = await self.page.J("[data-testid=event-create-dialog-details-field]")
        await details.click()

        description = self.event.description

        tail = (
            f"{self.event.timing_description} в антикафе Кочерга. Оплата участия — по тарифам антикафе: 2,5 руб./минута."
        )

        timepad_link = self.event.posted_timepad
        if timepad_link:
            tail += " Регистрация: {}".format(timepad_link)

        markup_parts = kocherga.events.markup.parse_to_parts(
            description + "\n\n***\n" + tail
        )

        for part in markup_parts:
            if isinstance(part, kocherga.events.markup.Text):
                await self.page.keyboard.type(part.text)
            elif isinstance(part, kocherga.events.markup.Entity):
                await self.fill_entity(part)
            elif isinstance(part, kocherga.events.markup.SelfMention):
                await self.page.keyboard.type(
                    FB_CONFIG["main_page"]["autoreplace"]["to"]
                )
                await self.select_from_listbox(FB_CONFIG["main_page"]["id"])
            else:
                raise Exception("unknown part encountered while parsing: " + str(part))

    async def sign_in(self):
        page = self.page

        logger.info("Going to facebook")
        await page.goto("https://facebook.com")

        logger.info("Signing in")
        await page.focus("input[name=email]")
        await page.keyboard.type(FB_CONFIG["announcer_login"])

        await page.focus("input[name=pass]")
        await page.keyboard.type(PASSWORD)

        await page.keyboard.press("Enter")

        await page.waitForNavigation()
        logger.info("Signed in")

    async def run(self):
        page = self.page
        await page.setViewport({
            'width': 1280,
            'height': 800,
        })

        await self.sign_in()

        event = self.event

        events_page = event.fb_announce_page() + "/events"
        logger.info("Going to page: " + events_page)
        await page.goto(events_page)

        logger.info("Opening an event creation form")
        await page.click("[data-testid=event-create-button]")
        await page.waitForSelector("[data-testid=event-create-dialog-name-field]")

        logger.info("Uploading an image")
        await page.waitForSelector("[data-testid=event-create-dialog-image-selector")
        el = await page.J("[data-testid=event-create-dialog-image-selector")
        await el.uploadFile(event.image_file("default"))

        logger.info("Filling title")
        await page.focus("[data-testid=event-create-dialog-name-field]")
        await page.keyboard.type(event.title)

        logger.info("Filling where")
        await page.focus("[data-testid=event-create-dialog-where-field]")
        await self.clean_field(40)
        await page.keyboard.type(FB_CONFIG["main_page"]["name"])

        if self.select_self_location:
            await self.select_from_listbox(FB_CONFIG["main_page"]["id"])

        logger.info("Filling dates")
        await page.focus(
            '[data-testid=event-create-dialog-start-time] input[placeholder="дд.мм.гггг"]'
        )
        await self.fill_date_time(event.start_dt)
        await page.focus(
            '[data-testid=event-create-dialog-end-time] input[placeholder="дд.мм.гггг"]'
        )
        await self.fill_date_time(event.end_dt)

        logger.info("Filling category if necessary")
        await self.fill_category()

        logger.info("Filling description")
        await self.fill_description()

        if not self.auto_confirm:
            return page

        logger.info("Confirming")
        # This commented code is unstable, although it seems like there *is* a navigation happening, but it doesn't fire for some reason.
        # (Maybe it doesn't fire because it's emulated via history.pushSate()?)

        #await asyncio.gather(
        #    page.waitForNavigation(waitUntil="documentloaded", timeout=180000),
        #    page.click("[data-testid=event-create-dialog-confirm-button]", timeout=180000),
        #)
        await page.click("[data-testid=event-create-dialog-confirm-button]", timeout=180000)

        logger.info(f"Clicked confirm button, waiting for title to appear")
        await page.waitForSelector("h1#seo_h1_tag[data-testid=event-permalink-event-name]")

        logger.info(f"Confirmed")

        # page.url is invalid because waitForNavigation is broken
        page_url = await page.evaluate('() => window.location.href')
        logger.info(f"URL: {page_url}")

        match = re.match(r'https://(?:www|business)\.facebook\.com/events/(\d+)/?(?:$|\?)', page_url)
        if not match:
            raise Exception(f"Expected '/events/' in page url, got: {page_url}")

        event_id = match.group(1)

        return FbAnnouncement(f'https://www.facebook.com/events/{event_id}')

    async def screenshot(self):
        return await self.page.screenshot()


async def get_browser(headless):
    browser = await pyppeteer.launch(
        headless=headless,
        args=[
            "--disable-notifications"
        ],  # required to avoid the "do you want to enable notifications?" popup which blocks all page interactions
    )
    logger.info(f"Started browser at {browser.wsEndpoint}")
    return browser


# FB access tokens are portable (see https://developers.facebook.com/docs/facebook-login/access-tokens/portability),
# so it's not a hack that we usually bring a token from a client side to server to make an announcement.
#
# It _is_ a hack that we use headless Chrome (through pyppeteer), though - FB dosn't have an API for creating an event.
async def create(event, access_token, headless=True, **kwargs):
    browser = await get_browser(headless)

    session = await AnnounceSession.create(browser, access_token, event, **kwargs)
    try:
        logger.info(f"Trying to create")
        return await session.run()
    except Exception as e:
        logger.info(f"Error while creating a FB announcement:\n" + traceback.format_exc())
        traceback.print_exc()
        image_bytes = await session.screenshot()
        filename = image_storage.save_screenshot("error", image_bytes)
        logger.info(f"Screenshot saved to {filename}")
        raise
