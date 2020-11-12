from functools import wraps


def superuseronly(obj, info):
    """Checks that user is superuser."""

    if not info.context.user.is_superuser:
        raise Exception("Forbidden: need to be superuser")

    return True


def staffonly(obj, info):
    """Checks that user belongs to staff."""

    if not info.context.user.is_staff:
        raise Exception("Forbidden: need to be staff member")

    return True


def authenticated(obj, info):
    """Checks that user is authenticated."""

    if not info.context.user.is_authenticated:
        raise Exception("Forbidden: need to be authenticated")

    return True


def user_perm(permission: str):
    """Checks that user has a specific django permission."""

    def checker(obj, info):
        if not info.context.user.has_perm(permission):
            raise Exception(f"Forbidden: missing permission {permission}")

        return True

    return checker


def check_permissions(permissions):
    """Decorator for adding permission checks to a given resolve() function."""

    # sanity check
    assert isinstance(permissions, list)

    def decorator(resolve):
        @wraps(resolve)
        def wrapper(obj, info, **kwargs):
            for permission in permissions:
                if not permission(obj, info):
                    # TODO - return None on false result?
                    # permission checkers can throw exceptions when permission is denied
                    raise Exception("Permission denied")
            return resolve(obj, info, **kwargs)

        return wrapper

    return decorator
