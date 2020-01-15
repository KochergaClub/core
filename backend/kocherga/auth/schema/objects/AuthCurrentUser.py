from ariadne import ObjectType

AuthCurrentUser = ObjectType('AuthCurrentUser')


@AuthCurrentUser.field('permissions')
def resolve_permissions(obj, info):
    return info.context.user.get_all_permissions()
