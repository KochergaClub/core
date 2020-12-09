import logging

logger = logging.getLogger(__name__)

import datetime
import json

from django.contrib.contenttypes.models import ContentType
from django.db import models
from kocherga.django.managers import RelayQuerySetMixin
from storages.backends.s3boto3 import S3Boto3Storage

import wagtail.core.models
import wagtail.images.models
from wagtail.admin.edit_handlers import FieldPanel

from .mixins import HeadlessPreviewMixin


class PagePreview(models.Model):
    token = models.CharField(max_length=255, unique=True)
    content_type = models.ForeignKey(
        "contenttypes.ContentType", on_delete=models.CASCADE
    )
    content_json = models.TextField()
    created_at = models.DateField(auto_now_add=True)

    def as_page(self):
        content = json.loads(self.content_json)
        page_model = ContentType.objects.get_for_id(
            content["content_type"]
        ).model_class()
        page = page_model.from_json(self.content_json)
        page.pk = content["pk"]
        return page

    @classmethod
    def garbage_collect(cls):
        yesterday = datetime.datetime.now() - datetime.timedelta(hours=24)
        cls.objects.filter(created_at__lt=yesterday).delete()


class CustomImage(wagtail.images.models.AbstractImage):
    private = models.BooleanField(default=False)

    admin_form_fields = wagtail.images.models.Image.admin_form_fields + ('private',)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # TODO - compare current and previous `private` value
        # note that we update ACL after saving, because before saving file is InMemoryUploadedFile and not on S3 yet
        if getattr(self.file.file, 'obj', None):
            self._update_acl()

    def _update_acl(self):
        acl = 'private' if self.private else 'public-read'
        logger.info(f'Updating {self.file.name} ACL to {acl}')

        self.file.file.obj.Acl().put(ACL=acl)
        for rendition in self.renditions.all():
            rendition.file.file.obj.Acl().put(ACL=acl)

    @property
    def url(self):
        result = self.file.url
        if not self.private:
            result = self.file.storage._strip_signing_parameters(result)
        return result


class CustomRendition(wagtail.images.models.AbstractRendition):
    image = models.ForeignKey(
        CustomImage, related_name='renditions', on_delete=models.CASCADE
    )

    class Meta:
        unique_together = (('image', 'filter_spec', 'focal_point_key'),)

    @property
    def url(self):
        result = self.file.url
        if not self.image.private:
            storage = self.image.file.storage
            if isinstance(storage, S3Boto3Storage):
                result = self.image.file.storage._strip_signing_parameters(result)
        return result

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # TODO - compare current and previous `private` value
        # note that we update ACL after saving, because before saving file is InMemoryUploadedFile and not on S3 yet
        if getattr(self.file.file, 'obj', None):
            self._update_acl()

    def _update_acl(self):
        acl = 'private' if self.image.private else 'public-read'
        logger.info(f'Updating {self.file.name} ACL to {acl}')

        self.file.file.obj.Acl().put(ACL=acl)


class KochergaPageQuerySet(wagtail.core.models.PageQuerySet, RelayQuerySetMixin):
    pass


KochergaPageManager = wagtail.core.models.PageManager.from_queryset(
    KochergaPageQuerySet
)


class KochergaPage(HeadlessPreviewMixin, wagtail.core.models.Page):
    objects = KochergaPageManager()

    content_panels = [
        FieldPanel('slug'),
        FieldPanel('title', classname="full title"),
        FieldPanel('search_description'),
    ]

    promote_panels = None

    # see https://docs.wagtail.io/en/stable/reference/pages/model_reference.html#wagtail.core.models.Page.is_creatable
    is_creatable = False

    class Meta:
        # Not `abstract = True` because we want to use KochergaPage.objects.
        # Not non-abstract, non-proxy page because we don't want to create another DB table
        # (and also migration would be non-trivial).
        proxy = True
