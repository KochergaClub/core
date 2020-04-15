from django.db import migrations, models
from wagtail.images.models import Image


# adapted from 0046 migration
def fill_wagtail_images(apps, schema_editor):
    # Note that we don't use apps.get_model here - it won't work.
    # Hopefully Image class won't change much in the future...
    image_class = Image
    historical_image_class = apps.get_model('wagtailimages', 'Image')

    model_class = apps.get_model('events', 'WeeklyDigest')
    for obj in model_class.objects.all():
        if obj.image:
            title = 'WeeklyDigest cover - {obj.start}'

            image = image_class(title=title)
            image.file = obj.image.file
            image.save()

            # Django doesn't accept Image object here because it checks FK type, so we have to reload it with correct class.
            historical_image = historical_image_class.objects.get(pk=image.pk)
            obj.wagtail_image = historical_image

            obj.save()


def nop(x, y):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0001_squashed_0021'),
        ('events', '0051_zoom_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='weeklydigest',
            name='wagtail_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=models.deletion.PROTECT, related_name='+', to='wagtailimages.Image'),
        ),
        migrations.RunPython(
            fill_wagtail_images,
            nop,
        ),
    ]
