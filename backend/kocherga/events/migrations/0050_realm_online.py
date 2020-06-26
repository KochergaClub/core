from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0049_realm'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='realm',
            field=models.CharField(
                choices=[('offline', 'offline'), ('online', 'online')],
                default='offline',
                max_length=40,
            ),
        ),
    ]
