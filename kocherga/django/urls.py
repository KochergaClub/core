"""Root Kocherga URLConf"""

from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from .wagtail_api import api_router

from wagtail.core import urls as wagtail_urls


urlpatterns = [
    path('api/', include('kocherga.api.urls')),
    path('api/watchmen/', include('kocherga.watchmen.urls')),
    path('api/staff/', include('kocherga.staff.urls')),
    path('api/analytics/', include('kocherga.analytics.urls')),
    path('api/zadarma/', include('kocherga.zadarma.urls')),
    path('api/cashier/', include('kocherga.money.cashier.urls')),
    path('api/ratio/', include('kocherga.ratio.urls')),
    path('api/mastermind_dating/', include('kocherga.mastermind_dating.urls')),
    path('api/', include('kocherga.cm.urls')),
    path('api/', include('kocherga.events.urls')),

    path('', include('kocherga.auth.urls')),
    path('admin/', admin.site.urls),

    path('api/wagtail/', api_router.urls),
    path('wagtail/', include('wagtail.admin.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [

    # Pages will be served by server.ts, but we need reversed urls for better wagtail admin experience.
    path('', include(wagtail_urls)),

    # path(
    #     '404/wagtailsites',
    #     include((
    #         [
    #             path('404', RedirectView.as_view(url='https://kocherga-club.ru'), name='index')
    #         ], 'wagtailsites'
    #     ), 'wagtailsites')
    # ),
]

# Pretty useless - we use Django for DRF only.
if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
