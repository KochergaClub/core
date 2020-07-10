import logging

logger = logging.getLogger(__name__)

from typing import Optional, List
import inspect
from functools import wraps


# via https://stackoverflow.com/a/19315046
def _is_method(f):
    spec = inspect.getargspec(f)
    return spec.args and spec.args[0] == 'self'


def staffonly(f):
    """Decorator for resolvers. Checks that user belongs to staff.

    Works both on methods and ordinary functions.
    """

    @wraps(f)
    def wrapper(*args, **kwargs):
        info = args[2] if _is_method(f) else args[1]

        if not info.context.user.is_staff:
            raise Exception("Forbidden")

        return f(*args, **kwargs)

    return wrapper


def auth(
    permission: Optional[str] = None,
    authenticated: Optional[bool] = None,
    permissions: Optional[List[str]] = None,
):
    """Decorator for resolvers. Checks that user is authenticated or has a specific permission.

    Works both on methods and ordinary functions.
    """
    permission_names = []
    if permissions is not None:
        permission_names.extend(permissions)
    if permission is not None:
        permission_names.append(permission)

    if not authenticated and authenticated is not None:
        raise Exception("authenticated param can only be `True` if set")
    if not len(permission_names) and not authenticated:
        raise Exception(
            '@auth requires one of "permission", "permissions" or "authenticated" fields to be set'
        )

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            info = args[2] if _is_method(f) else args[1]

            if authenticated:
                if not info.context.user.is_authenticated:
                    raise Exception(f"Forbidden: need to be authenticated")
            for perm in permission_names:
                if not info.context.user.has_perm(perm):
                    raise Exception(f"Forbidden: missing permission {perm}")

            return f(*args, **kwargs)

        return wrapper

    return decorator
