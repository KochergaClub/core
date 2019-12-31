from ariadne import ObjectType

AuthPermission = ObjectType('AuthPermission')


@AuthPermission.field('users')
def resolve_users(obj, info):
    return obj.user_set.all()
