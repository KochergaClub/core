"""Root Kocherga URLConf"""

from django.contrib import admin
from django.conf import settings
from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.views.generic.base import RedirectView

from wagtail.core import urls as wagtail_urls

import kocherga.django.drf
from kocherga.graphql.views import kocherga_graphql_view

urlpatterns = (
    [
        path(
            'api/graphql',
            kocherga_graphql_view,
            name='graphql',
        ),
        path('api/', include('kocherga.api.urls')),
        path('api/tochka/', include('kocherga.money.tochka.urls')),
        path('api/', include('kocherga.events.urls')),
        path('api/', include('kocherga.templater.urls')),
        path('api/', include('kocherga.email.urls')),
        path('api/', include('kocherga.fb.urls')),
        path('api/', include('kocherga.yandex_kassa.urls')),
        path('api/', include('kocherga.wagtail.urls')),
        path('api/prometheus/', include('django_prometheus.urls')),
        path('admin/', admin.site.urls),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + [
        path('wagtail/login/', RedirectView.as_view(url='/login', query_string=True)),
        path('wagtail/', include('wagtail.admin.urls')),
        path('admin/login/', RedirectView.as_view(url='/login', query_string=True)),
        re_path('api/.*', kocherga.django.drf.view404),
        # Pages will be served by server.ts, but we need reversed urls for better wagtail admin experience.
        path('', include(wagtail_urls)),
    ]
)
