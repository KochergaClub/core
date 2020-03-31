from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0050_realm_online'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='zoom_link',
            field=models.URLField(blank=True, max_length=255),
        ),
    ]
