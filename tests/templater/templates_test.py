import pytest

from kocherga.templater import Template, list_templates

@pytest.fixture(params=[
    {
        'name': 'vk-image',
        'props': {
            'header': 'foo',
            'title': 'Foo Bar',
            'date': '2018-04-01',
            'time': '12:00',
        }
    },
    {
        'name': 'mailchimp',
        'props': {
            'start_date': '2019-01-21',
            'end_date': '2019-01-27',
        }
    },
])
def html(request):
    template = Template.by_name(request.param['name'])
    html = template.generate_html(request.param['props'])
    return html

def test_generate_html(html):
    assert type(html) == str
