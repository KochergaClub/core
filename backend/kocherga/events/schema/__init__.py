from .my import My
from .mutation import mutations
from .query import Query
from .types import types

types = [My, Query, *mutations, *types]
