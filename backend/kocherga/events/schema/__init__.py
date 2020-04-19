from .my import My
from .mutation import mutations
from .query import Query
from .subscription import Subscription
from .types import types

types = [My, Query, Subscription, *mutations, *types]
