from kocherga.common import PublicError

all_rooms = ['лекционная', 'гэб', 'китайская', 'летняя']
unknown = 'unknown'

def _panic(room):
    return PublicError('Unknown room {}.'.format(room))

def validate(room):
    if room not in all_rooms and room != unknown:
        raise _panic(room)

def pretty(room):
    validate(room)

    if room == 'гэб':
        return 'ГЭБ'

    if room == unknown:
        return 'Неизвестная'

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
