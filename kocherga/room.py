from django.conf import settings

import re

from kocherga.error import PublicError

all_rooms_details = settings.KOCHERGA_ROOMS
all_rooms = [r["name"] for r in all_rooms_details]

unknown = "unknown"


def _panic(room):
    return PublicError("Unknown room {}.".format(room))


def validate(room):
    if room not in all_rooms and room != unknown:
        raise _panic(room)


def pretty(room):
    validate(room)

    if room == "гэб":
        return "ГЭБ"

    if room == unknown:
        return "Неизвестная"

    return room.capitalize()


def normalize(maybe_room, fail=True):
    maybe_room = maybe_room.strip().lower()
    # TODO - check for obvious typos
    if maybe_room in all_rooms:
        return maybe_room

    if fail:
        raise _panic(maybe_room)
    else:
        return None


def details(room):
    validate(room)

    for room_details in all_rooms_details:
        if room_details["name"] == room:
            result = room_details.copy()
            result["name"] = pretty(room)
            return result

    raise Exception("Room not found")  # shouldn't happen because of validation


def from_long_location(location):
    match = re.match(r'Антикафе Кочерга, комната (\w+)$', location)
    if not match:
        return None
    return normalize(match.group(1)) or None


def to_long_location(room):
    room = normalize(room)
    return f'Антикафе Кочерга, комната {pretty(room)}'
