from kocherga.telegram import split_message_into_chunks


def test_split_short():
    assert split_message_into_chunks('abc') == ['abc']


def test_split_empty():
    assert split_message_into_chunks('') == ['']


def test_split_paragraphs():
    p1 = 'a' * 4000
    p2 = 'b' * 4000
    p3 = 'c' * 4000
    message = p1 + '\n\n' + p2 + '\n\n' + p3
    assert split_message_into_chunks(message) == [p1, p2, p3]


def test_split_short_paragraphs():
    p1 = 'a' * 4000
    p2 = 'b' * 4000
    message = 'foo\n\n' + p1 + '\n\n' + p2 + '\n\nbar'
    assert split_message_into_chunks(message) == ['foo\n\n' + p1, p2 + '\n\nbar']


def test_split_lines():
    p1 = 'a' * 4000
    p2 = 'b' * 4000
    p3 = 'c' * 4000
    message = p1 + '\n' + p2 + '\n' + p3
    assert split_message_into_chunks(message) == [p1, p2, p3]


def test_split_characters():
    p1 = 'a' * 4000
    p2 = 'b' * 4000
    p3 = 'c' * 4000
    p4 = 'd' * 4000
    message = p1 + p2 + p3 + p4
    assert split_message_into_chunks(message) == [
        'a' * 4000 + 'b' * 96,
        'b' * (4000 - 96) + 'c' * 96 * 2,
        'c' * (4000 - 96 * 2) + 'd' * 96 * 3,
        'd' * (4000 - 96 * 3),
    ]
