import logging

logger = logging.getLogger(__name__)

import re
import hashlib

import kocherga.google
import kocherga.mailchimp
from kocherga.config import config
import kocherga.secrets


LIST_ID = config()["mailchimp"]["main_list_id"]
SPREADSHEET_ID = config()["ratio"]["users_spreadsheet_id"]


def get_all_mailchimp_dates(category_id):
    response = kocherga.mailchimp.api_call(
        "GET", f"lists/{LIST_ID}/interest-categories/{date_group_id}/interests"
    )
    logger.info(response)


def create_new_mailchimp_date(category_id, event_type, event_id):
    event_type_ru = {"workshop": "Воркшоп", "3week": "Трехнедельный курс", "bb": "Бытовое байесианство"}[event_type]

    name = f"{event_type_ru} {event_id}"

    # check if interest already exists
    try:
        interest = kocherga.mailchimp.interest_by_name(category_id, name)
        logger.info(f"Group {name} already exists")
    except kocherga.mailchimp.NotFoundException:
        logger.info(f"Creating group {name}")
        interest = kocherga.mailchimp.api_call(
            "POST",
            f"lists/{LIST_ID}/interest-categories/{category_id}/interests",
            {"name": name},
        )

    return interest["id"]


def import_user_to_mailchimp(user, group_id):
    md5 = hashlib.md5(user["email"].lower().encode()).hexdigest()
    print({"FNAME": user["first_name"], "LNAME": user["last_name"], "USER_ID": user["uid"]})
    response = kocherga.mailchimp.api_call(
        "PUT",
        f"lists/{LIST_ID}/members/{md5}",
        {
            "email_type": "html",
            "email_address": user["email"],
            "merge_fields": {"FNAME": user["first_name"], "LNAME": user["last_name"], "USER_ID": user["uid"]},
            "interests": {group_id: True},
            "status_if_new": "subscribed",
        },
    )
    return response["id"]


def get_users(event_type, event_id):
    gc = kocherga.google.gspread_client()

    event_type_ru = {"workshop": "воркшоп", "3week": "курс", "bb": "бб"}[event_type]
    event = f"{event_id} {event_type_ru}"

    spreadsheet = gc.open_by_key(SPREADSHEET_ID)
    worksheet = spreadsheet.worksheet(f"Все участники")

    rows = worksheet.get_all_records()

    result = []

    SALT = kocherga.secrets.plain_secret('mailchimp_uid_salt').encode()
    for row in rows:
        if row["Событие"] != event:
            continue

        uid = hashlib.sha1(SALT + row["Емейл"].lower().encode()).hexdigest()[:10]
        result.append(
            {
                "email": row["Емейл"],
                "first_name": row["Имя"],
                "last_name": row["Фамилия"],
                "uid": uid,
            }
        )
    return result


def sheet2mailchimp(event_type, event_id):
    assert event_type in ("workshop", "3week", "bb")
    assert re.match(r"\d+-\d+$", event_id)

    category = kocherga.mailchimp.interest_category_by_name('Участники воркшопа')
    group_id = create_new_mailchimp_date(category["id"], event_type, event_id)

    users = get_users(event_type, event_id)

    for user in users:
        import_user_to_mailchimp(user, group_id)
        logger.info(f'Added {user["email"]}')
