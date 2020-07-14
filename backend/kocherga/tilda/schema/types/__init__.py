from kocherga.graphql import g, django_utils

from ... import models

TildaPage = django_utils.DjangoObjectType(
    'TildaPage',
    models.TildaPage,
    db_fields=['page_id', 'path', 'body', 'title', 'show_header_and_footer'],
    extra_fields=lambda: g.fields(
        {
            'assets': g.Field(g.NNList(TildaAsset), resolve=resolve_assets),
            'css': g.Field(g.NNList(TildaAsset), resolve=resolve_css),
            'js': g.Field(g.NNList(TildaAsset), resolve=resolve_js),
        },
    ),
)


def resolve_assets(obj, info):
    return list(obj.assets.all())


def resolve_css(obj, info):
    return list(obj.assets.filter(kind='css'))


def resolve_js(obj, info):
    return list(obj.assets.filter(kind='js'))


TildaAsset = django_utils.DjangoObjectType(
    'TildaAsset', models.Asset, db_fields=['url', 'kind'],
)
