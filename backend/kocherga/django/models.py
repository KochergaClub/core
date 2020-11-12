from wagtail.core.models import Collection

from django.db import models


# via https://steelkiwi.com/blog/practical-application-singleton-design-pattern/
class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class Settings(SingletonModel):
    class Meta:
        db_table = "global_settings"

    default_events_images_collection = models.ForeignKey(
        Collection,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name='+',
    )
    default_events_vk_images_collection = models.ForeignKey(
        Collection,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name='+',
    )
