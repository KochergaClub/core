#!/usr/bin/env python

from datetime import datetime, timedelta
from kocherga.config import TZ

import kocherga.events.google

def grep_prop(prop, events):
    for ge in events:
            pp = ge.get('extendedProperties', {}).get('private', {})
            if prop in pp:
                    yield ge

all_pp = [
    'bar',
    'foo',
    'posted-timepad',
    'posted-fb',
    'asked_for_visitors',
    'visitors',
    'has_default_image',
    'type',
    'has_vk_image',
    'timepad',
    '_timepad_',
    'hello',
    'has_image',
    'ready-to-post',
    'fb_group',
    'vk-link',
    'vk_group',
    'posted-vk'
]

events = kocherga.events.google.list_events(to_date=(datetime.now(tz=TZ) + timedelta(days=7*8)).date())

for pp in all_pp:
    pp_events = list(grep_prop(pp, events))
    pp_values = list(set(
        ge['extendedProperties']['private'][pp]
        for ge in pp_events
    ))
    print(f'{pp} -> {len(pp_events)}, unique values = {len(pp_values)}, values = {pp_values[:5]}')
