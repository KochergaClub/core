import logging

logger = logging.getLogger(__name__)

from collections import OrderedDict

import kocherga.gitlab.models
import kocherga.google

STIPEND_SPREADSHEET_KEY = "1HfG3o5tMc3w-mAT0I9o4s9mICuXWXTyVEIM_MxG6Fno"
GITLAB_PROJECT_NAME = "kocherga/stipend"


def list_responses_from_google():
    gc = kocherga.google.gspread_client()
    spreadsheet = gc.open_by_key(STIPEND_SPREADSHEET_KEY)

    worksheet = spreadsheet.worksheet("Ответы")

    rows = worksheet.get_all_values()
    header = rows[0]
    rows = rows[1:]

    responses = []
    for row in rows:
        if not row[0]:
            continue
        response = OrderedDict()
        for i in range(len(header)):
            response[header[i]] = row[i]
        responses.append(response)

    return responses


def gitlab_project():
    return kocherga.gitlab.models.get_gl().projects.get(GITLAB_PROJECT_NAME)


def response2gitlab(response):
    issue = gitlab_project().issues.create(
        {
            "title": response["Адрес электронной почты"],
            "description": "\n\n".join(
                [
                    f"#### {key}\n{response[key]}"
                    for key in response.keys()
                    if len(response[key])
                ]
            ),
        }
    )
    return issue


def import_all_to_gitlab():
    existing_issues = gitlab_project().issues.list(all=True)

    for response in list_responses_from_google():
        email = response["Адрес электронной почты"]
        if email in [i.title for i in existing_issues]:
            logger.debug(f"{email} is already imported")
            continue
        issue = response2gitlab(response)
        logger.info(f"Imported {email} as #{issue.get_id()}")
