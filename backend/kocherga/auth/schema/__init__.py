import logging

logger = logging.getLogger(__name__)

from .objects import types
from .query import Query
from .my import My
from . import mutation

types = [Query, My, *mutation.types, *types]
