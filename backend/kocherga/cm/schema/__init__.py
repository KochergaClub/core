from .query import Query, My
from .mutation import Mutation
from .types import types

types = [Query, My, Mutation, *types]
