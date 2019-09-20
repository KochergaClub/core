import React from 'react';

import styled from 'styled-components';

import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import PageHeader from '~/blocks/PageHeader';

import { NextWagtailPage } from '~/wagtail/types';

import { AnyPageType } from '~/wagtail/pages/types';

import { BlogPostSummary } from './types';

import Summary from './Summary';

export interface PageType extends AnyPageType {
  meta_type: 'blog.BlogIndexPage';
  subtitle: string;
}

export interface ExtraProps {
  postSummaries: BlogPostSummary[];
}

const ListContainer = styled.div`
  max-width: 640px;
  margin: 40px auto 0;
  padding: 0 20px;
`;

const BlogIndexPage: NextWagtailPage<PageType, ExtraProps> = props => {
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

BlogIndexPage.getInitialProps = async ({
  store: { getState },
  wagtailPage,
}) => {
  const api = selectAPI(getState());

  const json = await api.callWagtail(
    `pages/?type=blog.BlogPostPage&fields=date,summary&child_of=${
      wagtailPage.id
    }&order=-date`
  );

  const summaries = json['items'] as BlogPostSummary[];

  const props: ExtraProps = {
    postSummaries: summaries,
  };
  return props;
};

export default BlogIndexPage;
