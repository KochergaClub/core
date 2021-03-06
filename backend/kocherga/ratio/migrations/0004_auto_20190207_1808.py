# Generated by Django 2.1.5 on 2019-02-07 15:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0003_auto_20190207_1612'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                (
                    'id',
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                ('email', models.EmailField(max_length=254)),
                ('first_name', models.CharField(max_length=255, verbose_name='Имя')),
                ('last_name', models.CharField(max_length=255, verbose_name='Фамилия')),
                (
                    'registration_date',
                    models.DateField(null=True, verbose_name='Дата регистрации'),
                ),
                (
                    'status',
                    models.CharField(
                        choices=[('normal', 'Участник'), ('canceled', 'Отказ')],
                        max_length=40,
                        verbose_name='Статус',
                    ),
                ),
                (
                    'ticket_type',
                    models.CharField(
                        choices=[
                            ('normal', 'Обычный'),
                            ('stipend', 'Стипендия'),
                            ('staff', 'Стафф'),
                            ('replacement', 'Замена (заменяет другого участника)'),
                            ('carry-over', 'Перенос (с прошлого мероприятия)'),
                        ],
                        max_length=40,
                        verbose_name='Тип билета',
                    ),
                ),
                (
                    'payment_type',
                    models.CharField(
                        choices=[
                            ('none', '-'),
                            ('timepad', 'Timepad'),
                            ('website', 'Сайт'),
                            ('crowdfunding', 'Краудфандинг'),
                            ('cash', 'Нал'),
                            ('invoice', 'Счёт'),
                            ('transfer', 'Перевод'),
                        ],
                        max_length=40,
                        verbose_name='Вид оплаты',
                    ),
                ),
                ('payment_amount', models.IntegerField(verbose_name='Размер оплаты')),
                ('paid', models.BooleanField()),
                ('comment', models.TextField()),
                (
                    'training',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name='tickets',
                        to='ratio.Training',
                    ),
                ),
            ],
            options={'verbose_name': 'Участник', 'verbose_name_plural': 'Участники',},
        ),
        migrations.RemoveField(model_name='participant', name='training',),
        migrations.DeleteModel(name='Participant',),
    ]
