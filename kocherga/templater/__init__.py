import logging
logger = logging.getLogger(__name__)

from django.conf import settings
import django.template.loader

import re

import pyppeteer

from .config import name2schema

_browser = None


async def get_browser(headless=True):
    global _browser
    if not _browser:
        logger.info("Launching new headless browser")
        _browser = await pyppeteer.launch(headless=headless)
        logger.info("Browser created")
    return _browser


class Template:
    def __init__(self, name, schema):
        self.name = name
        self.schema = schema

    @classmethod
    def by_name(cls, name):
        if name not in name2schema:
            raise Exception(f"Template {name} not found")

        return cls(name, name2schema[name])

    @property
    def sizes(self):
        source = open(self.template.origin.name, 'r').read()

        match = re.search(r"<!-- width=(\d+) height=(\d+)", source)
        (width, height) = (int(v) for v in match.groups())
        return (width, height)

    @property
    def template_file(self):
        return f'templater/{self.name}.html'

    @property
    def template(self):
        return django.template.loader.get_template(self.template_file)

    def generate_html(self, args):
        props = {}
        for field in self.schema.fields:
            if field.name in args:
                value = str(args[field.name])
                if field.value_type == 'int':
                    value = int(value)
                props[field.name] = value

        props['url_root'] = settings.KOCHERGA_API_ROOT

        return self.template.render(props)

    async def generate_png(self, props):
        html = self.generate_html(props)

        browser = await get_browser()
        logger.info('Getting browser page')
        page = await browser.newPage()

        try:
            (width, height) = self.sizes
            logger.info('Setting viewport')
            await page.setViewport(
                {"width": width, "height": height, "deviceScaleFactor": 2}  # retina
            )
            logger.info('Setting page html')
            await page.goto(f"data:text/html,{html}", {"waitUntil": "load", "timeout": 10000})

            logger.info('Making screenshot')
            image_bytes = await page.screenshot()
        finally:
            logger.info('Closing page')
            await page.close()

        logger.info('Returing image bytes')
        return image_bytes


def list_templates():
    return sorted(name2schema.keys())
