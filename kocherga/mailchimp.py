import time
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

    if r.status_code >= 400:
        raise Exception(f"Error: {r.status_code} {r.reason}\n\n{r.text}")
    r.raise_for_status()

    return r.json()

def wait_for_batch(batch_id):
    url = MAILCHIMP_API + '/batches/' + batch_id

    while True:
        r = requests.get(
            url,
            {
                'fields': 'status,total_operations,finished_operations,errored_operations,response_body_url',
            },
            headers={
                'Authorization': 'apikey ' + MAILCHIMP_API_KEY,
            },
        )

        body = json.loads(r.text)
        print(body)
        if body['status'] == 'finished':
            break
        time.sleep(1)
