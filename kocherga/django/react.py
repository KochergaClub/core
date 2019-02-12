from django.shortcuts import render
import django.middleware.csrf

from react.render import render_component

def react_render(request, template, params):
    params = params.copy()
    params['csrfToken'] = django.middleware.csrf.get_token(request)

    react_html = render_component(template, params)

    return render(request, 'react-base.html', {
        'react_html': str(react_html),
        'react_style': react_html.data['style'],
    })
