from datetime import datetime, timedelta
import re

from kocherga.ludwig.bot import bot

from kocherga.config import TZ

import kocherga.watchmen
import kocherga.team

from slappy import ErrorResponse

INFLECTED_WEEKDAY_NAMES = [
    "понедельник",
    "вторник",
    "среду",
    "четверг",
    "пятницу",
    "субботу",
    "воскресенье",
]
INFLECTED_MONTH_NAMES = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
]


def get_current_watchman_or_complain(message):
    watchman = kocherga.watchmen.current_watchman()
    if not watchman:
        message.reply("Админа нет, паникуем!")
        return
    if watchman == "Ночь":
        # We could tag them both, but we won't, because it's night and people might want to stay asleep.
        last = kocherga.team.find_member_by_short_name(
            kocherga.watchmen.last_watchman()
        )
        nearest = kocherga.team.find_member_by_short_name(
            kocherga.watchmen.nearest_watchman()
        )

        message.reply(
            f"Сейчас ночь. Вечером админил(а) *{last.short_name}*, а утром будет *{nearest.short_name}*."
        )
        return

    member = kocherga.team.find_member_by_short_name(watchman)
    if not member:
        raise ErrorResponse(
            f"Админит *{watchman}*, но у меня не получилось найти этого человека в базе сотрудников."
        )

    if not member.slack_id:
        raise ErrorResponse(
            f"Админит *{watchman}*, {member.full_name}, но я не знаю, кто это в слаке."
        )

    return member


def daily_watchmen(d):
    schedule = kocherga.watchmen.load_schedule()

    now = datetime.now(TZ)
    shift_info = schedule.shifts_by_date(d)

    attachments = []
    for shift in sorted(shift_info.keys()):
        watchman = shift_info[shift]
        if watchman == "Ночь":
            continue

        if watchman == "":
            attachments.append(
                {"text": f"{shift.when().capitalize()}: *нет админа*!\n"}
            )
            continue

        member = kocherga.team.find_member_by_short_name(watchman)
        if not member:
            raise ErrorResponse(f"Не найден сотрудник по имени {shift_info[shift]}.")

        (shift_start, shift_end) = shift.dt_tuple_by_date(d)

        if shift_end < now:
            rel = "админил" if member.gender == "М" else "админила"
        elif shift_start > now:
            rel = "будет админить"
        else:
            rel = "админит"

        attachments.append(
            {"text": f"{shift.when().capitalize()} {rel} *{shift_info[shift]}*.\n"}
        )

    preposition = "Во" if d.weekday() == 1 else "В"
    weekday_str = INFLECTED_WEEKDAY_NAMES[d.weekday()]
    date_str = f"{d.day} {INFLECTED_MONTH_NAMES[d.month - 1]} {d.year}"
    text = f"{preposition} {weekday_str} {date_str}:\n"

    return {"text": text, "attachments": attachments}


def today_watchmen():
    now = datetime.now(TZ)
    d = now.date()
    if now.hour < 1:
        d -= timedelta(days=1)

    return daily_watchmen(d)


def tomorrow_watchmen():
    now = datetime.now(TZ)
    d = now.date()
    if now.hour < 6:
        d -= timedelta(days=1)

    d += timedelta(days=1)
    return daily_watchmen(d)


@bot.listen_to(r"кто сегодня (?:админит|дежурит)\?")
def react_today_watchmen(message):
    return today_watchmen()


def today_past_watchmen():
    now = datetime.now(TZ)
    d = now.date()
    if now.hour < 6:
        d -= timedelta(days=1)

    return daily_watchmen(d)


@bot.listen_to(r"кто сегодня (?:админил|дежурил)\?")
def react_today_past_watchmen(message):
    return today_past_watchmen()


@bot.listen_to(r"кто завтра (?:админит|дежурит)\?")
def react_tomorrow_watchmen(message):
    return tomorrow_watchmen()


@bot.listen_to(r"кто (?:будет сегодня|сегодня будет) (?:админить|дежурить)\?")
def react_today_future_watchmen(message):
    d = datetime.now(TZ).date()
    return daily_watchmen(d)


@bot.listen_to(
    r"кто\s+админил\s+в[о]?\s+(понедельник|вторник|среду|четверг|пятницу|субботу|воскресенье)\?"
)
def react_past_week_watchmen(message, query):
    weekday = INFLECTED_WEEKDAY_NAMES.index(query)
    d = datetime.now(TZ).date()
    if d.weekday() == weekday:
        # unclear, I'll just keep quiet
        return

    d -= timedelta(days=(d.weekday() - weekday) % 7)

    return daily_watchmen(d)


@bot.listen_to(
    r"кто\s+(?:админит|будет\s+админить)\s+в[о]?\s+(понедельник|вторник|среду|четверг|пятницу|субботу|воскресенье)\?"
)
def react_future_week_watchmen(message, query):
    weekday = INFLECTED_WEEKDAY_NAMES.index(query)
    d = datetime.now(TZ).date()
    if d.weekday() == weekday:
        # unclear, I'll just keep quiet
        return

    d += timedelta(days=(weekday - d.weekday()) % 7)

    return daily_watchmen(d)


@bot.listen_to(r"кто\s+(?:сейчас\s+)?(?:админит|админ|дежурит)\?")
def react_find_watchman(message):
    member = get_current_watchman_or_complain(message)
    if not member:
        return

    return {
        "text": f"Судя по таблице смен, сейчас админит *{member.short_name}*, <@{member.slack_id}>."
    }


@bot.command("/watchmen")
def command_watchmen(payload):
    query = payload["text"]

    if query in ("today", "сегодня", "", None):
        return today_watchmen()

    if query in ("tomorrow", "завтра"):
        return tomorrow_watchmen()

    match = re.match(r"([+-])(\d+)", query)
    if match:
        days = int(match.group(2))
        if match.group(1) == "-":
            days = -days
        d = datetime.now(TZ).date()
        d += timedelta(days=days)
        return daily_watchmen(d)

    raise ErrorResponse(f"Непонятная команда `{query}`.")


@bot.listen_to(r"админ(?:чик)?[,.!].+")
def react_tag_admin(message):
    member = get_current_watchman_or_complain(message)
    if not member:
        return

    slack_user_id = member.slack_id
    return {"text": f"<@{slack_user_id}>, см. выше."}
