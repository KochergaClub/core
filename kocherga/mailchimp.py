import json
import requests

import kocherga.secrets

MAILCHIMP_API = "https://us11.api.mailchimp.com/3.0"
MAILCHIMP_API_KEY = kocherga.secrets.plain_secret("mailchimp_api_key")


def api_call(method, url, data={}):
    if method == "GET":
        r = requests.get(
            f"{MAILCHIMP_API}/{url}",
            headers={"Authorization": f"apikey {MAILCHIMP_API_KEY}"},
        )
    elif method == "POST":
        r = requests.post(
            f"{MAILCHIMP_API}/{url}",
            headers={
                "Authorization": f"apikey {MAILCHIMP_API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps(data),
        )
    elif method == "PUT":
        # copy-pasted!
        r = requests.put(
            f"{MAILCHIMP_API}/{url}",
            headers={
                "Authorization": f"apikey {MAILCHIMP_API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps(data),
        )
    else:
        raise Exception(f"Unknown method {method}")

    r.raise_for_status()
    return r.json()
