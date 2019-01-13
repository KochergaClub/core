import logging
logger = logging.getLogger(__name__)

from django.conf import settings

import re
import markdown
import attr

from typing import Any, List

from kocherga.error import PublicError


class Part:
    pass


@attr.s
class Text(Part):
    text = attr.ib()


@attr.s
class Entity(Part):
    name = attr.ib()
    fb_id = attr.ib(default=None)
    vk_id = attr.ib(default=None)


class SelfMention(Part):
    pass


def parse_entity(entity_str: str) -> Entity:
    logger.debug(f"parsing {entity_str}")
    match = re.match(r"\{\{Entity\|(.*)\}\}$", entity_str)
    if not match:
        raise Exception("Expected a valid entity")
    params = match.group(1).split("|")

    params_parsed = {}
    for param in params:
        if "=" not in param:
            raise PublicError(f"Param {param} is unparsable - should be key=value")
        (key, value) = param.split("=", 1)
        params_parsed[key] = value

    entity = Entity(**params_parsed)
    return entity


def parse_to_parts(description: str) -> List[Part]:
    result: List[Part] = []
    text = ""

    while len(description):
        match = re.match(r"\{\{Entity\|.*?\}\}", description)
        if match:
            entity = parse_entity(match.group(0))
            description = re.sub(r"^\{\{Entity\|.*?\}\}", "", description)
            if text:
                result.append(Text(text))
                text = ""
            result.append(entity)
            continue

        if description.startswith(settings.KOCHERGA_EVENT_MARKUP_SELF_MENTION):
            if text:
                result.append(Text(text))
                text = ""
            result.append(SelfMention())
            description = re.sub(
                "^" + re.escape(settings.KOCHERGA_EVENT_MARKUP_SELF_MENTION),
                "",
                description,
            )
            continue

        text += description[0]
        description = description[1:]

    if text:
        result.append(Text(text))
        text = ""

    return result


class Markup:

    def __init__(self, text):
        self.text = text

    def as_plain(self) -> str:
        parts = parse_to_parts(self.text)

        result = ""
        for part in parts:
            if isinstance(part, Text):
                result += part.text
            elif isinstance(part, Entity):
                result += part.name
            elif isinstance(part, SelfMention):
                result += settings.KOCHERGA_EVENT_MARKUP_SELF_MENTION
            else:
                raise Exception(f"Unknown part {part}")

        return result

    def as_vk(self) -> str:
        parts = parse_to_parts(self.text)

        result = ""
        for part in parts:
            if isinstance(part, Text):
                result += part.text
            elif isinstance(part, Entity):
                result += f"@{part.vk_id} ({part.name})"
            elif isinstance(part, SelfMention):
                result += f'@{settings.KOCHERGA_VK["main_page"]["id"]} ({settings.KOCHERGA_EVENT_MARKUP_SELF_MENTION})'
            else:
                raise Exception(f"Unknown part {part}")

        return result

    def as_html(self) -> str:
        parts = parse_to_parts(
            markdown.markdown(self.text, extensions=['markdown.extensions.nl2br'])
        )

        result = ""
        for part in parts:
            if isinstance(part, Text):
                result += part.text
            elif isinstance(part, Entity):
                if part.vk_id:
                    result += f'<a href="https://vk.com/{part.vk_id}">{part.name}</a>'
                else:
                    result += part.name
            elif isinstance(part, SelfMention):
                result += f'<a href="{settings.KOCHERGA_WEBSITE}">{settings.KOCHERGA_WEBSITE}</a>'
            else:
                raise Exception(f"Unknown part {part}")

        return result
