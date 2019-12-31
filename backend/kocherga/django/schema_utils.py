# TODO - move these helpers to kocherga.ariadne


def require_permission(permission_name):
    def decorator(func):
        def wrapper(*args, **kwargs):
            info = args[1]
            if not info.context.user.has_perm(permission_name):
                raise Exception("Forbidden")
            return func(*args, **kwargs)
        return wrapper

    return decorator


def require_staff(func):
    def wrapper(*args, **kwargs):
        info = args[1]
        if not info.context.user.is_staff:
            raise Exception("Forbidden")
        return func(*args, **kwargs)
    return wrapper
