from kocherga.graphql.types import DjangoObjectType

from .. import models

from kocherga.wagtail.utils import filter_queryset_by_page_permissions


def create_ProjectPage():
    ProjectPage = DjangoObjectType('ProjectPage', models.ProjectPage)

    ProjectPage.simple_property_field('upcoming_events')
    ProjectPage.image_field('image')
    ProjectPage.rich_text_field('body')

    return ProjectPage


def create_ProjectIndexPage():
    ProjectIndexPage = DjangoObjectType('ProjectIndexPage', models.ProjectIndexPage)

    @ProjectIndexPage.field('projects')
    def resolve_projects(obj, info):
        qs = models.ProjectPage.objects.all().live()
        qs = filter_queryset_by_page_permissions(info.context, qs)
        # TODO - filter by site for parity with `wagtailPage` GraphQL query
        return list(qs)

    return ProjectIndexPage


types = [create_ProjectPage(), create_ProjectIndexPage()]
