# see https://github.com/jschneier/django-storages/issues/56 for details

from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    """
    Storage for static files.
    """

    def __init__(self, *args, **kwargs):
        kwargs['location'] = 'static'
        super().__init__(*args, **kwargs)


class MediaStorage(S3Boto3Storage):
    """
    Storage for media files.
    """

    def __init__(self, *args, **kwargs):
        kwargs['location'] = 'media'
        super().__init__(*args, **kwargs)
