import pytest

from kocherga.templater.models import Template, list_templates


@pytest.fixture
def t():
    return Template.by_name('vk-image')


@pytest.fixture
def props():
    return {
        'header': 'foo',
        'title': 'Foo Bar',
        'date': '2018-04-01',
        'time': '12:00',
    }


def test_create(t):
    assert t
    assert t.name == 'vk-image'


def test_template_prop(t):
    assert t.template


def test_generate_html(t, props):
    html = t.generate_html(props)
    assert type(html) == str


@pytest.mark.asyncio
async def test_generate_png(t, props):
    img = await t.generate_png(props)
    assert type(img) == bytes


def test_sizes(t):
    assert t.sizes == (550, 350)


def test_schema(t):
    assert t.schema


def test_list():
    tt = list_templates()
    assert type(tt) == list
    assert len(tt) >= 3
