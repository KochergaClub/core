from django import forms
from .models import User


class LoginForm(forms.Form):
    email = forms.EmailField(max_length=255)


class UserCreationForm(forms.ModelForm):
    """A form for creating new users."""

    class Meta:
        model = User
        fields = ('email',)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(None)
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'is_active', 'is_staff')
