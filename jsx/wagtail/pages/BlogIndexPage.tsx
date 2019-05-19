import React from 'react';

import Page from '~/components/Page';
import { API } from '~/common/api';

import { dynamicScreen } from '../types';

import { AnyPageType } from './types';

interface BlogPostSummary {
  title: string;
  slug: string;
}

export interface PageType extends AnyPageType {
  meta_type: 'blog.BlogIndexPage';
}

export interface Props {
  wagtailPage: PageType;
  postSummaries: BlogPostSummary[];
}

const Summary = (summary: BlogPostSummary) => (
  <li>
    <a href={`/blog/${summary.slug}`}>{summary.title}</a>
  </li>
);

const BlogIndexPage = (props: Props) => {
  return (
    <Page title="Блог Кочерги">
      <Page.Title>Блог Кочерги</Page.Title>
      <Page.Main>
        <ul>
          {props.postSummaries.map((summary, i) => (
            <Summary key={i} {...summary} />
          ))}
        </ul>
      </Page.Main>
    </Page>
  );
};

export default dynamicScreen(
  BlogIndexPage,
  async ({ api }: { api: API }, wagtailPage: PageType) => {
    const json = await api.callWagtail(
      `pages/?type=blog.BlogPostPage&fields=date&child_of=${
        wagtailPage.id
      }&order=-date`
    );

    const data = json['items'] as AnyPageType[];

    const summaries: BlogPostSummary[] = [];
    for (const page of data) {
      summaries.push({
        title: page.title,
        slug: page.meta.slug,
      });
    }

    const props: Props = {
      wagtailPage,
      postSummaries: summaries,
    };
    return props;
  }
);
