from django.apps import AppConfig

class KochergaAuthConfig(AppConfig):
    name = 'kocherga.auth'
    # Our typical convention for label would be 'auth' (which is implicit).
    # But we want 'kocherga_auth_user' db table so that it's clearer that this table is kocherga-related.
    label = 'kocherga_auth'
    verbose_name = 'Пользователи'
