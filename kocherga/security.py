# Audit team access permissions.

import logging
logger = logging.getLogger(__name__)

from termcolor import colored

import kocherga.team
import kocherga.wiki

def report_excess(message):
    print(colored(message, 'red'))

def report_shortage(message):
    print(colored(message, 'yellow'))


def audit():
    audit_wiki()
    audit_slack()
    #audit_gdrive()
    #audit_cm()
    audit_calendar()

def audit_wiki():
    logger.info('Audit wiki permissions')
    wiki = kocherga.wiki.get_wiki()

    team = kocherga.team.members()
    wiki_team = [u for u in wiki.allusers(prop='blockinfo') if not u.get('blockid')]

    team_by_name = {
        m.full_name: m
        for m in team
    }

    for wiki_user in wiki_team:
        if wiki_user['name'] not in team_by_name:
            report_excess('Wiki user is not a team member: {}'.format(wiki_user['name']))

    wiki_team_by_name = {
        u['name']: u
        for u in wiki_team
    }

    for user in team:
        if user.full_name not in wiki_team_by_name:
            report_shortage('Team member is not a wiki user: {}'.format(user.full_name))


def audit_slack():
    logger.info('Audit slack permissions')
    team = kocherga.team.members()

    ok = 0
    for m in team:
        if not m.slack_id:
            report_shortage('not found in slack: ' + str(m))
            continue

        ok += 1

    return ok

def audit_calendar():
    logger.info('Audit calendar permissions')
    calendar = kocherga.google.service('calendar')
    acl = calendar.acl().list(calendarId=kocherga.config.google_calendar_id()).execute()

    email2role = {}
    for item in acl['items']:
        email = item['scope']['value'].lower()
        if email.endswith('.gserviceaccount.com') or email.endswith('.calendar.google.com'):
            continue

        role = item['role']

        email2role[email] = role

    email2member = {}
    for m in kocherga.team.members():
        email2member[m.email] = m

    for extra_email in set(email2role.keys()) - set(email2member.keys()):
        report_excess('Extra user with the {} calendar access: {}'.format(email2role[extra_email], extra_email))
