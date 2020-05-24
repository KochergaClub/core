from kocherga.wagtail.utils import filter_queryset_by_page_permissions
from kocherga.graphql.types import DjangoObjectType
from ... import models

RatioPresentationIndexPage = DjangoObjectType('RatioPresentationIndexPage', models.PresentationIndexPage)


@RatioPresentationIndexPage.field('presentations')
def resolve_presentations(obj, info):
    qs = models.PresentationPage.objects.all().live()
    qs = filter_queryset_by_page_permissions(info.context, qs)
    # TODO - filter by site for parity with `wagtailPage` GraphQL query
    return list(qs)
