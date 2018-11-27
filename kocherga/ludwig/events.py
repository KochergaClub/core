import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

from kocherga.config import TZ
import kocherga.events.db
from kocherga.db import Session
from kocherga.events.event import Event

from kocherga.ludwig.bot import bot


def clock_emoji(t):
    result = ':clock'
    result += str(t.hour if t.hour < 12 else t.hour - 12)
    if t.minute == 30:
        result += '30'
    return result + ':'


def event_emoji(event):
    if event.event_type == "private":
        return ":lock:"
    elif event.event_type == "public":
        return ":earth_americas:"
    else:
        return ":grey_question:"


def event_instructions(event):
    instructions = []
    if 'feedback' in event.tag_names:
        instructions.append(':memo: Нужно собрать фидбек.')

    if 'slides' in event.tag_names:
        instructions.append(':tv: Нужен телевизор для показа слайдов.')

    if 'record' in event.tag_names:
        instructions.append(':video_camera: Нужна видеозапись.')

    return ' '.join(instructions)


def event_color(event):
    if event.event_type == "private":
        return "warning"
    elif event.event_type == "public":
        return "good"
    else:
        return "#999"


def list_events():
    events = kocherga.events.db.list_events(date=datetime.now().date())

    attachments = []
    for event in events:
        start_time = event.start_dt.strftime("%H:%M")
        end_time = event.end_dt.strftime("%H:%M")

        text = clock_emoji(event.start_dt.time()) + f" С {start_time} до {end_time}"
        if event.location:
            text += ", " + event.location

        instructions = event_instructions(event)
        if instructions:
            text += '\n' + instructions

        attachments.append(
            {
                "text": text,
                "title": event_emoji(event) + ' ' + event.title,
                "title_link": event.google_link,
                "color": event_color(event),
                "mrkdwn_in": ["text"],
            }
        )

    word_form = plural_form(len(events), ("событие", "события", "событий"))

    return {"text": f"Сегодня *{len(events)}* {word_form}:", "attachments": attachments}


@bot.listen_to(r"какие сегодня события\?")
def react_events(message):
    return list_events()


@bot.schedule("cron", hour=9)
def morning_events_notification():
    bot.send_message(**list_events(), channel="#watchmen")


@bot.command("/events")
def command_events(payload):
    return list_events()


# TODO - move this function to some common module
def plural_form(n, forms):
    NOMINATIVE = 0
    GENITIVE = 1
    GENITIVE_PLURAL = 2
    if 10 < n % 100 < 20:
        return forms[GENITIVE_PLURAL]
    if 2 <= n % 10 <= 4:
        return forms[GENITIVE]
    if n % 10 == 1:
        return forms[NOMINATIVE]
    return forms[GENITIVE_PLURAL]


def humanized_visitors(value):
    if value.isdigit():
        inflected = plural_form(int(value), ["человек", "человека", "человек"])
        return f"{value} {inflected}"
    elif value == "more_than_20":
        return "более 20 человек"
    elif value == "no_record":
        return "не записали"
    elif value == "cancelled":
        return "отменилось"
    else:
        return value


def visitors_attachment(event):
    return {
        "fallback": "",
        "text": humanized_visitors(event.visitors),
        "title": event.title,
        "title_link": event.google_link,
        "color": event_color(event),
        "mrkdwn_in": ["text"],
        "callback_id": f"event_visitors/{event.google_id}/reset",
        "actions": [
            {
                "name": "reset",
                "text": "Изменить ответ",
                "type": "button",
                "value": "reset",
            }
        ],
    }


def list_event_visitors():
    events = kocherga.events.db.list_events(date=datetime.now().date())

    attachments = []
    for event in events:
        visitors = event.visitors
        if not visitors:
            continue
        attachments.append(visitors_attachment(event))

    return {
        "text": "Статистика по мероприятиям за сегодня:"
        + ("" if attachments else " нет данных."),
        "attachments": attachments,
    }


@bot.listen_to(r"сколько человек пришло сегодня на мероприятия\?")
def react_event_visitors(message):
    return list_event_visitors()


@bot.command("/event_visitors")
def command_event_visitors(payload):
    return list_event_visitors()


def event_visitors_question(event):
    result = {
        "text": "Сколько человек пришло на событие?",
        "channel": "#watchmen",
    }
    if event.visitors:
        result["attachments"] = [visitors_attachment(event)]
    else:
        result["attachments"] = [
            {
                "title": event.title,
                "title_link": event.google_link,
                "color": event_color(event),
                "callback_id": f"event_visitors/{event.google_id}",
                "actions": [
                    {
                        "name": "visitors",
                        "text": ":writing_hand: Записать",
                        "type": "button",
                        "value": "dialog",
                        "style": "primary",
                    },
                    {
                        "name": "visitors",
                        "text": "Не состоялось",
                        "type": "button",
                        "value": "cancelled",
                    },
                    {
                        "name": "visitors",
                        "text": "Не записали :(",
                        "type": "button",
                        "value": "no_record",
                        "style": "danger",
                    },
                ],
            }
        ]

    return result


