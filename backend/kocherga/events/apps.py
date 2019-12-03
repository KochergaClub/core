import django.apps


class AppConfig(django.apps.AppConfig):
    name = 'kocherga.events'
    verbose_name = 'События'

    def ready(self):
        # via https://stackoverflow.com/a/21612050
        import kocherga.events.signals  # NOQA
