import logging
logger = logging.getLogger(__name__)

from pathlib import Path
import datetime
import re

import pyppeteer
import jinja2

from .config import name2schema

jinja_loader = jinja2.FileSystemLoader(
    str(Path(__file__).parent.parent.parent / 'http_api' / 'templates' / 'templater')
)

jinja_env = jinja2.Environment(loader=jinja_loader)

@jinja2.environmentfilter
def parse_date(env, value, fmt):
    return datetime.datetime.strptime(value, fmt)

jinja_env.filters['parse_date'] = parse_date

_browser = None
async def get_browser():
    global _browser
    if not _browser:
        _browser = await pyppeteer.launch()
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
        (source, _, _) = jinja_loader.get_source(jinja_env, self.template_file)

        match = re.search(r"<!-- width=(\d+) height=(\d+)", source)
        (width, height) = (int(v) for v in match.groups())
        return (width, height)

    @property
    def template_file(self):
        return f'{self.name}.html'

    @property
    def template(self):
        return jinja_env.get_template(f'{self.name}.html')

    def generate_html(self, props):
        return self.template.render(**props)

    async def generate_png(self, props):
        html = self.generate_html(props)

        browser = await get_browser()
        page = await browser.newPage()

        (width, height) = self.sizes
        await page.setViewport(
            {"width": width, "height": height, "deviceScaleFactor": 2}  # retina
        )
        await page.goto(f"data:text/html,{html}", {"waitUntil": "load", "timeout": 10000})

        image_bytes = await page.screenshot()
        return image_bytes

def list_templates():
    return sorted(name2schema.keys())
