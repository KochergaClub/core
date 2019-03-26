import pytest

import kocherga.chrome


@pytest.mark.asyncio
async def test_blank():
    pass


@pytest.mark.asyncio
async def test_initial_browser():
    browser = await kocherga.chrome.get_full_browser()
    assert browser.wsEndpoint.startswith('ws://')
    pages = await browser.pages()
    assert len(pages) == 1
    assert pages[0].url == 'about:blank'
    await browser.disconnect()


@pytest.mark.asyncio
async def test_get_browser():
    full_browser = await kocherga.chrome.get_full_browser()

    async with kocherga.chrome.get_browser() as browser:
        assert len(browser.targets()) == 0
        await browser.newPage()
        await browser.newPage()
        all_pages = await full_browser.pages()
        assert len(all_pages) == 3

    await full_browser.disconnect()
