import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.slack,
]

from channels.testing import ApplicationCommunicator
from reversion.models import Version

from kocherga.events.consumers import NotifySlackConsumer


@pytest.mark.asyncio
@pytest.mark.skip(reason="Need to figure out how to mock slack and avoid 'never awaited' error")
async def test_notify_by_version(event):
    communicator = ApplicationCommunicator(NotifySlackConsumer, {'type': 'test'})

    event.title = 'abc'
    event.save()

    versions = Version.objects.get_for_object(event)
    version_id = versions[0].pk

    await communicator.send_input({
        'type': 'notify_by_version',
        'version_id': version_id,
    })

    await communicator.wait(timeout=1)
