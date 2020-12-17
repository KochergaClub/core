from kocherga.graphql import django_utils, g, helpers, permissions
from kocherga.wagtail import graphql_utils as wagtail_utils

from ... import models

TildaPage = django_utils.DjangoObjectType(
    'TildaPage',
    models.TildaPage,
    db_fields=[
        'id',
        'page_id',
        'path',
        'body',
        'title',
        'description',
        'show_header_and_footer',
    ],
    extra_fields=lambda: g.fields(
        {
            'og_image': wagtail_utils.image_rendition_field(
                models.TildaPage, 'og_image'
            ),
            'assets': g.Field(g.NNList(TildaAsset), resolve=resolve_assets),
            'css': g.Field(g.NNList(TildaAsset), resolve=resolve_css),
            'js': g.Field(g.NNList(TildaAsset), resolve=resolve_js),
            'imported_dt': imported_dt().as_field(),
        },
    ),
)


class imported_dt(helpers.BaseField):
    def resolve(self, obj, info):
        return obj.imported_dt

    permissions = [permissions.staffonly]
    result = str


def resolve_assets(obj, info):
    return list(obj.assets.all())


def resolve_css(obj, info):
    return list(obj.assets.filter(kind='css'))


def resolve_js(obj, info):
    return list(obj.assets.filter(kind='js'))


TildaAsset = django_utils.DjangoObjectType(
    'TildaAsset',
    models.Asset,
    db_fields=['url', 'kind'],
)
