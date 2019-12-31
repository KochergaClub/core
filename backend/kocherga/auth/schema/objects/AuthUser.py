from ariadne import ObjectType

AuthUser = ObjectType('AuthUser')


@AuthUser.field('staff_member')
def resolve_staff_member(obj, info):
    return obj.staff_member  # TODO - dataloader
