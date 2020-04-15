from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0052_digest_wagtail_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='weeklydigest',
            old_name='image',
            new_name='image_old',
        ),
        migrations.RenameField(
            model_name='weeklydigest',
            old_name='wagtail_image',
            new_name='image',
        ),
    ]
