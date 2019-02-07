from django.db import models

class Training(models.Model):
    name = models.CharField(max_length=255, primary_key=True)

    class Meta:
        verbose_name = 'Тренинг'
        verbose_name_plural = 'Тренинги'

    def __str__(self):
        return self.name


class Ticket(models.Model):
    training = models.ForeignKey(Training, on_delete=models.PROTECT, related_name='tickets')

    email = models.EmailField()
    first_name = models.CharField('Имя', max_length=255)
    last_name = models.CharField('Фамилия', max_length=255)

    registration_date = models.DateField('Дата регистрации', null=True)
    status = models.CharField('Статус', max_length=40, choices=(
        ('normal', 'Участник'),
        ('canceled', 'Отказ'), # отказ, перенос, замена, неявка
    ))
    ticket_type = models.CharField('Тип билета', max_length=40, choices=(
        ('normal', 'Обычный'),
        ('stipend', 'Стипендия'),
        ('staff', 'Стафф'),
        ('replacement', 'Замена (заменяет другого участника)'),
        ('carry-over', 'Перенос (с прошлого мероприятия)'),
    ))

    payment_type = models.CharField('Вид оплаты', max_length=40, choices=(
        ('none', '-'),
        ('timepad', 'Timepad'),
        ('website', 'Сайт'),
        ('crowdfunding', 'Краудфандинг'),
        ('cash', 'Нал'),
        ('invoice', 'Счёт'),
        ('transfer', 'Перевод'),
    ))
    payment_amount = models.IntegerField('Размер оплаты')
    paid = models.BooleanField('Оплачено')

    comment = models.TextField()

    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'

    def __str__(self):
        return f'{self.training} - {self.email}'
