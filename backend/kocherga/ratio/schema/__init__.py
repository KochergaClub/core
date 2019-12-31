from .query import Query
from .mutation import Mutation
from .objects import types

types = [Query, Mutation, *types]
