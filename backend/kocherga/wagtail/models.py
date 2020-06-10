import datetime
import json

from django.contrib.contenttypes.models import ContentType
from django.db import models

import wagtail.images.models


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
    admin_form_fields = wagtail.images.models.Image.admin_form_fields

    private = models.BooleanField(default=True)

    def set_private(self, value: bool):
        assert type(value) == bool
        acl = 'private' if value else 'public-read'

        self.file.file.obj.Acl().put(ACL=acl)
        for rendition in self.renditions.all():
            rendition.file.file.obj.Acl().put(ACL=acl)

        self.private = value
        self.save()

    @property
    def url(self):
        result = self.file.url
        if not self.private:
            result = self.file.storage._strip_signing_parameters(result)
        return result


class CustomRendition(wagtail.images.models.AbstractRendition):
    image = models.ForeignKey(CustomImage, related_name='renditions', on_delete=models.CASCADE)

    class Meta:
        unique_together = (
            ('image', 'filter_spec', 'focal_point_key'),
        )

    @property
    def url(self):
        result = self.file.url
        if not self.image.private:
            result = self.image.file.storage._strip_signing_parameters(result)
        return result
