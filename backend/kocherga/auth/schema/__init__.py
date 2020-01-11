import logging
logger = logging.getLogger(__name__)

from .objects import types
from .query import Query
from .my import My
from .mutation import Mutation

types = [Query, My, Mutation, *types]
