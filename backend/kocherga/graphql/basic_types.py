from typing import Optional
from . import g


# TODO - why is `ok` nullable?
BasicResult = g.ObjectType('BasicResult', g.fields({'ok': Optional[bool]}))

PageInfo = g.ObjectType(
    'PageInfo',
    g.fields(
        {
            'hasNextPage': bool,
            'hasPreviousPage': bool,
            'startCursor': Optional[str],
            'endCursor': Optional[str],
        }
    ),
)

__all__ = ['BasicResult', 'PageInfo']
