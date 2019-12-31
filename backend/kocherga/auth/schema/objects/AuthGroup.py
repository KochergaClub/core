from ariadne import ObjectType

AuthGroup = ObjectType('AuthGroup')


@AuthGroup.field('permissions')
def resolve_permissions(obj, info):
    return obj.permissions.all()


@AuthGroup.field('users')
def resolve_users(obj, info):
    return obj.user_set.all()
