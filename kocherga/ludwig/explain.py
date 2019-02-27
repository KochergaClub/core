import random

from kocherga.ludwig.bot import bot
from kocherga.wiki import get_wiki, WIKI_DOMAIN


def search_wiki(query):
    wiki_site = get_wiki()
    response = list(wiki_site.search(query))
    if not len(response):
        return  # nothing found

    return response[0]["title"]


def wiki_link(title):
    url_title = title.replace(" ", "_")
    return "https://{}/{}".format(WIKI_DOMAIN, url_title)


def explain(query, quiet=False, try_harder=True):
    if query.lower() == "лфт":
        return {"text": "Это такая зелёная книга в ГЭБ. Я её написал!"}

    title = search_wiki(query)
    if title:
        prefixes = [
            "Нашёл",
            "Вот статья на вики",
            "Вот тут что-то есть",
            "Статья на вики",
            "На вики есть статья",
        ]
        prefix = prefixes[random.randint(0, len(prefixes) - 1)]
        return {"text": "{}: {}".format(prefix, wiki_link(title))}

    if try_harder:
        titles = [page["title"] for page in get_wiki().search(query, what="text")]
        if titles:
            return {
                "text": 'Я не нашёл статью на вики с заголовком "{}", но нашёл несколько упоминаний:'.format(
                    query
                ),
                "attachments": [{"title": wiki_link(title)} for title in titles],
            }

    if quiet:
        return None

    return {"text": 'Ничего не знаю про "{}".'.format(query)}


@bot.command("/wiki")
def command_wiki(payload):
    query = payload["text"]

    result = explain(query)
    return result


@bot.listen_to(r"(?:расскажите\s+про|что\s+такое)\s+(.*?)[.?!]?$")
def react_somebody_explain(message, query):
    reply = explain(query, quiet=True)
    if not reply:
        return

    message.reply(**reply)


@bot.respond_to(r"(?:расскажи\s+про|что\s+такое)\s+(.*?)[.?!]?$")
def react_ludwig_explain(message, query):
    message.reply(**explain(query))


@bot.listen_to(r"расскажи\s+про\s+(.*?)[.?!]?$")
def react_explain(message, query):
    # This question might be addressed to someone else, so Ludwig doesn't try so hard to help.
    reply = explain(query, quiet=True, try_harder=False)
    if not reply:
        return

    message.reply(**reply)
