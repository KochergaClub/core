import logging

logger = logging.getLogger(__name__)

import time
from datetime import datetime
import sqlite3
import re

import pyppeteer

import kocherga.secrets

ELBA_CREDENTIALS = kocherga.secrets.json_secret("elba_credentials")

last_sms_guid = None


def get_last_code():
    global last_sms_guid

    start_ts = datetime.now().timestamp()

    conn = sqlite3.connect("/Users/berekuk/Library/Messages/chat.db")
    (guid, text, ts) = conn.execute(
        "SELECT guid, text, date FROM message WHERE text LIKE 'Код: %' ORDER BY date DESC LIMIT 1"
    ).fetchone()
    ts_base = (
        978307200
    )  # 2001-01-01 - see https://apple.stackexchange.com/questions/114168/dates-format-in-messages-chat-db
    ts += ts_base

    if guid == last_sms_guid:
        logger.info("We've already seen this sms, let's wait for another one")
        return

    if datetime.now().timestamp() - ts > 30:
        logger.info("Got a code, but it's too old, let's wait for another one")
        return

    match = re.match(r"Код: (\d+)", text)
    if not match:
        raise Exception("Impossible internal error")
    code = match.group(1)

    last_sms_guid = guid

    return code


def get_code():
    for i in range(20):
        code = get_last_code()
        if code:
            logger.info(f"CODE: {code}")
            return code
        time.sleep(1)

    raise Exception("Couldn't get a code")


async def begin_request(page):
    logger.info(f"Navigating to request options page")
    await page.click("#MainMenu_Reports_LinkText")
    await page.waitForNavigation()

    await page.click("#MainMenu_Reports_ReportingSubmenu_IonRequestsList_LinkText")
    await page.waitForNavigation()

    wants_input = await page.J("#CodeInput")
    if wants_input:
        code = get_code()
        await page.type("#CodeInput", code)
        await page.keyboard.press("Enter")
        await page.waitForNavigation()

    await page.click("#CreateRequestButton")
    await page.waitForNavigation()


async def fill_date_input(page, selector, d):
    await page.focus(selector)
    for i in range(15):
        await page.keyboard.press("Backspace")
        await page.keyboard.press("Delete")
    await page.keyboard.type(d.strftime("%d.%m.%Y"))


async def prepare_request_accounting(page, dt):
    logger.info(f"Preparing accounting request")
    await page.click("input[value=AccountingReference]")
    await fill_date_input(page, "#TypeRadioGroup_AccountingReferenceDate", dt)


async def prepare_request_operations(page, year):
    logger.info(f"Preparing operations request")
    await page.click("input[value=OperationsExcerpt]")
    await page.click("#TypeRadioGroup_OperationsExcerptSelect")
    await page.click(
        f'#TypeRadioGroup_OperationsExcerptSelect_Options li[key="{year}"]'
    )


async def prepare_request_declaration(page, year):
    logger.info(f"Preparing declaration request")
    await page.click("input[value=DeclarationList]")
    await page.click("#TypeRadioGroup_DeclarationListSelect")
    await page.click(f'#TypeRadioGroup_DeclarationListSelect_Options li[key="{year}"]')


async def request_anything(page):
    logger.info(f"Requesting...")
    await page.click("#SendReportViaCloud_SendInternetReportButton")

    await page.waitForSelector("#SendCloudReportLightbox_CodeInput", visible=True)
    code = get_code()
    await page.type("#SendCloudReportLightbox_CodeInput", code)
    await page.click("#SendCloudReportLightbox_AcceptButton")
    await page.waitForNavigation()
    logger.info(f"Request submitted")


async def elba_page():
    logger.info("Starting browser")
    browser = await pyppeteer.launch(
        headless=False,
        args=[
            "--disable-notifications"
        ],  # required to avoid the "do you want to enable notifications?" popup which blocks all page interactions
    )
    page = await browser.newPage()
    await page.setViewport(
        {"width": 1270, "height": 700}
    )  # left sidebar appears at 1260+ width

    logger.info("Going to elba")
    await page.goto("https://elba.kontur.ru")

    logger.info("Signing in")
    await page.type("#Email", ELBA_CREDENTIALS["email"])
    await page.type("#Password", ELBA_CREDENTIALS["password"])
    await page.keyboard.press("Enter")
    await page.waitForNavigation()

    logger.info("Signed in")

    return page


async def make_ion_requests(accounting_dates, operation_years, declaration_years):
    page = await elba_page()

    for d in accounting_dates:
        await begin_request(page)
        await prepare_request_accounting(page, d)
        await request_anything(page)

    for year in operation_years:
        await begin_request(page)
        await prepare_request_operations(page, year)
        await request_anything(page)

    for year in declaration_years:
        await begin_request(page)
        await prepare_request_declaration(page, year)
        await request_anything(page)

    time.sleep(
        3000
    )  # we run this on desktop anyway, so let's linger around to check that everything's ok


async def add_cash_income(data, start_pko_id, from_date=None):
    page = await elba_page()

    await page.click("#MainMenu_Payments_Link")
    await page.waitForNavigation()

    logger.info("Got to Payments page")

    pko_id = start_pko_id

    for row in data:
        logger.info(row["date"])
        income = row["clean_income"]
        if income == 0:
            logger.info("No income, skip")
            continue
        if income < 0:
            logger.warn("Negative income! Skip.")
            continue
        d = datetime.strptime(row["date"], "%Y-%m-%d").date()
        if from_date and d < from_date:
            logger.info("Too old, skip")
            continue

        await page.click("#CreateDebetButton")
        await page.waitForSelector(
            "#ComponentsHost_PaymentEditLightbox_IncomeSum", visible=True
        )
        await page.type(
            "#ComponentsHost_PaymentEditLightbox_IncomeSum", str(row["clean_income"])
        )
        await fill_date_input(page, "#ComponentsHost_PaymentEditLightbox_Date", d)

        await page.type(
            "#ComponentsHost_PaymentEditLightbox_PaymentDescription",
            f'ОФД: выручка за {d.strftime("%d.%m.%Y")}',
        )

        docnum_el = await page.J("#ComponentsHost_PaymentEditLightbox_DocumentNumber")
        await docnum_el.focus()
        for i in range(10):
            await docnum_el.press("Backspace")
        await docnum_el.type(str(pko_id))

        logger.info(
            f'Submitting a form for {d.strftime("%Y-%m-%d")}, pko id = {pko_id}'
        )
        await page.click("#ComponentsHost_PaymentEditLightbox_AcceptButton")
        await page.waitForSelector(".c-lightbox-overlay", hidden=True)

        pko_id += 1

    time.sleep(3000)
