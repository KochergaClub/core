from django import forms
from django.core import validators
from django.forms.widgets import TextInput
from django.utils.translation import gettext_lazy as _


from wagtail.users.forms import UserEditForm, UserCreationForm


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


class CustomUserEditForm(UserEditForm):
    # first_name and last_name don't have to be set
    first_name = forms.CharField(required=False, label=_('First Name'))
    last_name = forms.CharField(required=False, label=_('Last Name'))


class CustomUserCreationForm(UserCreationForm):
    # first_name and last_name don't have to be set
    first_name = forms.CharField(required=False, label=_('First Name'))
    last_name = forms.CharField(required=False, label=_('Last Name'))
