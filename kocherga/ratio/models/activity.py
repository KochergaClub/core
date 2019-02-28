from django.db import models

from .training import Training
from .trainer import Trainer


# Activities can be of several types:
# - sections (classes)
# - breaks
# - bonuses
# TODO - add 'type' field or figure out some other way to make activities polymorphic.
class Activity(models.Model):
    training = models.ForeignKey(Training, verbose_name='Тренинг', on_delete=models.CASCADE, related_name='schedule')

    day = models.PositiveSmallIntegerField('День')
    time = models.TimeField('Время')

    activity_type = models.CharField('Тип', max_length=40, choices=(
        ('section', 'Cекция'),
        ('break', 'Перерыв'),
        ('bonus', 'Бонус'),
    ))
    name = models.CharField('Название', max_length=255)

    trainer = models.ForeignKey(
        Trainer,
        verbose_name='Ведущий',
        blank=True, null=True,
        on_delete=models.PROTECT,
        related_name='+'
    )

    class Meta:
        ordering = ('day', 'time')
        verbose_name = 'Активность'
        verbose_name_plural = 'Активности'

    # TODO - support foreign key links to the collection of actual activities - slides, workbook bits, etc.
