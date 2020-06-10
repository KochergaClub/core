from django.db import migrations


# code from https://stackoverflow.com/questions/41931590/data-migration-of-image-model
def forwards_func(apps, schema_editor):
    # We get the model from the versioned app registry;
    original_model = apps.get_model('wagtailimages', 'Image')
    custom_model = apps.get_model('kocherga_wagtail', 'CustomImage')
    custom_rendition_model = apps.get_model('kocherga_wagtail', 'CustomRendition')
    db_alias = schema_editor.connection.alias
    # Get images
    images = original_model.objects.using(db_alias).all()

    new_images = []
    new_renditions = []

    for image in images:
        new_image = custom_model(
            id=image.id,
            title=image.title,
            file=image.file,
            width=image.width,
            height=image.height,
            created_at=image.created_at,
            focal_point_x=image.focal_point_x,
            focal_point_y=image.focal_point_y,
            focal_point_width=image.focal_point_width,
            focal_point_height=image.focal_point_height,
            file_size=image.file_size,
            collection=image.collection,
            # tags=image.tags, # does not copy over, but that's ok since we never used tags anyway
            uploaded_by_user=image.uploaded_by_user,
        )
        new_images.append(new_image)

        for rendition in image.renditions.all():
            new_renditions.append(
                custom_rendition_model(
                    id=rendition.id,
                    file=rendition.file,
                    width=rendition.width,
                    height=rendition.height,
                    focal_point_key=rendition.focal_point_key,
                    filter_spec=rendition.filter_spec,
                    image=new_image,
                )
            )
    # Create images in new model
    custom_model.objects.using(db_alias).bulk_create(new_images)
    custom_rendition_model.objects.using(db_alias).bulk_create(new_renditions)
    # Leave all images in previous model


def reverse_func(apps, schema_editor):
    # We get the model from the versioned app registry;
    custom_model = apps.get_model('kocherga_wagtail', 'CustomImage')
    db_alias = schema_editor.connection.alias
    # Delete all images created in the new model
    custom_model.objects.using(db_alias).all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0001_initial'),
        ('kocherga_wagtail', '0002_custom_images'),
    ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
    ]
