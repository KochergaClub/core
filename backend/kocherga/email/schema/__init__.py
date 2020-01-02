from .query import Query
from .my import My
from .mutation import Mutation
from .objects import types

types = [Query, My, Mutation, *types]
