#!/usr/bin/env python
import sys, pathlib, os.path
sys.path.append(
    os.path.abspath(
        str(pathlib.Path(__file__).parent.parent)
    )
)

import django
django.setup()

import json
from wagtail.core.models import Site, Page

from kocherga.pages.models import FrontPage, FolderPage
from kocherga.faq.models import FAQPage
from kocherga.projects.models import ProjectIndexPage
from kocherga.blog.models import BlogIndexPage
from kocherga.ratio.models import NotebookIndexPage, SectionIndexPage, PresentationIndexPage


def main():
    # based on code from https://gist.github.com/veuncent/9dab311125401c1886eb7c6998f5f387
    site = Site.objects.first()

    initial_home_page = site.root_page
    if initial_home_page.title != "Welcome to your new Wagtail site!":
        raise Exception("Root page doesn't look like default wagtail page")

    initial_home_page.slug = "home_old"
    initial_home_page.save()

    home_page = FrontPage(
        title="Заглавная страница",
        slug="home",
        body=json.dumps([
            {
                'type': 'basic_lead',
                'value': 'Заполните эту страницу в админке',
            }
        ]),
    )
    Page.get_first_root_node().add_child(instance=home_page)

    home_page.add_child(
        instance=FAQPage(
            slug="faq",
            title="FAQ Кочерги",
            summary="Все вопросы и ответы о центре рациональности Кочерга.",
        )
    )

    home_page.add_child(
        instance=ProjectIndexPage(
            slug="projects",
            title="Проекты Кочерги",
        )
    )

    home_page.add_child(
        instance=BlogIndexPage(
            slug="blog",
            title="Блог Кочерги",
            subtitle="Тексты о рациональности и сообществе",
        )
    )

    team_page = FolderPage(
        slug="team",
        title="Интранет",
    )
    home_page.add_child(instance=team_page)

    team_ratio_page = FolderPage(
        slug="ratio",
        title="Рацио",
    )
    team_page.add_child(instance=team_ratio_page)

    team_ratio_page.add_child(
        instance=NotebookIndexPage(
            slug="workbooks",
            title="Рабочие тетради",
        )
    )
    team_ratio_page.add_child(
        instance=SectionIndexPage(
            slug="sections",
            title="Рацио-секции",
        )
    )
    team_ratio_page.add_child(
        instance=PresentationIndexPage(
            slug="slides",
            title="Рацио-слайды",
        )
    )

    site.root_page = home_page
    site.save()
    initial_home_page.delete()


if __name__ == '__main__':
    main()
