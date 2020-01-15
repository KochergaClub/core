from ariadne import ObjectType

My = ObjectType('My')


@My.field('user')
def resolve_my_user(_, info):
    return info.context.user
