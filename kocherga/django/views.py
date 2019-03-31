from kocherga.django.react import react_render


def page_not_found_view(request):
    return react_render(request, 'error-pages/404.tsx', status=404)