@bot.schedule("interval", minutes=5)
def ask_for_event_visitors():
    logger.debug("ask_for_event_visitors, session id = " + str(id(Session())))
    events = Session().query(Event).filter_by(deleted=False).filter(Event.start_ts > datetime.now(TZ).timestamp() - 86400).all()
    logger.debug(f"Total events: {len(events)}")

    events = [
        e
        for e in events
        if not (
            e.visitors  # already entered
            or e.asked_for_visitors_dt  # already asked
            or datetime.now(tz=TZ) < e.start_dt + timedelta(minutes=30)  # event haven't started yet, let's wait
        )
    ]
    logger.info(f"Events we should ask about: {len(events)}")

    if not len(events):
        return  # nothing to ask about

    for e in events:
        e.asked_for_visitors_dt = datetime.now(TZ)
        bot.send_message(**event_visitors_question(e))

        Session().commit()


@bot.action(r"event_visitors/(.*)/reset")
def reset_event_visitors(payload, event_id):
    event = Session().query(Event).get(event_id)
    if not event:
        raise Exception(f"Event {event_id} not found")

    event.visitors = None
    return event_visitors_question(event)


@bot.action(r"event_visitors/(.*)/submit/(.*)")
def submit_event_visitors_dialog(payload, event_id, original_message_path):
    (original_message_id, original_channel_id) = original_message_path.split('@')
    assert payload["type"] == "dialog_submission"

    value = payload["submission"]["visitors"]

    if not value.isdigit():
        return {
            "errors": [
                {
                    "name": "visitors",
                    "error": "Нужно ввести число"
                },
            ]
        }

    event = Session().query(Event).get(event_id)
    event.visitors = value
    Session().commit()

    #############
    # Temporarily disabled. We need a smarter heuristics to avoid annoying multiple questions about this for the same groups of people.
    #############
    # if event.event_type == 'private' and int(value) >= 4:
    #     watchman_slack_id = None
    #     try:
    #         watchman = kocherga.watchmen.current_watchman()
    #         if watchman and watchman != 'Ночь':
    #             member = kocherga.team.find_member_by_short_name(watchman)
    #             watchman_slack_id = member.slack_id
    #     except:
    #         log.error("Couldn't find watchman or their slack id")

    #     question_variant = f'<@{watchman_slack_id}>, найди' if watchman_slack_id else 'Админ, найди'

    #     bot.send_message(
    #         text=f"*{event.title}: большая бронь (или аренда)! Откуда эти люди о нас узнали?*\n{question_variant} человека, на которого оформлена эта бронь (аренда), и спроси у него, как они нашли Кочергу; ответ напиши в треде.",
    #         channel="#watchmen",
    #     )

    question = event_visitors_question(event)
    question['channel'] = original_channel_id
    attachment = question['attachments'][0]
    attachment['text'] = f"<@{payload['user']['id']}>: {attachment['text']}"

    response = bot.sc.api_call(
        'chat.update',
        ts=original_message_id,
        **question,
    )
    if not response["ok"]:
        logger.warning(response)
        raise Exception("Couldn't update question message")

    return


@bot.action(r"event_visitors/(.*)")
def accept_event_visitors(payload, event_id):
    value = payload["actions"][0]["value"]

    if value == 'dialog':
        response = bot.sc.api_call(
            'dialog.open',
            trigger_id=payload["trigger_id"],
            dialog={
                "callback_id": f"event_visitors/{event_id}/submit/{payload['message_ts']}@{payload['channel']['id']}",
                "title": "Статистика мероприятия",
                "submit_label": "Сохранить",
                "elements": [
                    {
                        "name": "visitors",
                        "type": "text",
                        "subtype": "number",
                        "label": "Количество человек",
                        "hint": "Не считая ведущего.",
                    }
                ],
            },
        )
        if not response["ok"]:
            logger.warning(response)
            raise Exception("Couldn't open visitors dialog")

        return

    event = Session().query(Event).get(event_id)
    if not event:
        raise Exception(f"Event {event_id} not found")

    if value == 'no_record':
        event.visitors = 'no_record'
        Session().commit()

    elif value == 'cancelled':
        event.visitors = 'cancelled'
        Session().commit()
    else:
        raise Exception("Unknown value")

    return event_visitors_question(event)
