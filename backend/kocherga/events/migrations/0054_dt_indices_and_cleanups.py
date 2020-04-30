from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0053_digest_wagtail_image_p2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='image_old',
        ),
        migrations.RemoveField(
            model_name='eventprototype',
            name='image_old',
        ),
        migrations.RemoveField(
            model_name='vkannouncement',
            name='image_old',
        ),
        migrations.RemoveField(
            model_name='weeklydigest',
            name='image_old',
        ),
        migrations.AlterField(
            model_name='event',
            name='end',
            field=models.DateTimeField(db_index=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='start',
            field=models.DateTimeField(db_index=True),
        ),
    ]
