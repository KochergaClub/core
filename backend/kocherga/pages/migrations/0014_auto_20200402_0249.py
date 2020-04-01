# Generated by Django 3.0.3 on 2020-04-01 23:49

from django.db import migrations
import kocherga.wagtail.blocks
import wagtail.core.blocks
import wagtail.core.blocks.static_block
import wagtail.core.fields
import wagtail.images.blocks
import wagtailgeowidget.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0013_auto_20190522_2113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='freeformpage',
            name='body',
            field=wagtail.core.fields.StreamField([('grey', wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))], group='basic', icon='title', label='Заголовок секции')), ('basic_lead', wagtail.core.blocks.RichTextBlock(group='basic', icon='bold', label='Крупный текст')), ('basic_paragraph', wagtail.core.blocks.RichTextBlock(group='basic', icon='doc-full', label='Обычный текст')), ('columns_basic', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))]), group='columns', label='Колонки')), ('columns_memberships', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Название')), ('subtitle', wagtail.core.blocks.CharBlock(label='Подзаголовок')), ('price', wagtail.core.blocks.IntegerBlock(label='Стоимость')), ('description', wagtail.core.blocks.RichTextBlock(label='Описание'))]), group='columns', label='Абонементы')), ('columns_buttons', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Текст')), ('caption', wagtail.core.blocks.CharBlock(label='Текст на кнопке')), ('link', kocherga.wagtail.blocks.URLOrAbsolutePathBlock(label='Ссылка'))]), group='columns', label='Колонки с кнопками')), ('events_list', wagtail.core.blocks.static_block.StaticBlock(group='various', icon='list-ul', label='Список событий')), ('big_contacts', wagtail.core.blocks.StructBlock([('map', wagtailgeowidget.blocks.GeoBlock(label='Координаты')), ('address', wagtail.core.blocks.CharBlock(label='Адрес')), ('phone', wagtail.core.blocks.CharBlock(label='Телефон')), ('email', wagtail.core.blocks.CharBlock(label='Email')), ('text', wagtail.core.blocks.CharBlock(label='Текст'))], group='various', icon='site', label='Карта с адресом')), ('photo_ribbon', wagtail.core.blocks.ListBlock(wagtail.images.blocks.ImageChooserBlock(), group='various', label='Лента фоток')), ('mailchimp_subscribe', wagtail.core.blocks.StructBlock([('news', wagtail.core.blocks.BooleanBlock(default=True, label='Материалы и новости')), ('events', wagtail.core.blocks.BooleanBlock(default=True, label='Расписание мероприятий')), ('trainings', wagtail.core.blocks.BooleanBlock(default=True, label='Уведомления о новых тренингах'))], group='various', label='Форма подписки'))]),
        ),
        migrations.AlterField(
            model_name='frontpage',
            name='body',
            field=wagtail.core.fields.StreamField([('grey', wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))], group='basic', icon='title', label='Заголовок секции')), ('basic_lead', wagtail.core.blocks.RichTextBlock(group='basic', icon='bold', label='Крупный текст')), ('basic_paragraph', wagtail.core.blocks.RichTextBlock(group='basic', icon='doc-full', label='Обычный текст')), ('columns_basic', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))]), group='columns', label='Колонки')), ('columns_memberships', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Название')), ('subtitle', wagtail.core.blocks.CharBlock(label='Подзаголовок')), ('price', wagtail.core.blocks.IntegerBlock(label='Стоимость')), ('description', wagtail.core.blocks.RichTextBlock(label='Описание'))]), group='columns', label='Абонементы')), ('columns_buttons', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Текст')), ('caption', wagtail.core.blocks.CharBlock(label='Текст на кнопке')), ('link', kocherga.wagtail.blocks.URLOrAbsolutePathBlock(label='Ссылка'))]), group='columns', label='Колонки с кнопками')), ('events_list', wagtail.core.blocks.static_block.StaticBlock(group='various', icon='list-ul', label='Список событий')), ('big_contacts', wagtail.core.blocks.StructBlock([('map', wagtailgeowidget.blocks.GeoBlock(label='Координаты')), ('address', wagtail.core.blocks.CharBlock(label='Адрес')), ('phone', wagtail.core.blocks.CharBlock(label='Телефон')), ('email', wagtail.core.blocks.CharBlock(label='Email')), ('text', wagtail.core.blocks.CharBlock(label='Текст'))], group='various', icon='site', label='Карта с адресом')), ('photo_ribbon', wagtail.core.blocks.ListBlock(wagtail.images.blocks.ImageChooserBlock(), group='various', label='Лента фоток')), ('mailchimp_subscribe', wagtail.core.blocks.StructBlock([('news', wagtail.core.blocks.BooleanBlock(default=True, label='Материалы и новости')), ('events', wagtail.core.blocks.BooleanBlock(default=True, label='Расписание мероприятий')), ('trainings', wagtail.core.blocks.BooleanBlock(default=True, label='Уведомления о новых тренингах'))], group='various', label='Форма подписки')), ('hero_front', wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Заголовок')), ('features', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Подзаголовок')), ('link', kocherga.wagtail.blocks.URLOrAbsolutePathBlock(label='Ссылка', required=False)), ('items', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('text', wagtail.core.blocks.CharBlock(label='Элемент')), ('link', kocherga.wagtail.blocks.URLOrAbsolutePathBlock(label='Ссылка', required=False))])))]), label='Фичи'))], group='various', icon='home'))]),
        ),
    ]
