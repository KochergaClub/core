import logging
logger = logging.getLogger(__name__)

from kocherga.ludwig.bot import bot

from kocherga.watchmen_routine.models import Task, RewardImage


def get_task_by_id(task_id):
    return Task.objects.get(pk=task_id)


def task_attachment(task, status='new'):
    if status == 'new':
        return {
            "title": task.title,
            "text": task.text,
            "color": 'danger',
            "callback_id": f"daily_tasks/action/{task.id}",
            "actions": [
                {
                    "name": "act",
                    "text": "Готово",
                    "type": "button",
                    "value": "done",
                    "style": "primary",
                },
            ],
        }
    else:
        crossed_out_text = f'~*{task.title}*~\n' + '\n'.join([
            '~' + part + '~'
            for part in task.text.replace('\r\n', '\n').split('\n')
        ])
        return {
            "title": None,
            "text": crossed_out_text,
            "color": 'good',
            "callback_id": f"daily_tasks/action/{task.id}",
            "actions": [
                {
                    "name": "act",
                    "text": "Отменить",
                    "type": "button",
                    "value": "cancel",
                },
            ],
        }


def send_daily_tasks():
    tasks = list(Task.objects.today_tasks())

    if not tasks:
        return

    channels = set(
        task.channel for task in tasks
    )

    for channel in channels:
        bot.send_message(
            text="Таски на сегодня:",
            channel="#" + channel,
            attachments=[
                task_attachment(task)
                for task in tasks
                if task.channel == channel
            ],
        )


@bot.schedule("cron", hour=9, minute=1)
def daily_tasks_cron():
    send_daily_tasks()


@bot.respond_to(r"отправь дневные таски")
def react_send_daily_tasks(message):
    send_daily_tasks()


def get_reward_picture():
    reward_image = RewardImage.objects.filter(is_active=True).order_by('?').first()
    return reward_image.image_link


@bot.action(r"daily_tasks/action/(.*)")
def accept_task_outcome(payload, task_id):
    CONGRATS_TEXT = ':tada: Ура!'

    value = payload["actions"][0]["value"]

    original_message = payload['original_message']

    attachments = original_message['attachments']

    a = next(a for a in attachments if a['callback_id'] == f'daily_tasks/action/{task_id}')
    task = get_task_by_id(task_id)

    if value == 'done':
        a.update(
            task_attachment(task, 'completed')
        )
    elif value == 'cancel':
        a.update(
            task_attachment(task, 'new')
        )

    else:
        raise Exception(f"Unknown value {value}")

    all_done = all(not a.get('title') for a in attachments)

    if all_done:
        if attachments[-1]['text'] != CONGRATS_TEXT:
            # success, let's reinforce the good deed with a picture
            attachments.append({
                'text': CONGRATS_TEXT,
                'image_url': get_reward_picture(),
            })

    return original_message
