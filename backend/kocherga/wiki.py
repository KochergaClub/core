import mwclient

from django.conf import settings

WIKI_DOMAIN = settings.KOCHERGA_WIKI['domain']
WIKI_USER = settings.KOCHERGA_WIKI['bot']['username']
WIKI_SITE = None


def get_wiki():
    global WIKI_SITE
    if not WIKI_SITE:
        site = mwclient.Site(WIKI_DOMAIN, path="/")
        site.login(WIKI_USER, settings.KOCHERGA_WIKI_PASSWORD)
        WIKI_SITE = site
    return WIKI_SITE
