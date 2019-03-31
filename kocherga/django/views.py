from kocherga.django.react import react_render


def view_404(request, exception):
    return react_render(request, 'error-pages/404.tsx', status=404)


def view_500(request, exception):
    return react_render(request, 'error-pages/500.tsx', status=500)


def view_403(request, exception):
    return react_render(request, 'error-pages/403.tsx', status=403)
