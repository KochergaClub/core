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
from django.urls import path, include
from django.conf.urls.static import static
from django.views.generic.base import RedirectView


urlpatterns = [
    path('', RedirectView.as_view(url='https://kocherga-club.ru'), name='root'),
    path('team/', RedirectView.as_view(url='/team/staff/'), name='team_root'),
]

if not settings.IGNORE_WEB:
    urlpatterns = urlpatterns + [
        path('api/', include('kocherga.api.urls')),
        path('team/ratio/', include('kocherga.ratio.urls')),
        path('team/analytics/', include('kocherga.analytics.urls')),
        path('team/mastermind_dating/', include('kocherga.mastermind_dating.urls')),
        path('team/events/', include('kocherga.events.urls')),
        path('team/cashier/', include('kocherga.money.cashier.urls')),
        path('team/watchmen/', include('kocherga.watchmen.urls')),
        path('team/zadarma/', include('kocherga.zadarma.urls')),
        path('team/staff/', include('kocherga.staff.urls')),
        path('my/', include('kocherga.my.urls')),
        path('', include('kocherga.auth.urls')),
        path('admin/', admin.site.urls),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    if settings.DEBUG:
        import debug_toolbar
        urlpatterns = [
            path('__debug__/', include(debug_toolbar.urls)),
        ] + urlpatterns
