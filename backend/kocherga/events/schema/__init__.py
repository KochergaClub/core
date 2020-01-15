from .my import My
from .mutation import Mutation
from .query import Query
from .types import types

types = [My, Query, Mutation, *types]
