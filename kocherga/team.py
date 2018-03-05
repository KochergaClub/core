from collections import namedtuple
import gspread

import kocherga.google
import kocherga.config
import kocherga.slack

TeamMember = namedtuple('TeamMember', ['short_name', 'full_name', 'email', 'role', 'status', 'vk', 'slack_id', 'gender'])

def _fetch_members(sc=None):
    gc = kocherga.google.gspread_client()
    spreadsheet = gc.open_by_key(kocherga.config.config()['team_spreadsheet_key'])
    worksheet = spreadsheet.worksheet('Сотрудники')

    rows = worksheet.get_all_records()
    rows = rows[1:]

    slack_users = kocherga.slack.users_by_email()

    def row2member(row):
        primary_email = row['email'].lower()

        for email in [primary_email] + [e.strip().lower() for e in row["Альтернативные email'ы"].split(',')]:
            slack_user = slack_users.get(email, None)
            if slack_user:
                break
        slack_id = slack_user['id'] if slack_user else None

        return TeamMember(
            short_name=row['Имя'],
            full_name=row['Имя, фамилия'],
            email=primary_email,
            slack_id=slack_id,
            role=row['Роль'],
            status=row['Статус'],
            vk=row['В соцсетях'],
            gender=row['Гендер'],
        )

    return [row2member(row) for row in rows]

_cached_members = []
def members(status='Текущий', sc=None):
    global _cached_members
    if not _cached_members:
        _cached_members = _fetch_members(sc)

    result = _cached_members
    if status is not None:
        result = [m for m in result if m.status == status]

    return result

def find_member_by_short_name(short_name):
    return next(filter(lambda m: m.short_name == short_name, members()), None)

def find_member_by_email(email):
    # TODO - find by the alternative emails too
    return next(filter(lambda m: m.email.lower() == email.lower(), members()), None)

def add_member(email, role):
    # add to wiki
    # add to slack
    # add to CM
    # add to Google Drive
    # add to calendar
    raise Exception('Not implemented yet')
