import django.apps


class AppConfig(django.apps.AppConfig):
    name = 'kocherga.wagtail'
    # avoid collision with wagtail core
    label = 'kocherga_wagtail'
