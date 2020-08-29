from kocherga.graphql.helpers import Collection
from . import pages, blocks, search

queries = Collection.merge(pages.queries, blocks.queries, search.queries)
