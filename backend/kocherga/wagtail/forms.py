from django import forms
from django.core import validators
from django.forms.widgets import TextInput


class URLOrAbsolutePathValidator(validators.URLValidator):
    @staticmethod
    def is_absolute_path(value):
        return value.startswith('/')

    def __call__(self, value):
        if URLOrAbsolutePathValidator.is_absolute_path(value):
            return None
        else:
            return super(URLOrAbsolutePathValidator, self).__call__(value)


class URLOrAbsolutePathField(forms.URLField):
    """This field is used in ./blocks.py. The code is copy-pasted from wagtail.wagtailadmin.forms."""
    widget = TextInput
    default_validators = [URLOrAbsolutePathValidator()]

    def to_python(self, value):
        if not URLOrAbsolutePathValidator.is_absolute_path(value):
            value = super(URLOrAbsolutePathField, self).to_python(value)
        return value
