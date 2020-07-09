import json

from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import auth

from ..api import generate_token

c = helpers.Collection()


@c.class_field
class openviduGenerateRoomToken(helpers.BaseField):
    @auth(authenticated=True)
    def resolve(self, _, info):
        name = info.context.user.get_full_name()
        if not name:
            raise Exception("User must have a name to join openvidu calls")
        token = generate_token('openroom', data=json.dumps({'name': name}))

        return {
            'token': token,
        }

    result = {
        'token': str,
    }


mutations = c.as_dict()
