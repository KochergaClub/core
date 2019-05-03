"""kocherga URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from .wagtail_api import api_router

urlpatterns = []

if not settings.IGNORE_WEB:
    urlpatterns = urlpatterns + [
        path('api/', include('kocherga.api.urls')),
        path('api/watchmen/', include('kocherga.watchmen.urls')),
        path('api/staff/', include('kocherga.staff.urls')),
        path('api/analytics/', include('kocherga.analytics.urls')),
        path('api/zadarma/', include('kocherga.zadarma.urls')),
        path('api/cashier/', include('kocherga.money.cashier.urls')),
        path('api/ratio/', include('kocherga.ratio.urls')),
        path('api/mastermind_dating/', include('kocherga.mastermind_dating.urls')),
        path('api/cm/', include('kocherga.cm.urls')),

        path('', include('kocherga.auth.urls')),
        path('admin/', admin.site.urls),

        path('api/wagtail/', api_router.urls),
        path('wagtail/', include('wagtail.admin.urls')),

        re_path('404/(.*)', RedirectView.as_view(url='https://kocherga-club.ru'), name='wagtail_serve'),
        path(
            '404/wagtailsites',
            include((
                [
                    path('404', RedirectView.as_view(url='https://kocherga-club.ru'), name='index')
                ], 'wagtailsites'
            ), 'wagtailsites')
        ),

    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    if settings.DEBUG:
        import debug_toolbar
        urlpatterns = [
            path('__debug__/', include(debug_toolbar.urls)),
        ] + urlpatterns
