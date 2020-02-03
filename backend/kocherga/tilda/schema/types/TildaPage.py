from ariadne import ObjectType

TildaPage = ObjectType('TildaPage')


@TildaPage.field('html_url')
def resolve_html_url(obj, info):
    return obj.content.url
