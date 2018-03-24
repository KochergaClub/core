import requests
from datetime import datetime

from kocherga.ludwig.bot import bot

ETH_ADDRESS = '0x97b130467259ae2a7e67ecb9d39e2b366174e182'
MAX_SHARE_DELAY = 3600

@bot.schedule('cron', hour='11,23')
def check_miners():
    r = requests.get('https://api.nanopool.org/v1/eth/workers/{}'.format(ETH_ADDRESS))
    r.raise_for_status()

    workers_data = r.json()['data']
    workers_dict = {w['id']: w for w in workers_data}

    devices = [
        {
            'id': 'vr',
            'name': 'VR-комп'
        },
        {
            'id': 'kch1',
            'name': 'Рига (большая коробка)',
        },
    ]
    current_ts = datetime.now().timestamp()

    for device in devices:
        if device['id'] in workers_dict and (
                workers_dict[device['id']]['hashrate'] > 0
                or current_ts - workers_dict[device['id']]['lastShare'] < MAX_SHARE_DELAY
        ):
            # ok
            continue
        bot.send_message(
            text=f'''Админ, майнинг на устройстве "{device['name']}" не работает. Почини, если нет к этому препятствий.\nПодробнее: <https://wiki.admin.kocherga.club/Майнинг>''',
            channel='#watchmen',
        )
