import logging

logger = logging.getLogger(__name__)

import subprocess
import os

import pyppeteer

import kocherga.google

SECTIONS = [
    {"id": "1.1", "name": "Введение, день 1"},
    {"id": "1.2", "name": "Факторизация целей"},
    {"id": "1.3", "name": "Внутренний симулятор"},
    {"id": "1.4", "name": "Премортемы"},
    {"id": "1.5", "name": "Ожидаемая полезность"},
    {"id": "2.1", "name": "Введение, день 2"},
    {"id": "2.2", "name": "Установка навыков"},
    {"id": "2.3", "name": "Факторизация избеганий"},
    {"id": "2.4", "name": "Систематизация"},
    {"id": "2.5", "name": "Внутренние конфликты"},
]

EVENTS_ROOT_ID = "1WeeuH0Rtp8ODmJ2vbUKE5FklFkZ96Qn4"


def serve_slides(
    path=os.environ["HOME"] + "/Google Drive/Rationality/Workshops/Секции"
):
    server = subprocess.Popen(["python3", "-m", "http.server"], cwd=path)
    return server


def gdrive():
    return kocherga.google.service("drive")


def find_in_folder(parent_id, child_name, missing_ok=False):
    response = gdrive().files().list(q=f'parents in "{parent_id}"').execute()
    for f in response["files"]:
        if f["name"] == child_name:
            return f
    if missing_ok:
        return
    raise Exception(f"Child {child_name} not found in parent {parent_id}")


def create_folder(parent_id, child_name):
    result = find_in_folder(parent_id, child_name, missing_ok=True)
    if result:
        return result  # already exists

    file_metadata = {
        "name": child_name,
        "mimeType": "application/vnd.google-apps.folder",
        "parents": [parent_id],
    }
    result = gdrive().files().create(body=file_metadata, fields="id").execute()
    return result


def prepare_folders(event_name):
    logger.info("Preparing folders")
    event_folder = find_in_folder(EVENTS_ROOT_ID, event_name)
    content_folder = create_folder(event_folder["id"], "Пострассылка")
    public_folder = create_folder(
        content_folder["id"], "Материалы по прикладной рациональности"
    )
    return public_folder


async def build_slides(event_name, folder):
    logger.info("Building slides")
    try:
        slides_folder = create_folder(folder["id"], "Слайды")

        server = serve_slides()

        browser = await pyppeteer.launch()
        page = await browser.newPage()

        for section in SECTIONS:
            logger.info(f'Section {section["name"]}')
            await page.goto("http://localhost:8000/" + section["name"])
            tmp_file_name = "tmp.pdf"
            await page.pdf(path=tmp_file_name, width="32.04cm", height="18.03cm")

            name = (f'{section["id"]} - {section["name"]}.pdf',)
            file_metadata = {
                "name": name,
                "mimeType": "application/pdf",
                "parents": [slides_folder["id"]],
            }
            result = (
                gdrive()
                .files()
                .create(body=file_metadata, media_body=tmp_file_name)
                .execute()
            )
    except:
        raise
    finally:
        server.kill()


async def build(event_name):
    folder = prepare_folders(event_name)
    await build_slides(event_name, folder)
