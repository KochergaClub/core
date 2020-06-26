"""Audit staff access permissions."""

import logging

logger = logging.getLogger(__name__)

from termcolor import colored

import kocherga.staff.tools
import kocherga.wiki
import kocherga.events.models
import kocherga.events.google
import kocherga.slack.models


def report_excess(message):
    print(colored(message, "red"))


def report_shortage(message):
    print(colored(message, "yellow"))


def audit():
    audit_wiki()
    audit_slack()
    # audit_gdrive()
    # audit_cm()
    audit_calendar()


def audit_wiki():
    logger.info("Audit wiki permissions")
    wiki = kocherga.wiki.get_wiki()

    staff = kocherga.staff.tools.members()
    wiki_team = [u for u in wiki.allusers(prop="blockinfo") if not u.get("blockid")]

    staff_by_name = {m.full_name: m for m in staff}

    for wiki_user in wiki_team:
        if wiki_user["name"] == "Flow talk page manager":
            continue
        if wiki_user["name"] not in staff_by_name:
            report_excess(
                "Wiki user is not a staff member: {}".format(wiki_user["name"])
            )

    wiki_team_by_name = {u["name"]: u for u in wiki_team}

    for user in staff:
        if user.full_name not in wiki_team_by_name:
            report_shortage(
                "Staff member is not a wiki user: {}".format(user.full_name)
            )


def audit_slack():
    logger.info("Audit slack permissions")
    staff = kocherga.staff.tools.members()

    ok = 0
    for m in staff:
        if not m.slack_id:
            report_shortage(f"Not found in slack: {m.full_name}, {m.user.email}")
            continue

        ok += 1

    for user in kocherga.slack.models.User.objects.all():
        email = user.get("profile", {}).get("email", None)
        if not email:
            continue
        if not kocherga.staff.tools.find_member_by_email(user.email):
            report_excess(
                f"Slack user is not a staff member: {user.email}, {user.real_name}"
            )

    return ok


def audit_calendar():
    logger.info("Audit calendar permissions")
    private_google_calendars = kocherga.events.models.GoogleCalendar.objects.filter(
        public_only=False
    )
    api = kocherga.events.google.api()

    for google_calendar in private_google_calendars:
        acl = api.acl().list(calendarId=google_calendar.calendar_id).execute()

        email2role = {}
        for item in acl["items"]:
            email = item["scope"]["value"].lower()
            if email.endswith(".gserviceaccount.com") or email.endswith(
                ".calendar.google.com"
            ):
                continue

            role = item["role"]

            email2role[email] = role

        email2member = {}
        for m in kocherga.staff.tools.members():
            email2member[m.email] = m

        for email in set(email2role.keys()) - set(email2member.keys()):
            report_excess(
                f"Extra user with the {email2role[email]} access to calendar {google_calendar.pk}: {email}"
            )

        for email in set(email2member.keys()) - set(email2role.keys()):
            pass  # shortage doesn't matter - staff doesn't need private google calendar anymore
            # report_shortage(f"No calendar access: {email}")
