from apiclient.http import MediaIoBaseDownload, MediaFileUpload

import kocherga.google


def gdrive():
    return kocherga.google.service("drive")


def parent_id(file_id):
    parents = (
        gdrive().files().get(fileId=file_id, fields='parents').execute()['parents']
    )
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


def upload_file(local_filename, google_filename, folder_id):
    if find_in_folder(folder_id, google_filename, missing_ok=True):
        # file already exists
        return

    file_metadata = {
        "name": (google_filename,),
        "parents": [folder_id],
    }
    mimetype = None
    if local_filename.endswith('.pdf'):
        mimetype = 'application/pdf'
    media = MediaFileUpload(local_filename, mimetype=mimetype)

    (gdrive().files().create(body=file_metadata, media_body=media).execute())


def gdoc_to_pdf(file_id):
    request = gdrive().files().export_media(fileId=file_id, mimeType="application/pdf")

    tmp_file_name = "tmp.pdf"
    with open(tmp_file_name, "wb") as fh:
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()

    return tmp_file_name


def share_to_public(folder_id):
    gdrive().permissions().create(
        fileId=folder_id, body={'role': 'reader', 'type': 'everyone',}
    ).execute()
