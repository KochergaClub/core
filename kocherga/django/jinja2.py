from django.templatetags.static import static
from django.urls import reverse

from jinja2 import Environment

import datetime

# used in templater templates
def parse_date(value, fmt):
    return datetime.datetime.strptime(value, fmt)

def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': static,
        'url': reverse,
    })
    env.filters['parse_date'] = parse_date
    return env
