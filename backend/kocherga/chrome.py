import logging
logger = logging.getLogger(__name__)

import contextlib

import requests
import pyppeteer

ENDPOINT = 'core-chrome:9222'  # TODO - move to settings


def get_websocket():
    # We run headless chrome in docker container named `chrome`.
    # ws://ENDPOINT is not enough - we have to get the actual websocket URL first.
    r = requests.get(
        f"http://{ENDPOINT}/json/version",
        headers={
            'Host': '',  # see https://github.com/cyrus-and/chrome-remote-interface/issues/340#issuecomment-384598817
        }
    )
    r.raise_for_status()

    ws = r.json()['webSocketDebuggerUrl']
    ws = ws.replace('ws:///', f"ws://{ENDPOINT}/")
    logger.info(f"Headless chrome's websocket: {ws}")
    return ws


async def get_full_browser():
    ws = get_websocket()
    browser = await pyppeteer.connect({'browserWSEndpoint': ws})
    return browser


@contextlib.asynccontextmanager
async def get_browser():
    browser = await get_full_browser()
    context = await browser.createIncognitoBrowserContext()
    try:
        yield context
    finally:
        await context.close()
