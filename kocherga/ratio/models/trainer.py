from django.db import models
from django.conf import settings


class Trainer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='ratio_trainer',
    )
    short_name = models.CharField('Короткое имя', max_length=40)
    post_survey_collected = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Тренер'
        verbose_name_plural = 'Тренеры'

    def __str__(self):
        return self.short_name
