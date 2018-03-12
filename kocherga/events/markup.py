import logging
import re

class Entity:
    __slots__ = ['name', 'fb_id', 'vk_id']

class SelfMention:
    __slots__ = []

def parse_entity(entity_str):
    logging.debug(f'parsing {entity_str}')
    match = re.match(r'\{\{Entity\|(.*)\}\}$', entity_str)
    params = match.group(1).split('|')
    entity = Entity()
    for param in params:
        (key, value) = param.split('=', 1)
        setattr(entity, key, value)
    return entity

def parse(description):
    result = []
    text = ''

    while len(description):
        match = re.match(r'\{\{Entity\|.*?\}\}', description)
        if match:
            entity = parse_entity(match.group(0))
            description = re.sub(r'^\{\{Entity\|.*?\}\}', '', description)
            if text:
                result.append(text)
                text = ''
            result.append(entity)
            continue

        if description.startswith('антикафе Кочерга'):
            if text:
                result.append(text)
                text = ''
            result.append(SelfMention())
            description = re.sub('^' + re.escape('антикафе Кочерга'), '', description)
            continue

        text += description[0]
        description = description[1:]

    if text:
        result.append(text)
        text = ''
    return result
