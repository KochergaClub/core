import React from 'react';

import styled from 'styled-components';

import Page from '~/components/Page';
import { API } from '~/common/api';

import PageHeader from '~/blocks/PageHeader';

import { dynamicScreen } from '../../types';

import { AnyPageType } from '../types';

import { BlogPostSummary } from './types';

import Summary from './Summary';

export interface PageType extends AnyPageType {
  meta_type: 'blog.BlogIndexPage';
  subtitle: string;
}

export interface Props {
  wagtailPage: PageType;
  postSummaries: BlogPostSummary[];
}

const ListContainer = styled.div`
  max-width: 640px;
  margin: 40px auto 0;
`;

const BlogIndexPage = (props: Props) => {
  return (
    <Page title={props.wagtailPage.title}>
      <PageHeader
        title={props.wagtailPage.title}
        bottom={props.wagtailPage.subtitle}
      />
      <Page.Main>
        <ListContainer>
          {props.postSummaries.map((summary, i) => (
            <Summary key={i} {...summary} />
          ))}
        </ListContainer>
      </Page.Main>
    </Page>
  );
};

export default dynamicScreen(
  BlogIndexPage,
  async ({ api }: { api: API }, wagtailPage: PageType) => {
    const json = await api.callWagtail(
      `pages/?type=blog.BlogPostPage&fields=date,summary&child_of=${
        wagtailPage.id
      }&order=-date`
    );

    const summaries = json['items'] as BlogPostSummary[];

    const props: Props = {
      wagtailPage,
      postSummaries: summaries,
    };
    return props;
  }
);
