#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import json
import os

from datetime import datetime, timedelta
from kocherga.config import TZ

import kocherga.events.google

def get_pp(ge):
    return ge.get('extendedProperties', {}).get('private', {})

def get_prop(ge, prop):
    return get_pp(ge).get(prop, None)

def grep_prop(prop, events):
    for ge in events:
        if prop in get_pp(ge):
            yield ge

def all_pp(events):
    result = set()
    for ge in events:
        result = result | set(ge.get('extendedProperties', {}).get('private', {}))
    return list(result)

def stat(events):
    for pp in sorted(all_pp(events)):
        pp_events = list(grep_prop(pp, events))
        pp_values = list(
            (ge['id'], ge['extendedProperties']['private'][pp])
            for ge in pp_events
        )
        unique_pp_values = set(list(v[0] for v in pp_values))
        print(f'{pp} -> {len(pp_events)}, unique values = {len(unique_pp_values)}, values = {pp_values[:1]}')

def main():
    if os.environ.get('RELOAD'):
        events = kocherga.events.google.list_events(to_date=(datetime.now(tz=TZ) + timedelta(days=7*8)).date())
        with open('events.json', 'w') as fh:
            fh.write(json.dumps(events))
    else:
        with open('events.json') as fh:
            events = json.load(fh)

    fe = list(grep_prop('vk-link', events))
    print(len(fe))
    #for ge in fe:
    #    old = get_prop(ge, 'vk-link')
    #    new = get_prop(ge, 'vk_group')
    #    if new is not None and new != old:
    #        raise NotImplemented

    #    print(f"{ge['id']:<80}\t{old:<20}\t{new}")
    #    kocherga.events.google.set_property(ge['id'], 'vk-link', None)

    stat(events)

main()

# All migrations are complete. This script stays here just for a historical interest and can be removed later at any time.
