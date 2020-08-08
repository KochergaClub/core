from kocherga.wagtail.utils import filter_queryset_by_page_permissions
from kocherga.wagtail import graphql_utils as wagtail_utils
from kocherga.graphql import g

from ... import models


RatioPresentationIndexPage = wagtail_utils.WagtailPageType(
    model=models.PresentationIndexPage,
    db_fields=['title'],
    extra_fields=lambda: {'presentations': presentations_field()},
)


def presentations_field():
    import kocherga.presentations.models
    from kocherga.presentations.schema.types import PresentationPage

    def resolve(obj, info):
        qs = kocherga.presentations.models.PresentationPage.objects.all().live()
        qs = filter_queryset_by_page_permissions(info.context, qs)
        # TODO - filter by site for parity with `wagtailPage` GraphQL query
        return list(qs)

    return g.Field(g.NNList(PresentationPage), resolve=resolve)


exported_types = [
    RatioPresentationIndexPage,
]
