import requests

from django.conf import settings

MAX_MESSAGE_SIZE = 4096


def get_token():
    return settings.KOCHERGA_TELEGRAM_TOKEN


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
    token = get_token()

    chunks = split_message_into_chunks(message)
    result = []

    proxies = None
    if settings.TELEGRAM_PROXY:
        proxies = {
            'http': settings.TELEGRAM_PROXY,
            'https': settings.TELEGRAM_PROXY,
        }

    for chunk in chunks:
        r = requests.get(
            f"https://api.telegram.org/bot{token}/sendMessage",
            params={
                "chat_id": get_channel_id(),
                "text": message,
                "parse_mode": "html",
                "disable_web_page_preview": "true",
            },
            proxies=proxies,
        )
        r.raise_for_status()
        result.append(r.json())

    return result


def channel_message_link_by_id(message_id: str):
    if not message_id:
        raise Exception("message_id must be non-empty")

    token = get_token()

    # TODO - technically we could just remove the first '@' character and avoid the HTTP request,
    # but this feels more proper at the moment for some reason.
    # (I'll probably regret this later.)
    r = requests.get(
        f"https://api.telegram.org/bot{token}/getChat",
        params={'chat_id': get_channel_id(),},
    )
    r.raise_for_status()

    print(r.json())
    channel_username = r.json()['result']['username']
    return f'https://teleg.run/{channel_username}/{message_id}'
