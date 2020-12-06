from wagtail.core.models import Collection, get_root_collection_id

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
        default=get_root_collection_id,
        on_delete=models.PROTECT,
        related_name='+',
    )
    default_events_vk_images_collection = models.ForeignKey(
        Collection,
        default=get_root_collection_id,
        on_delete=models.PROTECT,
        related_name='+',
    )

    weekly_digest_images_collection = models.ForeignKey(
        Collection,
        default=get_root_collection_id,
        on_delete=models.PROTECT,
        related_name='+',
    )
    telegram_images_collection = models.ForeignKey(
        Collection,
        default=get_root_collection_id,
        on_delete=models.PROTECT,
        related_name='+',
    )
    community_org_team_telegram_chat = models.ForeignKey(
        'telegram.Chat',
        blank=True,
        null=True,
        related_name='+',
        on_delete=models.PROTECT,
    )
