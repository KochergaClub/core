import logging
logger = logging.getLogger(__name__)

import subprocess
import tempfile
from pathlib import Path


def get_utmify(campaign, source):
    def utmify(value):
        if 'vk.com' in value or 'facebook.com' in value:
            # utmifying social links is not necessary
            return value

        value += '&' if '?' in value else '?'
        return value + f'utm_campaign={campaign}&utm_medium=email&utm_source={source}'

    return utmify


def mjml2html(mjml):
    fp = tempfile.TemporaryFile(mode='w+')
    fp.write(mjml)
    fp.seek(0)

    root_dir = Path(__file__).parent.parent.parent
    mjml_bin = str(root_dir / 'node_modules' / '.bin' / 'mjml')
    with subprocess.Popen(
            [mjml_bin, '/dev/stdin'],
            stdin=fp,
            stdout=subprocess.PIPE,
            encoding='utf-8',
    ) as proc:
        html = proc.stdout.read()

    return html
