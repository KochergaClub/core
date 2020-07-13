from kocherga.graphql import g
from kocherga.graphql import django_utils
from kocherga.wagtail import graphql_utils as wagtail_utils
from kocherga.wagtail.schema.types import WagtailPage

from .. import models

BlogPostAuthor = g.ObjectType(
    'BlogPostAuthor',
    {
        **django_utils.model_fields(models.BlogPostAuthor, ['name', 'description']),
        'image': wagtail_utils.image_rendition_field(models.BlogPostAuthor, 'image'),
    },
)


BlogPostPage = g.ObjectType(
    'BlogPostPage',
    interfaces=[WagtailPage],
    fields={
        **wagtail_utils.basic_fields(),
        **django_utils.model_fields(models.BlogPostPage, ['title', 'date', 'summary']),
        'body': wagtail_utils.richtext_field(models.BlogPostPage, 'body'),
        'authors': django_utils.related_field(
            models.BlogPostPage, 'authors', item_type=BlogPostAuthor
        ),
    },
)


BlogIndexPage = g.ObjectType(
    'BlogIndexPage',
    interfaces=[WagtailPage],
    fields={
        **wagtail_utils.basic_fields(),
        **django_utils.model_fields(models.BlogIndexPage, ['title', 'subtitle']),
        'posts': g.Field(g.NNList(BlogPostPage)),
    },
)

exported_types = [BlogPostAuthor, BlogPostPage, BlogIndexPage]
