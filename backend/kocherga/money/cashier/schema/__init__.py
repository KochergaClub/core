from .query import Query
from .mutation import Mutation
from .types import types

types = [Query, Mutation, *types]
