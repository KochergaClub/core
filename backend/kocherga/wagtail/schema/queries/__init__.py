from kocherga.graphql.helpers import Collection

from . import blocks, collections, images, pages, search

queries = Collection.merge(
    pages.queries, images.queries, blocks.queries, search.queries, collections.queries
)
