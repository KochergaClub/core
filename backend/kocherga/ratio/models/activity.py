from django.db import models

from .training_day import TrainingDay
from .trainer import Trainer


# Activities can be of several types:
# - sections (classes)
# - breaks
# - bonuses
class Activity(models.Model):
    training_day = models.ForeignKey(
        TrainingDay, on_delete=models.CASCADE, related_name='schedule', null=True
    )

    time = models.TimeField('Время')

    activity_type = models.CharField(
        'Тип',
        max_length=40,
        choices=(('section', 'Секция'), ('break', 'Перерыв'), ('bonus', 'Бонус'),),
    )
    name = models.CharField('Название', max_length=255)
    location = models.CharField('Локация', max_length=255, blank=True)

    trainer = models.ForeignKey(
        Trainer,
        verbose_name='Ведущий',
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name='+',
    )

    class Meta:
        ordering = (
            'training_day__training__date',
            'training_day__date',
            'time',
        )
        verbose_name = 'Активность'
        verbose_name_plural = 'Активности'

    # TODO - support foreign key links to the collection of actual activities - slides, workbook bits, etc.
