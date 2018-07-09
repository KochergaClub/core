import logging
logger = logging.getLogger(__name__)

import subprocess
import os
from apiclient.http import MediaIoBaseDownload

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
    {"id": "2.4", "name": "Внутренние конфликты"},
    {"id": "2.5", "name": "Оценки вероятностей"},
]


def events_root_id():
    # TODO - move to config
    return "1WeeuH0Rtp8ODmJ2vbUKE5FklFkZ96Qn4"


def templates_root_id():
    # TODO - move to config
    return find_in_folder(workshops_root_id(), "Шаблоны")


def workshops_root_id():
    # TODO - move to config
    return parent_id(events_root_id())


# TODO - fetch from google drive via API or make more customizable
def serve_slides(
    path=os.environ["HOME"] + "/Google Drive/Rationality/Workshops/Секции"
):
    server = subprocess.Popen(["python3", "-m", "http.server"], cwd=path)
    return server


def gdrive():
    return kocherga.google.service("drive")


def parent_id(file_id):
    parents = gdrive().files().get(fileId=file_id, fields='parents').execute()['parents']
    print(f"Parents({file_id}) = {str(parents)}")
    return parents[0]


def find_in_folder(parent_id, child_name, missing_ok=False):
    response = gdrive().files().list(q=f'parents in "{parent_id}"').execute()
    for f in response["files"]:
        if f["name"] == child_name:
            return f["id"]
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
    return result["id"]


def prepare_folders(event_name):
    logger.info("Preparing folders")
    event_folder_id = create_folder(events_root_id(), event_name)
    content_folder_id = create_folder(event_folder_id, "Пострассылка")
    public_folder_id = create_folder(
        content_folder_id, "Материалы по прикладной рациональности"
    )
    return public_folder_id


async def build_slides(folder_id):
    logger.info("Building slides")
    try:
        slides_folder_id = create_folder(folder_id, "Слайды")

        server = serve_slides()

        browser = await pyppeteer.launch()
        page = await browser.newPage()

        for section in SECTIONS:
            name = f'{section["id"]} - {section["name"]}.pdf'

            if find_in_folder(slides_folder_id, name, missing_ok=True):
                continue # already exists

            logger.info(f'Section {section["name"]}')
            await page.goto("http://localhost:8000/" + section["name"])
            tmp_file_name = "tmp.pdf"
            await page.pdf(path=tmp_file_name, width="32.04cm", height="18.03cm")

            file_metadata = {
                "name": (name,),
                "mimeType": "application/pdf",
                "parents": [slides_folder_id],
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


def gdoc_to_pdf(file_id):
    request = gdrive().files().export_media(fileId=file_id, mimeType="application/pdf")

    tmp_file_name = "tmp.pdf"
    with open(tmp_file_name, "wb") as fh:
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()

    return tmp_file_name


def upload_pdf(local_filename, google_filename, folder_id):
    if find_in_folder(folder_id, google_filename, missing_ok=True):
        return # already exists

    file_metadata = {
        "name": (google_filename,),
        "mimeType": "application/pdf",
        "parents": [folder_id],
    }
    result = (
        gdrive()
        .files()
        .create(body=file_metadata, media_body=local_filename)
        .execute()
    )


def build_extra_files(folder_id):
    sources_folder_id = parent_id(folder_id)
    event_folder_id = parent_id(sources_folder_id)

    schedule_gdoc_id = find_in_folder(event_folder_id, "Расписание")
    filename = gdoc_to_pdf(schedule_gdoc_id)
    upload_pdf(filename, "Расписание.pdf", folder_id)

    materials_gdoc_id = find_in_folder(sources_folder_id, "Дополнительные материалы")
    filename = gdoc_to_pdf(materials_gdoc_id)
    upload_pdf(filename, "Материалы.pdf", folder_id)


    form_filename = 'Впечатления от воркшопа' # FIXME - name according to the event
    if find_in_folder(sources_folder_id, form_filename, missing_ok=True):
        return # already exists
    templates_folder_id = find_in_folder(workshops_root_id(), 'Шаблоны')
    post_form_id = find_in_folder(templates_folder_id, 'Впечатления от воркшопа')

    gdrive().files().copy(
        fileId=post_form_id,
        body={
            "name": form_filename,
            "parents": [sources_folder_id],
        }
    ).execute()


def share_to_public(folder_id):
    gdrive().permissions().create(
        fileId=folder_id,
        body={
            'role': 'reader',
            'type': 'everyone',
        }
    )


async def build(event_name):
    folder_id = prepare_folders(event_name)

    build_extra_files(folder_id)
    await build_slides(folder_id)
    share_to_public(folder_id)
