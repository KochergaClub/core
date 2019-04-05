import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

from kocherga.dateutils import TZ
import kocherga.events.db
from kocherga.events.models import Event

from kocherga.ludwig.bot import bot


def clock_emoji(t):
    result = ':clock'
    result += str(t.hour if t.hour <= 12 else t.hour - 12)
    if t.minute == 30:
        result += '30'
    return result + ':'


def event_emoji(event):
    if event.event_type == "private":
        return ":lock:"
    elif event.event_type == "public":
        return ":globe_with_meridians:"
    else:
        return ":grey_question:"


def event_instructions(event):
    instructions = []
    if 'feedback' in event.tag_names():
        instructions.append(':memo: Собрать фидбек.')

    if 'slides' in event.tag_names():
        instructions.append(':tv: Подключить телевизор для показа слайдов.')

    if 'record' in event.tag_names():
        instructions.append(':video_camera: Сделать видеозапись.')

    return '\n'.join(instructions)


def event_color(event):
    if event.event_type == "private":
        return "warning"
    elif event.event_type == "public":
        return "good"
    else:
        return "#999"


def list_events():
    events = Event.objects.list_events(date=datetime.now(TZ).date())

    attachments = []
    for event in events:
        start_time = event.start.strftime("%H:%M")
        end_time = event.end.strftime("%H:%M")

        text = f"С {start_time} до {end_time}"
        if event.location:
            text += ", " + event.location
        text += '.'

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
    events = Event.objects.list_events(date=datetime.now().date())

    attachments = []
    for event in events:
        visitors = event.visitors
        if not visitors:
            continue
        attachments.append(visitors_attachment(event))

    return {
        "text": "Статистика по мероприятиям за сегодня:" + ("" if attachments else " нет данных."),
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
    logger.debug("ask_for_event_visitors")
    events = Event.objects.filter(deleted=False, start__gt=datetime.now(TZ) - timedelta(days=1)).all()
    logger.debug(f"Total events: {len(events)}")

    events = [
        e
        for e in events
        if not (
            e.visitors  # already entered
            or e.asked_for_visitors  # already asked
            or datetime.now(tz=TZ) < e.start + timedelta(minutes=30)  # event haven't started yet, let's wait
        )
    ]
    logger.info(f"Events we should ask about: {len(events)}")

    if not len(events):
        return  # nothing to ask about

    for e in events:
        e.asked_for_visitors = datetime.now(TZ)
        bot.send_message(**event_visitors_question(e))
        e.save()


@bot.action(r"event_visitors/(.*)/reset")
def reset_event_visitors(payload, event_id):
    event = Event.objects.get(pk=event_id)
    event.visitors = None
    event.save()

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

    event = Event.objects.get(pk=event_id)
    event.visitors = value
    event.save()

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

    event = Event.objects.get(pk=event_id)

    if value == 'no_record':
        event.visitors = 'no_record'
        event.save()
    elif value == 'cancelled':
        event.visitors = 'cancelled'
        event.save()
    else:
        raise Exception("Unknown value")

    return event_visitors_question(event)
