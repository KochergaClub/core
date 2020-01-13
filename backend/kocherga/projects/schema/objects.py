from ariadne import ObjectType

from datetime import datetime
from kocherga.dateutils import TZ

from .. import models

from kocherga.wagtail.utils import filter_queryset_by_page_permissions


def create_ProjectPage():
    ProjectPage = ObjectType('ProjectPage')

    @ProjectPage.field('upcoming_events')
    def resolve_upcoming_events(obj, info):
        qs = obj.events.filter(event_type='public', published=True, deleted=False) \
                       .filter(start__gte = datetime.now(TZ)) \
                       .order_by('start')

        return qs

    @ProjectPage.field('image')
    def resolve_image(obj, info, spec):
        return obj.image.get_rendition(spec)

    return ProjectPage


def create_ProjectIndexPage():
    ProjectIndexPage = ObjectType('ProjectIndexPage')

    @ProjectIndexPage.field('projects')
    def resolve_projects(obj, info):
        qs = models.ProjectPage.objects.all().live()
        qs = filter_queryset_by_page_permissions(info.context, qs)
        # TODO - filter by site for parity with `wagtailPage` GraphQL query
        return list(qs)

    return ProjectIndexPage


types = [create_ProjectPage(), create_ProjectIndexPage()]
