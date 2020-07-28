from kocherga.graphql import g, django_utils
from kocherga.wagtail import graphql_utils as wagtail_utils

from kocherga.wagtail.schema.types import WagtailPage

from .. import models

from kocherga.wagtail.utils import filter_queryset_by_page_permissions
from kocherga.events.schema import types as event_types


ProjectPage = g.ObjectType(
    'ProjectPage',
    interfaces=[WagtailPage],
    fields=lambda: {
        **wagtail_utils.basic_fields(),
        **django_utils.model_fields(
            models.ProjectPage, ['title', 'summary', 'activity_summary', 'is_active'],
        ),
        'body': wagtail_utils.richtext_field(models.ProjectPage, 'body'),
        'image': wagtail_utils.image_rendition_field(models.ProjectPage, 'image'),
        'upcoming_events': g.Field(g.NNList(event_types.Event)),
    },
)


def resolve_ProjectIndexPage_projects(obj, info):
    qs = models.ProjectPage.objects.all().live()
    qs = filter_queryset_by_page_permissions(info.context, qs)
    # TODO - filter by site for parity with `wagtailPage` GraphQL query
    return list(qs)


ProjectIndexPage = g.ObjectType(
    'ProjectIndexPage',
    interfaces=[WagtailPage],
    fields={
        **wagtail_utils.basic_fields(),
        **django_utils.model_fields(models.ProjectIndexPage, ['title']),
        'projects': g.Field(
            g.NNList(ProjectPage), resolve=resolve_ProjectIndexPage_projects
        ),
    },
)


exported_types = [ProjectPage, ProjectIndexPage]
