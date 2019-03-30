from datetime import datetime, timedelta
import re

from kocherga.ludwig.bot import bot

from kocherga.dateutils import TZ

from kocherga.watchmen import schedule

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
    shift = schedule.current_shift()

    if not shift.watchman and not shift.watchman.is_night:
        message.reply("Админа нет, паникуем!")
        return

    if shift.watchman.is_night:
        # We could tag them both, but we won't, because it's night and people might want to stay asleep.
        last = schedule.last_watchman()
        nearest = schedule.nearest_watchman()

        message.reply(
            f"Сейчас ночь. Вечером админил(а) *{last.short_name}*, а утром будет *{nearest.short_name}*."
        )
        return

    member = shift.watchman

    if not member.slack_id:
        raise ErrorResponse(
            f"Админит *{member.short_name}* ({member.full_name}), но я не знаю, кто это в слаке."
        )

    return member


def daily_watchmen(d):
    now = datetime.now(TZ)
    day_schedule = schedule.shifts_by_date(d)

    attachments = []
    for shift_type in sorted(day_schedule.keys()):
        shift = day_schedule[shift_type]
        if shift.is_night:
            continue

        if not shift.watchman:
            attachments.append(
                {"text": f"{shift_type.when().capitalize()}: *нет админа*!\n"}
            )
            continue

        (shift_start, shift_end) = shift_type.dt_tuple_by_date(d)

        if shift_end < now:
            rel = "админил" if shift.watchman.gender == 'MALE' else "админила"
        elif shift_start > now:
            rel = "будет админить"
        else:
            rel = "админит"

        attachments.append(
            {"text": f"{shift_type.when().capitalize()} {rel} *{shift.watchman.short_name}*.\n"}
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


@bot.schedule("cron", hour=12)
def roster_check():
    # We have a reason to panic if either of the following is true:
    # - at least 1 empty shift in the next CRITICAL_DAYS days
    # - at least SHIFTS_THRESHOLD empty shifts in the next TOTAL_DAYS days
    CRITICAL_DAYS = 2
    SHIFTS_THRESHOLD = 6
    TOTAL_DAYS = 7
    CHANNEL = '#roster'

    today = datetime.now(TZ).date()
    d = today

    empty_total = 0
    critical_sent = False
    while d < today + timedelta(days=TOTAL_DAYS):
        empty_for_day = 0

        day_schedule = schedule.shifts_by_date(d)
        for shift_type in sorted(day_schedule.keys()):
            shift = day_schedule[shift_type]
            if not shift.watchman and not shift.is_night:
                empty_for_day += 1

        if empty_for_day and d <= today + timedelta(days=CRITICAL_DAYS) and not critical_sent:
            bot.send_message(
                text=f":exclamation: Есть пустые смены в ближайшие {CRITICAL_DAYS} дня.",
                channel=CHANNEL,
            )
            critical_sent = True

        empty_total += empty_for_day
        d += timedelta(days=1)

    if empty_total >= SHIFTS_THRESHOLD:
        bot.send_message(
            text=f":exclamation: {empty_total} пустых смен в ближайшие {TOTAL_DAYS} дней.",
            channel=CHANNEL,
        )
