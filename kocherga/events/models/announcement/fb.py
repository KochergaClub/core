import logging
logger = logging.getLogger(__name__)

import re
import asyncio
import requests

from django.conf import settings
from django.utils import timezone
from django.db import models
from annoying.fields import AutoOneToOneField

import kocherga.chrome
import kocherga.events.markup
from kocherga.images import image_storage
import kocherga.fb.api

from ..event import Event

PASSWORD = settings.KOCHERGA_FB_ANNOUNCER_PASSWORD

FB_CONFIG = settings.KOCHERGA_FB


class Manager(models.Manager):
    def all_groups(self):
        logger.info("Selecting all fb groups")
        query = self.values_list('group').distinct()
        groups = [row[0] for row in query.all()]
        logger.info(f"Got {len(groups)} groups")
        return groups


class FbAnnouncement(models.Model):
    event = AutoOneToOneField(Event, on_delete=models.CASCADE, related_name='fb_announcement')
    link = models.CharField(max_length=1024, blank=True)

    group = models.CharField(max_length=40, blank=True)

    added_to_main_page = models.BooleanField(default=False)
    shared_to_main_page = models.BooleanField(default=False)

    objects = Manager()

    async def create(self, headless=True, **kwargs):
        async with kocherga.chrome.get_browser() as browser:
            session = await AnnounceSession.create(browser)
            try:
                logger.info(f"Trying to create")
                return await session.run(self.group, self.event, **kwargs)
            except Exception:
                logger.exception(f"Error while creating a FB announcement")
                image_bytes = await session.screenshot()
                filename = image_storage.save_screenshot("error", image_bytes)
                logger.info(f"Screenshot saved to {filename}")
                raise

    def announce(self):
        loop = asyncio.get_event_loop()
        link = loop.run_until_complete(self.create())
        self.link = link
        if not self.group:
            self.added_to_main_page = True
            self.shared_to_main_page = True
        self.save()

    async def _extra_action(self, action):
        if not self.link:
            raise Exception("Event is not announced yet")
        if not self.group:
            raise Exception("Event already belongs to the main page")

        # TODO - copy-pasted; turn AnnounceSession into contextmanager?
        async with kocherga.chrome.get_browser() as browser:
            session = await AnnounceSession.create(browser)
            try:
                logger.info(f"Trying to perform action {action}")
                await session.extra_action(self.link, action)
            except Exception:
                logger.exception(f"Error while performing action {action}")
                image_bytes = await session.screenshot()
                filename = image_storage.save_screenshot("error", image_bytes)
                logger.info(f"Screenshot saved to {filename}")
                raise

    def add_to_main_page(self):
        loop = asyncio.get_event_loop()
        loop.run_until_complete(self._extra_action('add_to_main_page'))
        self.added_to_main_page = True
        self.save()

    def share_to_main_page(self):
        loop = asyncio.get_event_loop()
        loop.run_until_complete(self._extra_action('share_to_main_page'))
        self.shared_to_main_page = True
        self.save()


def get_image_id(fb_id: str):
    kocherga.fb.api.available()  # fail quickly if token is invalid

    # Facebook groups have a cover. Facebook pages have a picture.
    # We have to be smart about this because graph API returns an error if we ask a group for a picture.
    for field in ("picture", "cover"):
        try:
            j = kocherga.fb.api.get_by_id(fb_id, [field])
        except requests.exceptions.HTTPError:
            logger.exception(f"Can't read {fb_id}/{field}")
            continue

        logger.info(f"Got JSON for field {field}: {str(j)}")

        url = None
        if field == "cover":
            url = j["cover"]["source"]
        elif field == "picture":
            picture = j["picture"]
            if type(picture) == str:
                url = picture
            else:
                url = picture["data"]["url"]
        else:
            raise NotImplementedError

        match = re.match(r"https://.*?/v/.*?/p\d+x\d+/(\d+_\d+_\d+)", url)
        if not match:
            raise Exception(f"Unparsable FB image url: {url}")
        return match.group(1)

    logger.warning("Couldn't find picture or cover")
    return None


