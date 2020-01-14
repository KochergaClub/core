from ariadne import ObjectType

from .. import models

# Can't use DjangoObjectType (yet) because it doesn't recognize `meta` field which is defined as interface's resolver.
FaqPage = ObjectType('FaqPage')

@FaqPage.field('entries')
def resolve_entries(obj, info):
    return obj.entries.all()

types = [FaqPage]
