from django.db import models


class Permissions(models.Model):
    # based on idea from https://stackoverflow.com/a/37988537
    class Meta:
        managed = False
        default_permissions = ()
        permissions = (('view_access', 'view external service access data'),)
