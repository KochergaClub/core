from django.conf import settings

from collections import namedtuple
import gspread

import kocherga.google
import kocherga.slack

from .models import Member

def members(include_former=False):
    result = list(Member.objects.all())
    if not include_former:
        result = [m for m in result if m.is_current]

    return result


def find_member_by_short_name(short_name):
    return next(filter(lambda m: m.short_name == short_name, members()), None)


def find_member_by_cm_login(cm_login):
    if cm_login == 'admin':
        cm_login = 'berekuk' # FIXME - special case, might shoot us in the foot in case of opensource / etc.
    return next(filter(lambda m: m.cm_login == cm_login, members()), None)


def find_member_by_email(email):
    for member in members():
        if member.user.email.lower() == email.lower():
            return member
        if email.lower() in [a.email for a in member.alt_emails.all()]:
            return member
    return None


def import_spreadspeet_data():
    gc = kocherga.google.gspread_client()
    spreadsheet = gc.open_by_key(settings.KOCHERGA_TEAM_SPREADSHEET_KEY)
    worksheet = spreadsheet.worksheet("Сотрудники")

    rows = worksheet.get_all_records()
    rows = rows[1:]

    def row2member(row):
        primary_email = row["email"].lower()

        member = Member.objects.create(
            short_name=row["Имя"],
            full_name=row["Имя, фамилия"],
            cm_login=row["Логин в КМ"],
            cm_card_id=row["Номер карты"],
            email=primary_email,
            alt_emails=alt_emails,
            slack_id=slack_id,
            role=row["Роль"],
            status=row["Статус"],
            payment_type=row["Вид оплаты"],
            vk=row["В соцсетях"],
            gender=row["Гендер"],
        )

        alt_emails = [
            e.strip().lower() for e in row["Альтернативные email'ы"].split(",")
        ]
        for alt_email in alt_emails:
            AltEmail.objects.create(member=member, email=alt_email)

    for row in rows:
        row2member(row)


def add_member(email, role):
    # add to wiki
    # add to slack
    # add to CM
    # add to Google Drive
    # add to calendar
    raise NotImplemented
