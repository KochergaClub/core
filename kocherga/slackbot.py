import re
import json
from functools import wraps
import logging
import pytz

from flask import request, jsonify

from apscheduler.schedulers.background import BackgroundScheduler

from slackeventsapi import SlackEventAdapter
from slackclient import SlackClient

from typing import List, Dict

import kocherga.config

class ErrorResponse(Exception):
    pass

class Message:
    def __init__(self, body, sc):
        self.body = body
        self.sc = sc

    def is_text_message(self):
        if self.body.get('type', None) != 'message':
            return False

        if 'text' not in self.body:
            return False

        return True

    def reply(self, text, **kwargs):
        args = dict(**kwargs)
        args['text'] = text
        args['channel'] = self.channel
        if 'thread_ts' in self.body:
            args['thread_ts'] = self.body['thread_ts']

        result = self.sc.api_call('chat.postMessage', **args)
        if not result['ok']:
            raise Exception(str(result))

    @property
    def channel(self):
        return self.body['channel']

    def typing(self):
        return # not working anymore - can only be used on RTM API, but we use Events API now

        found_channel = self.sc.server.channels.find(self.channel)
        channel_id = found_channel.id if found_channel else self.channel

        self.sc.api_call({
            'id': 1,
            'type': 'typing',
            'channel': channel_id,
        })


class Dispatcher:
    def __init__(self):
        self.listeners: List[Dict] = []
        self.actions: List[Dict] = []
        self.commands: List[Dict] = {}

    def register_listener(self, regex, f):
        self.listeners.append({
            'regex': regex,
            'f': f,
        })

    def register_action(self, regex, f):
        self.actions.append({
            'regex': regex,
            'f': f,
        })

    def register_command(self, name, f):
        if name in self.commands:
            raise Exception('Duplicate command {}'.format(name))
        self.commands[name] = {
            'f': f
        }

    def process_action(self, payload):
        for action in self.actions:
            match = re.match(action['regex'], payload['callback_id'])
            if not match:
                continue

            args = (payload,) + match.groups() # type: ignore # (for some reason typing.py defines groups() as Sequence, not Tuple)
            return action['f'](*args) # any action which listens for a route should process it (note that it's different with listeners)

        raise Exception('unknown action')

    def process_message(self, msg):
        if not msg.is_text_message():
            return

        for listener in self.listeners:
            match = re.match(listener['regex'], msg.body['text'], flags=re.IGNORECASE)
            if not match:
                continue
            args = (msg,) + match.groups() # type: ignore
            result = listener['f'](*args)

            if type(result) == str:
                msg.reply(text=result)
            elif type(result) == dict:
                msg.reply(**result)
            elif result:
                raise Exception('Bad listener result: {}'.format(result))

            break

    def process_command(self, payload):
        command = payload['command']
        if command not in self.commands:
            raise Exception('Command {} not found'.format(command))

        return self.commands[command]['f'](payload)

class Bot:
    def __init__(self, port, workplace_token, verification_token):
        self.dispatcher = Dispatcher()
        self.scheduler = BackgroundScheduler(timezone=pytz.timezone('Europe/Moscow')) # can't use kocherga.config.TZ - it's based on dateutil.tz now
        self.sc = SlackClient(workplace_token)
        self.slack_events_adapter = SlackEventAdapter(
            verification_token,
            endpoint="/slack/events"
        )

        self.port = port
        self.verification_token = verification_token

    ### Decorators ###
    def listen_to(self, regex):
        def wrap(f):
            self.dispatcher.register_listener(regex, f)
            return f
        return wrap

    def schedule(self, trigger, **kwargs):
        def wrap(f):
            self.scheduler.add_job(f, trigger, **kwargs)
        return wrap

    def action(self, regex):
        def wrap(f):
            self.dispatcher.register_action(regex, f)
        return wrap

    def command(self, name):
        def wrap(f):
            self.dispatcher.register_command(name, f)
            return f
        return wrap

    ### Public helper methods ###
    def send_message(self, **kwargs):
        result = self.sc.api_call('chat.postMessage', **kwargs)
        if not result['ok']:
            raise Exception(str(result))


    ### Run and internal methods ###
    def process_message(self, msg):
        if 'bot_id' in msg:
            return

        msg = Message(msg, self.sc)
        try:
            self.dispatcher.process_message(msg)
        except Exception as e:
            msg.reply('Что-то пошло не так: ```{}```'.format(str(e)))

    def run(self):
        self.scheduler.start()

        @self.slack_events_adapter.server.route('/slack/action', methods=['POST'])
        def act():
            payload = json.loads(request.form['payload'])
            if payload['token'] != self.verification_token:
                raise Exception('nope')

            result = self.dispatcher.process_action(payload)
            return jsonify(result)

        @self.slack_events_adapter.server.route('/slack/command', methods=['POST'])
        def command():
            payload = request.form
            if payload['token'] != self.verification_token:
                raise Exception('nope')

            try:
                result = self.dispatcher.process_command(payload)
            except Exception as e:
                return 'Что-то пошло не так: ```{}```'.format(str(e))

            if type(result) == str:
                return result
            else:
                return jsonify(result)

        @self.slack_events_adapter.on("message")
        def on_event(event):
            if request.headers.get('X-Slack-Retry-Reason') == 'http_timeout':
                logging.warning('Got a retry request because of timeout')
                return

            self.process_message(event['event'])

        self.slack_events_adapter.start(port=self.port)
