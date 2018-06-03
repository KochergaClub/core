import logging
logger = logging.getLogger(__name__)

import datetime
import re
import asyncio

from quart import Blueprint, request, render_template, make_response

import pyppeteer

import kocherga.config
from kocherga.api.auth import auth

bp = Blueprint("templater", __name__)

_browser = None


async def get_browser():
    global _browser
    if not _browser:
        _browser = await pyppeteer.launch()
    return _browser


@bp.app_template_filter()
def parse_date(value, fmt):
    return datetime.datetime.strptime(value, fmt)


def get_args(args, form):
    result = {}

    for k, v in args.items():
        result[k] = v
    result.update(form)

    result["url_root"] = kocherga.config.config()['web_root']

    return result


async def get_html(args, name):
    return await render_template(f"templater/{name}.html", **args)


@bp.route("/templater/html/<name>")
async def generate_html(name):
    return await get_html(
        get_args(request.args, await request.form), name
    )


@bp.route("/templater/png/<name>")
async def generate_png(name):
    html = await get_html(
        get_args(request.args, await request.form), name
    )

    (width, height) = (800, 600)  # should we fast fail instead?
    match = re.search(r"<!-- width=(\d+) height=(\d+)", html)
    if match:
        (width, height) = (int(v) for v in match.groups())

    logger.info("getting browser")
    browser = await get_browser()
    page = await browser.newPage()
    await page.setViewport(
        {"width": width, "height": height, "deviceScaleFactor": 2}  # retina
    )
    logger.info("calling goto")
    await page.goto(f"data:text/html,{html}", {"waitUntil": "load", "timeout": 10000})

    logger.info("calling screenshot")
    image_bytes = await page.screenshot()
    logger.info("calling close")
    await page.close()

    logger.info("calling make_response")
    response = await make_response(image_bytes)
    response.headers["Content-Type"] = "image/png"
    return response
