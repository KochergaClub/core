import logging

logger = logging.getLogger(__name__)

from kocherga.graphql import g
from kocherga.graphql.helpers import Collection
from . import types


c = Collection()


# user: AuthCurrentUser!
@c.field
def user(helper):
    def resolve(_, info):
        logger.info(info.operation)
        logger.info(info.operation.name)
        logger.info(info.operation.name.value)
        return info.context.user

    return g.Field(g.NN(types.AuthCurrentUser), resolve=resolve)


my_queries = c.as_dict()
