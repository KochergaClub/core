from django.db import models
from wagtail.admin import edit_handlers


class Grade(models.Model):
    code = models.CharField('Код', max_length=1)
    multiplier = models.FloatField('Повышающий коэффициент', default=1)

    panels = [
        edit_handlers.FieldPanel('code'),
        edit_handlers.FieldPanel('multiplier'),
    ]

    def __str__(self):
        return self.code

    class Meta:
        verbose_name = 'Грейд'
        verbose_name_plural = 'Грейды'
