from django.core.signing import TimestampSigner


def get_magic_token(email):
    return TimestampSigner().sign(email)


def check_magic_token(token):
    return TimestampSigner().unsign(token, max_age=600)
