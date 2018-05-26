import os
import mwclient
import random
import warnings

from kocherga.ludwig.bot import bot
import kocherga.config
import kocherga.secrets

WIKI_DOMAIN = kocherga.config.config()["wiki_domain"]
WIKI_SITE = None


def get_wiki_site():
    warnings.warn("moved to kocherga.wiki.get_wiki()", DeprecationWarning)
    global WIKI_SITE
    if not WIKI_SITE:
        site = mwclient.Site(WIKI_DOMAIN, path="/")
        site.login("Людвиг", kocherga.secrets.plain_secret("wiki_password"))
        WIKI_SITE = site
    return WIKI_SITE


def search_wiki(query):
    wiki_site = get_wiki_site()
    response = list(wiki_site.search(query))
    if not len(response):
        return  # nothing found

    return response[0]["title"]


def wiki_link(title):
    url_title = title.replace(" ", "_")
    return "https://{}/{}".format(WIKI_DOMAIN, url_title)


def explain(query, quiet=False, try_harder=False):
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

    if quiet:
        return None

    if try_harder:
        titles = [page["title"] for page in get_wiki_site().search(query, what="text")]
        if titles:
            return {
                "text": 'Я не нашёл статью на вики с заголовком "{}", но нашёл несколько упоминаний:'.format(
                    query
                ),
                "attachments": [{"title": wiki_link(title)} for title in titles],
            }

    return {"text": 'Ничего не знаю про "{}".'.format(query)}


@bot.listen_to(r"что\s+такое\s+(.*?)\?")
def react_what_is(message, query):
    message.reply(**explain(query))


@bot.command("/wiki")
def command_wiki(payload):
    query = payload["text"]

    result = explain(query, try_harder=True)
    return result


@bot.listen_to(r"расскажите\s+про\s+(.*?)[.?!]?$")
def react_somebody_explain(message, query):
    message.reply(**explain(query))


@bot.listen_to(r"людвиг,?\s+расскажи\s+про\s+(.*?)[.?!]?$")
def react_ludwig_explain(message, query):
    message.reply(**explain(query))


@bot.listen_to(r"расскажи\s+про\s+(.*?)[.?!]?$")
def react_explain(message, query):
    # This question might be addressed to someone else, so Ludwig tries to be quiet if he can't help.
    # TODO - special case for a private message.
    reply = explain(query, quiet=True)
    if not reply:
        return

    message.reply(**reply)
