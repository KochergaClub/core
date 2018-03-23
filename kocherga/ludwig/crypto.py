import requests

from kocherga.ludwig.bot import bot

ETH_ADDRESS = '0x97b130467259ae2a7e67ecb9d39e2b366174e182'

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
    for device in devices:
        if device['id'] in workers_dict and workers_dict[device['id']]['hashrate'] > 0:
            # ok
            continue
        bot.send_message(
            text='Админ, майнинг на устройстве "{}" не работает. Почини, если нет к этому препятствий.'.format(device['name']),
            channel='#watchmen',
        )
