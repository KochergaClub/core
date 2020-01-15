from ariadne import ObjectType

ZadarmaPbxCall = ObjectType('ZadarmaPbxCall')


@ZadarmaPbxCall.field('calls')
def resolve_calls(obj, info):
    return obj.calls.all()
