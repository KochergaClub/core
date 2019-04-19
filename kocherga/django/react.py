from django.conf import settings
from django.shortcuts import render

import json

from react.render_server import render_server


def react_render(request, template, params={}, status=200):
    params = params.copy()

    # react_html = render_component(template, params)
    react_html = render_server.render(template, params)

    return render(
        request, 'react-base.html',
        context={
            'google_analytics_id': settings.GOOGLE_ANALYTICS_ID,
            'react_html': str(react_html),
            'react_style': react_html.data.get('style', ''),
            'react_helmet': react_html.data.get('helmet', ''),
            'store': json.dumps({
                'component': template,
                'props': params,
            }),
        },
        status=status,
    )
