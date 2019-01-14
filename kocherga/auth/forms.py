from django import forms
from .models import User

class LoginForm(forms.Form):
    email = forms.EmailField(max_length=255)

class UserCreationForm(forms.ModelForm):
    """A form for creating new users."""

    class Meta:
        model = User
        fields = ('email',)


class UserChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'is_active', 'is_staff')
