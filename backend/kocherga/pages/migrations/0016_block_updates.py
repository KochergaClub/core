# Generated by Django 3.0.5 on 2020-08-20 01:38

from django.db import migrations
import kocherga.wagtail.blocks
import wagtail.core.blocks
import wagtail.core.blocks.static_block
import wagtail.core.fields
import wagtail.images.blocks
import wagtailgeowidget.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0015_block_updates'),
    ]

    operations = [
        migrations.AlterField(
            model_name='freeformpage',
            name='body',
            field=wagtail.core.fields.StreamField([('grey', wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))], group='basic', icon='title', label='Заголовок секции')), ('basic_lead', wagtail.core.blocks.RichTextBlock(group='basic', icon='bold', label='Крупный текст')), ('basic_paragraph', wagtail.core.blocks.RichTextBlock(group='basic', icon='doc-full', label='Обычный текст')), ('basic_text', wagtail.core.blocks.StructBlock([('text', wagtail.core.blocks.RichTextBlock()), ('centered', wagtail.core.blocks.BooleanBlock(required=False))], group='basic', icon='doc-full', label='Обычный текст v2')), ('columns_basic', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))]), group='columns', label='Колонки')), ('columns_buttons', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Заголовок')), ('text', wagtail.core.blocks.CharBlock(label='Текст')), ('image', wagtail.images.blocks.ImageChooserBlock()), ('caption', wagtail.core.blocks.CharBlock(label='Текст на кнопке')), ('link', kocherga.wagtail.blocks.URLOrAbsolutePathBlock(label='Ссылка'))]), group='columns', label='Колонки с кнопками')), ('events_list', wagtail.core.blocks.static_block.StaticBlock(group='various', icon='list-ul', label='Список событий')), ('big_contacts', wagtail.core.blocks.StructBlock([('map', wagtailgeowidget.blocks.GeoBlock(label='Координаты')), ('address', wagtail.core.blocks.CharBlock(label='Адрес')), ('phone', wagtail.core.blocks.CharBlock(label='Телефон')), ('email', wagtail.core.blocks.CharBlock(label='Email')), ('text', wagtail.core.blocks.CharBlock(label='Текст'))], group='various', icon='site', label='Карта с адресом')), ('photo_ribbon', wagtail.core.blocks.ListBlock(wagtail.images.blocks.ImageChooserBlock(), group='various', label='Лента фоток')), ('mailchimp_subscribe', wagtail.core.blocks.StructBlock([('news', wagtail.core.blocks.BooleanBlock(default=True, label='Материалы и новости')), ('events', wagtail.core.blocks.BooleanBlock(default=True, label='Расписание мероприятий')), ('trainings', wagtail.core.blocks.BooleanBlock(default=True, label='Уведомления о новых тренингах'))], group='various', label='Форма подписки'))]),
        ),
        migrations.AlterField(
            model_name='frontpage',
            name='body',
            field=wagtail.core.fields.StreamField([('grey', wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))], group='basic', icon='title', label='Заголовок секции')), ('basic_lead', wagtail.core.blocks.RichTextBlock(group='basic', icon='bold', label='Крупный текст')), ('basic_paragraph', wagtail.core.blocks.RichTextBlock(group='basic', icon='doc-full', label='Обычный текст')), ('basic_text', wagtail.core.blocks.StructBlock([('text', wagtail.core.blocks.RichTextBlock()), ('centered', wagtail.core.blocks.BooleanBlock(required=False))], group='basic', icon='doc-full', label='Обычный текст v2')), ('columns_basic', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))]), group='columns', label='Колонки')), ('columns_buttons', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Заголовок')), ('text', wagtail.core.blocks.CharBlock(label='Текст')), ('image', wagtail.images.blocks.ImageChooserBlock()), ('caption', wagtail.core.blocks.CharBlock(label='Текст на кнопке')), ('link', kocherga.wagtail.blocks.URLOrAbsolutePathBlock(label='Ссылка'))]), group='columns', label='Колонки с кнопками')), ('events_list', wagtail.core.blocks.static_block.StaticBlock(group='various', icon='list-ul', label='Список событий')), ('big_contacts', wagtail.core.blocks.StructBlock([('map', wagtailgeowidget.blocks.GeoBlock(label='Координаты')), ('address', wagtail.core.blocks.CharBlock(label='Адрес')), ('phone', wagtail.core.blocks.CharBlock(label='Телефон')), ('email', wagtail.core.blocks.CharBlock(label='Email')), ('text', wagtail.core.blocks.CharBlock(label='Текст'))], group='various', icon='site', label='Карта с адресом')), ('photo_ribbon', wagtail.core.blocks.ListBlock(wagtail.images.blocks.ImageChooserBlock(), group='various', label='Лента фоток')), ('mailchimp_subscribe', wagtail.core.blocks.StructBlock([('news', wagtail.core.blocks.BooleanBlock(default=True, label='Материалы и новости')), ('events', wagtail.core.blocks.BooleanBlock(default=True, label='Расписание мероприятий')), ('trainings', wagtail.core.blocks.BooleanBlock(default=True, label='Уведомления о новых тренингах'))], group='various', label='Форма подписки')), ('hero_front', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Заголовок')), ('buttons', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Подзаголовок')), ('link', kocherga.wagtail.blocks.URLOrAbsolutePathBlock(label='Ссылка', required=False))]), label='Кнопки'))], group='various', icon='home'))]),
        ),
    ]
