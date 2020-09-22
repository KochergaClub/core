from kocherga.wagtail.models import KochergaPage


class PresentationIndexPage(KochergaPage):
    subpage_types = ['presentations.PresentationPage']
    max_count = 1

    graphql_type = 'RatioPresentationIndexPage'

    class Meta:
        verbose_name = 'Список рацио-презентаций'
        verbose_name_plural = 'Списки рацио-презентаций'
