import pyppeteer


async def get_browser():
    return await pyppeteer.connect({'browserWSEndpoint': 'ws://chrome:3000'})