class AnnounceSession:
    @classmethod
    async def create(cls, browser):
        self = cls()
        self.page = await browser.newPage()
        await self.page.setViewport({
            'width': 1280,
            'height': 800,
        })
        return self

    async def clean_field(self, max_length=20, both_directions=False):
        for i in range(max_length):
            await self.page.keyboard.press("Backspace")
            if both_directions:
                await self.page.keyboard.press("Delete")

    async def fill_date_time(self, dt):
        dt = timezone.localtime(dt)
        await self.clean_field(15, both_directions=True)
        await self.page.keyboard.type(dt.strftime("%d.%m.%Y"))
        await self.page.keyboard.press("Tab")
        await self.page.keyboard.type(f"{dt.hour:02}")
        await self.page.keyboard.press("Tab")
        await self.page.keyboard.type(f"{dt.minute:02}")

    async def fill_dates(self, event):
        date_inputs = await self.page.JJ('input[placeholder="дд.мм.гггг"]')
        assert len(date_inputs) == 2  # There might be other date inputs on the page and we don't want to mess it up.

        # We assume that start input always precedes the end; this seems reasonable enough.
        await self.page.evaluate('(el) => el.focus()', date_inputs[0])
        await self.fill_date_time(event.start)

        await self.page.evaluate('(el) => el.focus()', date_inputs[1])
        await self.fill_date_time(event.end)

    async def select_from_listbox(self, fb_id):
        image_id = get_image_id(fb_id)
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
            except Exception:
                return False
        return False

    async def fill_entity(self, entity):
        if not entity.name:
            raise Exception("Having a name is a must")

        # Problems? See https://gitlab.com/kocherga/core/issues/26
        if entity.fb_id:
            logger.info(f'Looking for {entity.name} in listbox')
            prefix = '@' + entity.name[:20]
            await self.page.keyboard.type(prefix)
            selected = await self.select_from_listbox(entity.fb_id)
            if selected:
                return  # yay

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
            '//*[contains(concat(" ", @class, " "), " uiLayer ") and @data-testid="event_category_selector"]'
            + '//a//span[contains(text(), "Другое")]'
        )
        logger.info(f'Got {len(links)} items')
        if len(links):
            await links[0].click()

    async def fill_description(self, event):
        details = await self.page.J("[data-testid=event-create-dialog-details-field]")
        await details.click()

        description = event.description

        tail = (
            f"{event.timing_description} в антикафе Кочерга."
            " Оплата участия — по тарифам антикафе: 2,5 руб./минута."
        )

        timepad_link = event.timepad_announcement.link
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

        await asyncio.wait([
            page.keyboard.press("Enter"),
            page.waitForNavigation(),
        ])
        # TODO - waitForSelector
        logger.info("Signed in")

    def announce_page(self, group: str) -> str:
        if group:
            return f"https://www.facebook.com/groups/{group}"
        else:
            return settings.KOCHERGA_FB["main_page"]["announce_page"]

    async def run(self, group: str, event: Event, auto_confirm=True, select_self_location=True) -> str:
        page = self.page
        await self.sign_in()

        events_page = self.announce_page(group) + "/events/"
        logger.info("Going to page: " + events_page)
        await page.goto(events_page)
        await page.waitForSelector("[data-testid=event-create-button]", timeout=10000)

        logger.info("Opening an event creation form")
        await page.click("[data-testid=event-create-button]")

        dialog_selector = "[data-testid=event_create_dialog]"
        await page.waitForSelector(dialog_selector, timeout=10000)

        logger.info("Waiting for image selector")
        await page.waitForSelector("[data-testid=event-create-dialog-image-selector]")
        el = await page.J("[data-testid=event-create-dialog-image-selector]")
        image_file = event.image_file("default")
        logger.info(f"Uploading image {image_file}")
        await el.uploadFile(image_file)
        logger.info("Waiting for image to appear")
        await page.waitForFunction(
            'document.querySelector("[data-testid=event_create_dialog]")'
            '.innerText.includes("Перетащите, чтобы изменить положение")'
        )

        logger.info("Filling title")
        await page.focus("[data-testid=event-create-dialog-name-field]")
        await page.keyboard.type(event.title)

        logger.info("Filling where")
        await page.focus("[data-testid=event-create-dialog-where-field]")
        await self.clean_field(40)
        await page.keyboard.type(FB_CONFIG["main_page"]["name"])

        if select_self_location:
            await self.select_from_listbox(FB_CONFIG["main_page"]["id"])

        logger.info("Filling dates")
        await self.fill_dates(event)

        logger.info("Filling category if necessary")
        await self.fill_category()

        logger.info("Filling description")
        await self.fill_description(event)

        if not auto_confirm:
            return page

        logger.info("Confirming")
        await page.click("[data-testid=event-create-dialog-confirm-button]")

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

        return f'https://www.facebook.com/events/{event_id}'

    async def add_to_main_page(self, event_url):
        page = self.page
        await self.sign_in()

        logger.info("Going to page: " + event_url)
        await page.goto(event_url)

        await page.click('#admin_button_bar .uiPopover [aria-label="Ещё"]')

        link = '.uiLayer [title="Добавить на Страницу..."]'
        await page.waitForSelector(link)
        await page.click(link)

        dialog_el = await page.waitForXPath('//h3[text()="Добавить на Страницу"]/ancestor::*[@role="dialog"]')

        input_el = await dialog_el.J('input[name="target_page_id"]')
        parent_el = (await input_el.xpath('..'))[0]
        dropdown_el = await parent_el.J(':scope > a')
        await dropdown_el.click()

        controls_id = await page.evaluate('(el) => el.getAttribute("aria-controls")', dropdown_el)
        controls = '#' + controls_id
        controls_el = await page.J(controls)

        PAGE_TITLE = FB_CONFIG["main_page"]["name"]
        menu_items = await controls_el.xpath(
            './/*[@role="menuitemcheckbox"]//*[contains(text(), "' + PAGE_TITLE + '")]'
        )
        if len(menu_items) == 0:
            raise Exception(f"Page {PAGE_TITLE} not found in list")
        menu_el = menu_items[0]
        await menu_el.click()

        button_el = await dialog_el.J('.uiOverlayFooter button.layerConfirm')

        await asyncio.gather(
            button_el.click(),
            page.waitForNavigation(),
        )

        page_url = await page.evaluate('() => window.location.href')
        logger.info(f"URL: {page_url}")

        if not page_url.startswith('https://www.facebook.com/' + settings.KOCHERGA_FB["main_page"]["slug"] + '/events'):
            raise Exception(f"Expected to navigate to main page, got {page_url} instead")

    async def share_to_main_page(self, event_url):
        page = self.page
        await self.sign_in()

        logger.info("Going to page: " + event_url)
        await page.goto(event_url)

        share_menu_el = await page.J('#admin_button_bar .uiPopover [aria-label="Поделиться"]')
        await share_menu_el.hover()

        # TODO - extract this pattern into method (el -> controls_el)
        controls_id = await page.evaluate('(el) => el.getAttribute("aria-controls")', share_menu_el)
        controls = '#' + controls_id
        controls_el = await page.J(controls)

        # Open dialog.
        await (await controls_el.J('a[target="share_in_newsfeed_option"]')).click()

        # Wait for dialog to load.
        audience_menu_selector = \
            'div[data-testid="react_share_dialog_audience_selector"] > div.uiPopover > a[role="button"]'
        await page.waitForSelector(audience_menu_selector)
        dialog_el = await page.J('[data-testid="react_share_dialog_content"]')

        # Expand "pick audience type" menu.
        audience_menu_el = await dialog_el.J(audience_menu_selector)
        await audience_menu_el.click()

        # Now let's find dropdown element.

        # First, make sure that aria-controls attribute is set;
        # for this element it's not set initially for some reason.
        await page.waitForSelector(audience_menu_selector + '[aria-controls]')
        controls_id = await page.evaluate('(el) => el.getAttribute("aria-controls")', audience_menu_el)
        controls = '#' + controls_id
        controls_el = await page.J(controls)

        # Pick "share to page" option.
        item_el = await controls_el.J('[role="menuitemcheckbox"] [data-testid="share_to_page"]')
        await item_el.click()

        # Now let's expand page menu.
        page_menu_el = await dialog_el.J('div[inputid="audience_page"] > div.uiPopover > a[role="button"]')
        await page_menu_el.click()

        # Find dropdown...
        controls_id = await page.evaluate('(el) => el.getAttribute("aria-controls")', page_menu_el)
        controls = '#' + controls_id
        controls_el = await page.J(controls)

        # Pick the correct page from the dropdown.
        PAGE_TITLE = FB_CONFIG["main_page"]["name"]
        kocherga_item_list = await controls_el.xpath(
            './/*[@role="menuitemcheckbox"]//*[contains(text(), "' + PAGE_TITLE + '")]'
        )
        if len(kocherga_item_list) == 0:
            raise Exception(f"Page {PAGE_TITLE} not found in list")
        kocherga_page_el = kocherga_item_list[0]
        await kocherga_page_el.click()

        # Recreate the page menu button element, just to be sure.
        page_menu_el = await dialog_el.J('div[inputid="audience_page"] > div.uiPopover > a[role="button"]')
        # Check that page menu button now refers to the correct page.
        text_list = await page_menu_el.xpath(
            './/*[contains(text(), "' + PAGE_TITLE + '")]'
        )
        if len(text_list) == 0:
            raise Exception(f"{PAGE_TITLE} not found on page menu button")

        # Finally, share the event.
        button_el = await dialog_el.J('[data-testid="react_share_dialog_post_button"]')

        await asyncio.wait([
            button_el.click(),
            page.waitForNavigation(),
        ])

        # Checking that we navigated to the events page after sharing.
        page_url = await page.evaluate('() => window.location.href')
        logger.info(f"URL: {page_url}")

        if not page_url.startswith(event_url):
            raise Exception(f"Expected to navigate back to event page, got {page_url} instead")

    async def extra_action(self, event_url, action):
        if action == 'add_to_main_page':
            await self.add_to_main_page(event_url)
        elif action == 'share_to_main_page':
            await self.share_to_main_page(event_url)
        else:
            raise Exception(f"Unknown action {action}")

    async def screenshot(self):
        return await self.page.screenshot()
