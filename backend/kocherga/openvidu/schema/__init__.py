import json
from ariadne import MutationType

Mutation = MutationType()

from ..api import generate_token


@Mutation.field('openviduGenerateRoomToken')
def openviduGenerateRoomToken(_, info):
    name = info.context.user.get_full_name()
    if not name:
        raise Exception("User must have a name to join openvidu calls")
    token = generate_token('openroom', data=json.dumps({'name': name}))

    return {
        'token': token,
    }


types = [Mutation]
