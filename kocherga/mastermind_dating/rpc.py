from multiprocessing.managers import BaseManager


def get_client():
    # manager = BaseManager(address=('tgbot', 44444), authkey=b'django_sec_key')
    manager = BaseManager(address=('', 44444), authkey=b'django_sec_key')
    manager.register('tinder_activate')
    manager.register('broadcast_solution')
    manager.connect()

    return manager
