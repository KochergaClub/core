from django.shortcuts import render
import django.middleware.csrf
from django.conf import settings

import os

from react.render import render_component

def react_render(request, template, params):
    params = params.copy()
    params['csrfToken'] = django.middleware.csrf.get_token(request)

    react_html = render_component(
        os.path.join(settings.BASE_DIR, 'jsx', template),
        params
    )

    return render(request, 'react-base.html', {
        'react_html': str(react_html),
        'react_style': react_html.data.get('style', ''),
        'react_helmet': react_html.data.get('helmet', ''),
    })
