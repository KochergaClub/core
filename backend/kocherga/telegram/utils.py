from django.conf import settings

from .api import api_call

MAX_MESSAGE_SIZE = 4096


def get_channel_id():
    return settings.KOCHERGA_TELEGRAM["channel"]


def good_chunks(chunks):
    return not len([1 for chunk in chunks if len(chunk) > MAX_MESSAGE_SIZE])


def split_message_into_chunks_by_separator(message, separator):
    paragraphs = message.split(separator)
    if not good_chunks(paragraphs):
        return

    chunks = []
    for paragraph in paragraphs:
        if (
            chunks
            and len(chunks[-1]) + len(separator) + len(paragraph) <= MAX_MESSAGE_SIZE
        ):
            chunks[-1] += separator + paragraph
        else:
            chunks.append(paragraph)
    return chunks


def split_message_into_chunks(message):
    if len(message) <= MAX_MESSAGE_SIZE:
        return [message]

    # let's try to split into paragraphs first
    chunks = split_message_into_chunks_by_separator(message, '\n\n')
    if chunks:
        return chunks

    # couldn't split into paragraphs, let's try lines
    chunks = split_message_into_chunks_by_separator(message, '\n')
    if chunks:
        return chunks

    # ok, we'll just have to break the message in a fixed position
    return [
        message[i : i + MAX_MESSAGE_SIZE]
        for i in range(0, len(message), MAX_MESSAGE_SIZE)
    ]


def post_to_channel(message):
    chunks = split_message_into_chunks(message)
    result = []

    for chunk in chunks:
        response = api_call(
            'sendMessage',
            params={
                "chat_id": get_channel_id(),
                "text": message,
                "parse_mode": "html",
                "disable_web_page_preview": "true",
            },
        )
        result.append(response)

    return result


def channel_message_link_by_id(message_id: str):
    if not message_id:
        raise Exception("message_id must be non-empty")

    # TODO - technically we could just remove the first '@' character and avoid the HTTP request,
    # but this feels more proper at the moment for some reason.
    # (I'll probably regret this later.)
    response = api_call('getChat', {'chat_id': get_channel_id()})

    channel_username = response['result']['username']
    return f'https://t.me/{channel_username}/{message_id}'
