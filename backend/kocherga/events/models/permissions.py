from django.db import models


class Permissions(models.Model):
    class Meta:
        managed = False
        default_permissions = ()

        permissions = [
            ('manage', 'Can manage events and related objects'),
        ]
