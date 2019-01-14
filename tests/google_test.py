import kocherga.google

class TestGoogle:
    def test_credentials(self):
        assert kocherga.google.credentials('calendar')

