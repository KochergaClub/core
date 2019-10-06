# Generated by Django 2.2 on 2019-05-21 13:15

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.blocks.static_block
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0007_auto_20190520_2138'),
    ]

    operations = [
        migrations.AlterField(
            model_name='freeformpage',
            name='body',
            field=wagtail.core.fields.StreamField([('basic_lead', wagtail.core.blocks.RichTextBlock(group='basic', label='Крупный текст')), ('basic_paragraph', wagtail.core.blocks.RichTextBlock(group='basic', label='Обычный текст')), ('grey', wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))], group='basic', label='Заголовок секции')), ('columns_basic', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('header', wagtail.core.blocks.CharBlock()), ('text', wagtail.core.blocks.RichTextBlock(required=False))]), group='columns', label='Колонки')), ('columns_memberships', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Название')), ('subtitle', wagtail.core.blocks.CharBlock(label='Подзаголовок')), ('price', wagtail.core.blocks.IntegerBlock(label='Стоимость')), ('description', wagtail.core.blocks.RichTextBlock(label='Описание'))]), group='columns', label='Абонементы')), ('columns_buttons', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(label='Текст')), ('caption', wagtail.core.blocks.CharBlock(label='Текст на кнопке')), ('link', wagtail.core.blocks.URLBlock(label='Ссылка'))]), group='columns', label='Колонки с кнопками')), ('events_list', wagtail.core.blocks.static_block.StaticBlock(group='events', label='Список событий'))]),
        ),
    ]