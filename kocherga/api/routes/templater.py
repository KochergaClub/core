import datetime
import re
import asyncio

from quart import Blueprint, request, render_template, make_response

import pyppeteer

from kocherga.api.auth import auth

bp = Blueprint('templater', __name__)

_browser = None
async def get_browser():
    global _browser
    if not _browser:
        _browser = pyppeteer.launch()
    return _browser

@bp.app_template_filter()
def parse_date(value, fmt):
    return datetime.datetime.strptime(value, fmt)

def get_args(args, form, host):
    result = {}

    for k, v in args.items():
        result[k] = v
    result.update(form)

    # Sorry, this is a hack - I can't find a way to extract the protocol from quart directly, so I have to use this heuristic:
    # everything localhost is http, everything else is https.
    schema = 'http' if host.startswith('localhost') else 'https'
    result['url_root'] = f'{schema}://{host}'

    return result

async def get_html(args, name):
    return await render_template(f'templater/{name}.html', **args)

@bp.route('/templater/html/<name>')
async def generate_html(name):
    return await get_html(
        get_args(request.args, await request.form, request.headers['Host']),
        name
    )

@bp.route('/templater/png/<name>')
async def generate_png(name):
    html = await get_html(
        get_args(request.args, await request.form, request.headers['Host']),
        name
    )

    (width, height) = (800, 600) # should we fast fail instead?
    match = re.search(r'<!-- width=(\d+) height=(\d+)', html)
    if match:
        (width, height) = (int(v) for v in match.groups())

    browser = await get_browser()
    page = await browser.newPage()
    await page.setViewport({
        'width': width,
        'height': height,
        'deviceScaleFactor': 2,
    })
    await page.goto(f'data:text/html,{html}', {
        'waitUntil': 'load',
        'timeout': 10000,
    })

    image_bytes = await page.screenshot()
    await page.close()

    response = await make_response(image_bytes)
    response.headers['Content-Type'] = 'image/png'
    return response
