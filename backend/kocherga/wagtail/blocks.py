from wagtail.core.blocks import FieldBlock

from . import forms


class URLOrAbsolutePathBlock(FieldBlock):
    "Copy-pasted from wagtail's URLBlock."
    def __init__(self, required=True, help_text=None, max_length=None, min_length=None, validators=(), **kwargs):
        self.field = forms.URLOrAbsolutePathField(
            required=required,
            help_text=help_text,
            max_length=max_length,
            min_length=min_length,
            validators=validators,
        )
        super().__init__(**kwargs)

    class Meta:
        icon = "site"
