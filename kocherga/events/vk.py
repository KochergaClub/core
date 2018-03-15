from datetime import datetime
import requests
import json
import logging

import kocherga.vk
from kocherga.error import PublicError

from kocherga.events.announcement import BaseAnnouncement
import kocherga.events.markup

class VkAnnouncement(BaseAnnouncement):
    def __init__(self, group_name, group_id, post_id):
        self.group_name = group_name
        self.group_id = group_id
        self.post_id = post_id

    @property
    def link(self):
        return 'https://vk.com/{}?w=wall-{}_{}'.format(self.group_name, self.group_id, self.post_id)

def group2id(group_name):
    if type(group_name) == int:
        return group_name

    r = kocherga.vk.call('groups.getById', { 'group_id': group_name })
    return r[0]['id']

def upload_wall_image(group_id, image_file):
    upload_server = kocherga.vk.call('photos.getWallUploadServer', {
        'group_id': group_id,
    })
    upload_url = upload_server['upload_url']

    r = requests.post(upload_url, files={
        'file': open(image_file, 'rb')
    })
    r.raise_for_status()

    # note that image upload doesn't wrap the result in {'response': ...}, do it doesn't need to be checked with kocherga.vk.check_response
    upload_response = r.json()

    photo = json.loads(upload_response['photo'])

    if not len(photo):
        raise Exception("vk didn't like our image file")

    logging.debug('image upload response: ' + str(upload_response))

    photo = kocherga.vk.call('photos.saveWallPhoto', {
        'group_id': group_id,
        'photo': upload_response['photo'],
        'server': upload_response['server'],
        'hash': upload_response['hash'],
        'caption': 'Картинка к посту',
    })

    photo_id = 'photo{owner_id}_{id}'.format(**photo[0])
    logging.info('photo id: ' + str(photo_id))

    return photo_id

def vk_description(description):
    return kocherga.events.markup.Markup(description).as_vk()

def create(event):

    group_name = event.get_prop('vk_group')
    if not group_name:
        raise PublicError("Can't announce - vk_group is not set")

    group_id = group2id(group_name)

    image_file = event.image_file('vk')
    if not image_file:
        raise PublicError("Can't announce - add a vk image first")

    date_string = '{weekday} {day} {month}, в {time}'.format(
        weekday=['понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'субботу', 'воскресенье'][event.start_dt.weekday()],
        day=event.start_dt.day,
        month=['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'][event.start_dt.month - 1],
        time=event.start_dt.strftime('%H:%M')
    )

    timepad_link = event.get_prop('posted-timepad')

    tail = 'Встреча пройдёт в {}, в @kocherga_club (антикафе Кочерга). Оплата участия — по тарифам антикафе: 2,5 руб./минута.'.format(date_string)

    if timepad_link:
        tail += 'Регистрация: {}'.format(timepad_link)

    photo_id = upload_wall_image(group_id, image_file)

    response = kocherga.vk.call('wall.post', {
        'owner_id': -group_id,
        'from_group': 1,
        'message': vk_description(event.description) + '\n\n***\n' + tail,
        'publish_date': int(datetime.now().timestamp()) + 86400,
        'attachments': photo_id,
    })

    kocherga.vk.call('groups.edit', {
        'group_id': group_id,
        'event_start_date': event.start_dt.timestamp(),
        'event_finish_date': event.end_dt.timestamp(),
    })

    return VkAnnouncement(group_name, group_id, response['post_id'])

def add_week_to_event_date(vk_group_id):
    vk_group_id = group2id(vk_group_id)

    response = kocherga.vk.call('groups.getSettings', {
        'group_id': vk_group_id,
        'event_start_date': 1512059400,
        'event_finish_date': 1512070200,
    })

    start_date = response['start_date']
    finish_date = response['finish_date']

    kocherga.vk.call('groups.edit', {
        'group_id': vk_group_id,
        'event_start_date': start_date + 86400 * 7,
        'event_finish_date': finish_date + 86400 * 7,
    })
