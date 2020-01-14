from kocherga.graphql.types import DjangoObjectType

from .. import models


def create_BlogPostAuthor():
    BlogPostAuthor = DjangoObjectType('BlogPostAuthor', models.BlogPostAuthor)

    BlogPostAuthor.image_field('image')

    return BlogPostAuthor


def create_BlogPostPage():
    BlogPostPage = DjangoObjectType('BlogPostPage', models.BlogPostPage)

    BlogPostPage.related_field('authors')
    BlogPostPage.rich_text_field('body')

    return BlogPostPage


types = [create_BlogPostAuthor(), create_BlogPostPage()]
