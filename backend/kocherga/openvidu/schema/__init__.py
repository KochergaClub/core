from ariadne import MutationType

Mutation = MutationType()

from ..api import generate_token


@Mutation.field('openviduGenerateRoomToken')
def openviduGenerateRoomToken(_, info):
    token = generate_token('openroom')

    return {
        'token': token,
    }


types = [Mutation]
