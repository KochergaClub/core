from django.contrib.auth.models import Permission
from django.core.signing import TimestampSigner


def get_magic_token(email):
    return TimestampSigner().sign(email)


def check_magic_token(token):
    return TimestampSigner().unsign(token, max_age=600)


# via: https://django-permission.readthedocs.io/en/latest/_modules/permission/utils/permissions.html
def permission_to_perm(permission: Permission) -> str:
    """
    Convert a django permission instance to a identifier string permission
    format in 'app_label.codename' (termed as *perm*).

    Examples
    --------
    >>> permission = Permission.objects.get(
    ...     content_type__app_label='auth',
    ...     codename='add_user',
    ... )
    >>> permission_to_perm(permission) == 'auth.add_user'
    True
    """
    app_label = permission.content_type.app_label
    codename = permission.codename
    return "%s.%s" % (app_label, codename)


def perm_to_permission(perm: str) -> Permission:
    """
    Convert a identifier string permission format in 'app_label.codename'
    (teremd as *perm*) to a django permission instance.

    Examples
    --------
    >>> permission = perm_to_permission('auth.add_user')
    >>> permission.content_type.app_label == 'auth'
    True
    >>> permission.codename == 'add_user'
    True
    """
    try:
        app_label, codename = perm.split('.', 1)
    except IndexError:
        raise AttributeError(
            "The format of identifier string permission (perm) is wrong. "
            "It should be in 'app_label.codename'."
        )
    else:
        permission = Permission.objects.get(
            content_type__app_label=app_label, codename=codename
        )
        return permission
