# Generated by Django 3.2.4 on 2021-06-06 17:38

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('presentations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='presentationpage',
            name='slides',
            field=wagtail.core.fields.StreamField([('slide_title', wagtail.core.blocks.CharBlock(form_classname='title', label='Заголовок')), ('slide_rich_text', wagtail.core.blocks.RichTextBlock(features=['bold', 'italic', 'bad', 'embed', 'link', 'h2', 'h3', 'h4', 'hr', 'ol', 'ul', 'image'], label='Текст с разметкой')), ('slide_raw_html', wagtail.core.blocks.RawHTMLBlock(label='Произвольный HTML')), ('slide_fragments', wagtail.core.blocks.StreamBlock([('rich_text', wagtail.core.blocks.RichTextBlock(features=['bold', 'italic', 'bad', 'embed', 'link', 'h2', 'h3', 'h4', 'hr', 'ol', 'ul', 'image'], label='Текст')), ('raw_html', wagtail.core.blocks.RawHTMLBlock(label='Произвольный HTML'))], label='Фрагменты (появляются поочерёдно)'))], blank=True),
        ),
    ]