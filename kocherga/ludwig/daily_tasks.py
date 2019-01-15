import logging
logger = logging.getLogger(__name__)

import random
import hashlib
from datetime import datetime, timedelta

from kocherga.datetime import TZ
from kocherga.ludwig.bot import bot

from kocherga.watchmen_routine.models import Task

def get_task_by_id(task_id):
    return Task.objects.get(pk=task_id)

def task_attachment(task, status='new'):
    if status == 'new':
        return {
            "title": task.name,
            "text": "",
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
        return {
            "title": None,
            "text": '~' + task.name + '~',
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
    today_tasks = list(Task.objects.today_tasks())

    if not today_tasks:
        return

    bot.send_message(
        text="Таски на сегодня:",
        channel="#" + task.channel,
        attachments=[
            task_attachment(task)
            for task in today_tasks
        ],
    )

@bot.schedule("cron", hour=9, minute=30)
def daily_tasks_cron():
    send_daily_tasks()

@bot.respond_to(r"отправь дневные таски")
def react_send_daily_tasks(message):
    send_daily_tasks()

def get_reward_picture():
    pics = [
        'https://i.redd.it/axhp4rlc0d901.jpg',
        'https://www.dailydot.com/wp-content/uploads/6d6/a0/740bf5f811111c88-2048x1024.jpg',
        'https://pp.userapi.com/c844416/v844416201/16e99b/Lky6-awbdxI.jpg',
        'https://pp.userapi.com/c851436/v851436801/5468b/LkX2N8X5iXo.jpg',
        'https://pp.userapi.com/c849036/v849036200/f2d04/TMFU81-XT0Y.jpg',
        'https://pp.userapi.com/c850616/v850616909/94276/SivZ0I2tFCM.jpg',
        'https://pp.userapi.com/c850232/v850232653/ac821/0DaqX2dawkw.jpg',
        'https://pp.userapi.com/c830609/v830609643/189a52/0ifTbcOrwQc.jpg',
        'https://pp.userapi.com/c852220/v852220165/7e998/I88OlNJonak.jpg',
        'https://pp.userapi.com/c849136/v849136756/d82df/LUawNWbD0VA.jpg',
        'https://pp.userapi.com/c849324/v849324946/fcf94/p5NdxgyftBM.jpg',
        'https://sun6-2.userapi.com/c7007/v7007385/41ecf/WsTKjGIN7NU.jpg',
        'https://pp.userapi.com/c846019/v846019477/16e94d/gjIUmxs9pOU.jpg',
        'https://pp.userapi.com/c636327/v636327493/346c2/YqKQOrd6YrA.jpg',
        'https://pp.userapi.com/c846323/v846323158/ff1a4/BVGKYX-rWZE.jpg',
        'https://pp.userapi.com/c837731/v837731181/1ddd3/TwGiC3oI1Zw.jpg',
        'https://pp.userapi.com/c851520/v851520387/72c07/CKjwN7CJVTQ.jpg',
        'https://pp.userapi.com/c845420/v845420429/4a2ec/VrgV8Bts_nw.jpg',
        'https://pp.userapi.com/c846018/v846018372/ff9c2/Ud7_pdi5fX4.jpg',
        'https://pp.userapi.com/c846520/v846520066/52f76/2LgBo0nCfq8.jpg',
        'https://pp.userapi.com/c850520/v850520109/851fb/eMbN4sV7brI.jpg',
        'https://sun6-5.userapi.com/c7007/v7007968/2f87d/7leLBszMaxg.jpg',
        'https://pp.userapi.com/c836424/v836424082/2c236/HElJkzn_naY.jpg',
        'https://pp.userapi.com/c836229/v836229082/3138f/ICgBR4mkYwA.jpg',
        'https://i.imgur.com/ZA0DIZA.gifv',
    ]
    return random.choice(pics)

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
