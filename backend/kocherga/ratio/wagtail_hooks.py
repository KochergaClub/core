from django.templatetags.static import static
from django.utils.html import format_html
from wagtail.contrib.modeladmin.options import (ModelAdmin, ModelAdminGroup,
                                                modeladmin_register)
from wagtail.core import hooks

from . import models


@hooks.register('insert_editor_css')
def editor_css():
    return """
    <style>
    .fieldname-ratio_inset {
        padding: 20px; border: 3px dotted #999;
    }
    </style>
    """


@hooks.register('insert_global_admin_css')
def global_admin_css():
    return format_html(
        '<link rel="stylesheet" href="{}">', static('kch-wagtail/global.css')
    )


# class TrainingAdmin(ModelAdmin):
#     model = models.Training
#     # broken until we fix Training's pk
#     # (and unnecessary anyway, /team/raito should be enough)

class TestimonialAdmin(ModelAdmin):
    model = models.Testimonial


class SectionAdmin(ModelAdmin):
    model = models.SectionPage
    list_display = ('__str__', 'status')
    list_filter = ('status',)

    def get_extra_class_names_for_field_col(self, obj, field_name):
        if field_name == '__str__':
            return ['kch-ratio-sectionpage-__str__']
        return []


class NotebookAdmin(ModelAdmin):
    model = models.NotebookPage
    list_display = ('__str__',)


class RatioGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Рацио'
    items = (
        # TrainingAdmin,
        TestimonialAdmin,
        SectionAdmin,
        NotebookAdmin,
    )


modeladmin_register(RatioGroup)
