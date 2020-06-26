from django.db import models


class Auth(models.Model):
    id = models.IntegerField(primary_key=True, default=1)
    cookies = models.CharField(max_length=4096)

    @classmethod
    def get(cls):
        result = cls.objects.first()
        if not result:
            raise Exception(
                "CM auth is not initialized, please call kocherga.cm.auth.update_cookies() manually."
            )
        return result
