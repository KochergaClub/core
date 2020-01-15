from .query import Query
from .mutation import types as mutation_types
from .types import types as object_types

types = [Query, *mutation_types, *object_types]
