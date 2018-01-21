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
        slack_email = row['email']

        for email in [row['email']] + [e.strip() for e in row["Альтернативные email'ы"].split(',')]:
            slack_user = slack_users.get(email.lower(), None)
            if slack_user:
                break
        slack_id = slack_user['id'] if slack_user else None

        return TeamMember(
            short_name=row['Имя'],
            full_name=row['Имя, фамилия'],
            email=row['email'],
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

def check_slack_ids():
    _members = members()

    ok = 0
    for m in _members:
        if not m.slack_id:
            print("not found in slack: " + str(m))
            continue

        ok += 1

    return ok

def check_calendar_access():
    calendar = kocherga.google.service('calendar')
    acl = calendar.acl().list(calendarId=kocherga.config.google_calendar_id()).execute()

    email2role = {}
    for item in acl['items']:
        email = item['scope']['value']
        if email.endswith('.gserviceaccount.com') or email.endswith('.calendar.google.com'):
            continue

        role = item['role']

        email2role[email] = role

    email2member = {}
    for m in members():
        email2member[m.email] = m

    for extra_email in set(email2role.keys()) - set(email2member.keys()):
        print('WARNING! Extra user with the {} calendar access: {}'.format(email2role[extra_email], extra_email))
