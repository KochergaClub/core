import logging
logger = logging.getLogger(__name__)

from .objects import types
from .query import Query
from .mutation import Mutation

types = [Query, Mutation, *types]
