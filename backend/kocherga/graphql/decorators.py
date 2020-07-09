from typing import Optional, List
from functools import wraps


def staffonly(f):
    @wraps(f)
    def wrapper(obj, info, **kwargs):
        if not info.context.user.is_staff:
            raise Exception("Forbidden")

        return f(obj, info, **kwargs)

    return wrapper


def auth(
    permission: Optional[str] = None,
    authenticated: Optional[bool] = None,
    permissions: Optional[List[str]] = None,
):
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
        def wrapper(obj, info, **kwargs):
            if authenticated:
                if not info.context.user.is_authenticated:
                    raise Exception(f"Forbidden: need to be authenticated")
            for perm in permission_names:
                if not info.context.user.has_perm(perm):
                    raise Exception(f"Forbidden: missing permission {perm}")

            return f(obj, info, **kwargs)

        return wrapper

    return decorator
