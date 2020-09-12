from kocherga.graphql.helpers import Collection
from . import pages, images, blocks, search

queries = Collection.merge(
    pages.queries, images.queries, blocks.queries, search.queries
)
