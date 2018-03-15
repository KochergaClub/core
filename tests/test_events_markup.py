from kocherga.events.markup import Markup

def test_simple():
    assert Markup('hello').as_plain() == 'hello'

def test_markdown():
    assert Markup('hello, *hello*').as_html() == '<p>hello, <em>hello</em></p>'

def test_mention_plain():
    assert Markup('hello, секта имени Юдковского').as_plain() == 'hello, секта имени Юдковского'

def test_mention_vk():
    assert Markup('hello, секта имени Юдковского').as_vk() == 'hello, @yudkowsky_sect (секта имени Юдковского)'

def test_entity_plain():
    text = 'Ведущий: {{Entity|name=Сергей Черкасов|fb_id=1575160525854525|vk_id=tapot}}'
    assert Markup(text).as_plain() == 'Ведущий: Сергей Черкасов'

def test_entity_vk():
    text = 'Ведущий: {{Entity|name=Сергей Черкасов|fb_id=1575160525854525|vk_id=tapot}}'
    assert Markup(text).as_vk() == 'Ведущий: @tapot (Сергей Черкасов)'

def test_entity_html():
    text = 'Ведущий: {{Entity|name=Сергей Черкасов|fb_id=1575160525854525|vk_id=tapot}}'
    assert Markup(text).as_html() == '<p>Ведущий: <a href="https://vk.com/tapot">Сергей Черкасов</a></p>'
