import mwclient

import kocherga.config
import kocherga.secrets

WIKI_DOMAIN = kocherga.config.config()["wiki_domain"]
WIKI_SITE = None


def get_wiki():
    global WIKI_SITE
    if not WIKI_SITE:
        site = mwclient.Site(WIKI_DOMAIN, path="/")
        site.login("Людвиг", kocherga.secrets.plain_secret("wiki_password"))
        WIKI_SITE = site
    return WIKI_SITE
