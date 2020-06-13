from ariadne import ObjectType

TildaPage = ObjectType('TildaPage')


@TildaPage.field('html_url')
def resolve_html_url(obj, info):
    return obj.content.url


@TildaPage.field('assets')
def resolve_assets(obj, info):
    return list(obj.assets.all())


@TildaPage.field('css')
def resolve_css(obj, info):
    return list(obj.assets.filter(kind='css'))


@TildaPage.field('js')
def resolve_js(obj, info):
    return list(obj.assets.filter(kind='js'))
