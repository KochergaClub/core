from datetime import datetime, timedelta
import logging
logger = logging.getLogger(__name__)

from kocherga.config import TZ
import kocherga.events.db
from kocherga.db import Session
from kocherga.events.event import Event

from kocherga.ludwig.bot import bot

def event_color(event):
    return '#999' if event.is_private() else 'good'

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
        inflected = plural_form(int(value), ['человек', 'человека', 'человек'])
        return f'{value} {inflected}'
    elif value == 'more_than_20':
        return 'более 20 человек'
    elif value == 'no_record':
        return 'не записали'
    elif value == 'cancelled':
        return 'отменилось'
    else:
        return value

def visitors_attachment(event):
    return {
        'fallback': '',
        'text': humanized_visitors(event.get_prop('visitors')),
        'title': event.title,
        'title_link': event.google_link,
        'color': event_color(event),
        'mrkdwn_in': ['text'],
        'callback_id': f'event_visitors/{event.google_id}/reset',
        'actions': [
            {
                'name': 'reset',
                'text': 'Изменить ответ',
                'type': 'button',
                'value': 'reset',
            },
        ]
    }

def list_events():
    events = kocherga.events.db.list_events(date=datetime.now().date())

    attachments = []
    for event in events:
        start_time = event.start_dt.strftime('%H:%M')
        end_time = event.end_dt.strftime('%H:%M')

        text = f'С {start_time} до {end_time}'
        if event.location:
            text += ', ' + event.location

        attachments.append({
            'text': text,
            'title': event.title,
            'title_link': event.google_link,
            'color': event_color(event),
            'mrkdwn_in': ['text'],
        })

    word_form = plural_form(len(events), ('событие', 'события', 'событий'))

    return {
        'text': f'Сегодня *{len(events)}* {word_form}:',
        'attachments': attachments,
    }

@bot.listen_to(r'какие сегодня события\?')
def react_events(message):
    return list_events()

@bot.schedule('cron', hour=9)
def morning_events_notification():
    bot.send_message(
        **list_events(),
        channel='#watchmen',
    )

@bot.command('/events')
def command_events(payload):
    return list_events()

def list_event_visitors():
    events = kocherga.events.db.list_events(date=datetime.now().date())

    attachments = []
    for event in events:
        visitors = event.get_prop('visitors')
        if not visitors:
            continue
        attachments.append(visitors_attachment(event))

    return {
        'text': 'Статистика по мероприятиям за сегодня:' + ('' if attachments else ' нет данных.'),
        'attachments': attachments,
    }

@bot.listen_to(r'сколько человек пришло сегодня на мероприятия\?')
def react_event_visitors(message):
    return list_event_visitors()

@bot.command('/event_visitors')
def command_event_visitors(payload):
    return list_event_visitors()

def event_visitors_question(event):
    return {
        'text': 'Сколько человек пришло на событие?',
        'channel': '#watchmen',
        'attachments': [
            {
                'title': event.title,
                'title_link': event.google_link,
                'color': event_color(event),
            },
        ] + [
            {
                'fallback': 'Кнопок нет.',
                'callback_id': f'event_visitors/{event.google_id}',
                'actions': [
                    {
                        'name': 'visitors',
                        'text': n,
                        'type': 'button',
                        'value': n,
                    }
                    for n in range(5 * base + 1, 5 * base + 6)
                ]
            }
            for base in range(4)
        ] + [
            {
                'fallback': 'Кнопок нет.',
                'callback_id': f'event_visitors/{event.google_id}',
                'actions': [
                    {
                        'name': 'visitors',
                        'text': 'более 20',
                        'type': 'button',
                        'value': 'more_than_20',
                    },
                    {
                        'name': 'visitors',
                        'text': 'не записали :(',
                        'type': 'button',
                        'value': 'no_record',
                    },
                    {
                        'name': 'visitors',
                        'text': 'не состоялось',
                        'type': 'button',
                        'value': 'cancelled',
                    }
                ]
            }
        ]
    }

@bot.schedule('interval', minutes=5)
def ask_for_event_visitors():
    events = kocherga.events.db.list_events(date=datetime.now().date())
    logger.info(f'Total events: {len(events)}')

    events = [
        e for e in events
        if not (
            # e.is_private() # private event - should we ask for those too?
            e.get_prop('visitors') # already entered
            or e.get_prop('asked_for_visitors') # already asked
            or datetime.now(tz=TZ) < e.start_dt + timedelta(minutes=30) # event haven't started yet, let's wait
        )
    ]
    logger.info(f'Events we should ask about: {len(events)}')

    if not len(events):
        return # nothing to ask about

    for e in events:
        logger.info(f"Asking for event {e.google_id} ({e.title}). Old asked_for_visitors: {e.get_prop('asked_for_visitors')}")

        e.set_prop('asked_for_visitors', datetime.now().strftime('%Y-%m-%d %H:%M'))
        bot.send_message(**event_visitors_question(e))
        Session().commit()

@bot.action(r'event_visitors/(.*)/reset')
def reset_event_visitors(payload, event_id):
    event = Session().query(Event).get(event_id)
    if not event:
        raise Exception(f'Event {event_id} not found')

    event.set_prop('visitors', None)
    Session().commit()

    return event_visitors_question(event)

@bot.action(r'event_visitors/(.*)')
def accept_event_visitors(payload, event_id):
    value = payload['actions'][0]['value']

    event = Session().query(Event).get(event_id)
    if not event:
        raise Exception(f'Event {event_id} not found')
    event.set_prop('visitors', value)
    Session().commit()

    attachment = visitors_attachment(event)
    attachment['text'] = f"<@{payload['user']['id']}>: {attachment['text']}"

    return {
        'text': 'Сколько человек пришло на событие?',
        'attachments': [attachment],
    }
