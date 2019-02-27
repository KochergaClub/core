from django.db import models

from datetime import datetime
from kocherga.dateutils import TZ


class TaskManager(models.Manager):
    def today_tasks(self):
        today = datetime.now(TZ).date()
        for task in self.all():
            for schedule in task.schedules.all():
                if schedule.check_date(today):
                    yield task
                    continue


class Task(models.Model):
    name = models.TextField('Название', max_length=1024)
    channel = models.CharField('Канал', default='watchmen', max_length=40)

    objects = TaskManager()

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'

    def __str__(self):
        return self.name

    def days_string(self):
        return ','.join(
            str(s)
            for s in self.schedules.all()
        )
    days_string.short_description = 'Расписание'


class Schedule(models.Model):
    weekday = models.IntegerField('День недели',
                                  choices=(
                                      (0, 'Понедельник'),
                                      (1, 'Вторник'),
                                      (2, 'Среда'),
                                      (3, 'Четверг'),
                                      (4, 'Пятница'),
                                      (5, 'Суббота'),
                                      (6, 'Воскресенье'),
                                  ))

    period = models.IntegerField('Периодичность', default=1, help_text='Повторять каждые N недель')

    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='schedules')

    class Meta:
        verbose_name = 'Расписания'
        verbose_name_plural = 'Расписание'

    @property
    def weekday_short(self):
        return ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'][self.weekday]

    def check_date(self, d):
        if d.isocalendar()[1] % self.period:
            return False
        return (d.weekday() == self.weekday)

    def __str__(self):
        result = self.weekday_short
        if self.period != 1:
            result += '/' + str(self.period)
        return result


class RewardImage(models.Model):
    image_link = models.URLField('Ссылка', max_length=255)
    is_active = models.BooleanField('Используется', default=True)

    class Meta:
        verbose_name = 'Добрый мем'
        verbose_name_plural = 'Добрые мемы'

    def __str__(self):
        return self.image_link
