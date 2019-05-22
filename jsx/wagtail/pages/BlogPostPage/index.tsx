import React from 'react';
import styled from 'styled-components';

import { RichText, colors } from '@kocherga/frontkit';

import Page from '~/components/Page';
import ItemPageHeader from '~/blocks/ItemPageHeader';
import { formatDate } from '~/common/utils';

import { NextWagtailPage } from '../../types';

import { AnyPageType, BlogPostAuthorType } from '../types';

import Author from './Author';

export interface PageType extends AnyPageType {
  meta_type: 'blog.BlogPostPage';
  body: string;
  authors: BlogPostAuthorType[];
  date: string;
}

const AuthorsList = ({ authors }: { authors: BlogPostAuthorType[] }) => {
  return (
    <div>
      {authors.map((author, i) => (
        <Author key={i} {...author} />
      ))}
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const TextContainer = styled(RichText)`
  max-width: 660px;
  padding: 0 20px;
  margin-bottom: 40px;
`;

const TextWithAuthors = ({
  text,
  authors,
}: {
  text: string;
  authors: BlogPostAuthorType[];
}) => {
  return (
    <Container>
      <main>
        <TextContainer dangerouslySetInnerHTML={{ __html: text }} />
      </main>
      <AuthorsList authors={authors} />
    </Container>
  );
};

const HeaderDate = styled.div`
  color: ${colors.grey[500]};
`;

const BlogPostPage: NextWagtailPage<PageType> = ({ wagtailPage }) => {
  return (
    <Page title={wagtailPage.title}>
      <ItemPageHeader
        title={wagtailPage.title}
        sectionTitle="Блог Кочерги"
        sectionLink="/blog"
      >
        <HeaderDate>
          {formatDate(new Date(wagtailPage.date), 'd MMMM yyyy')}
        </HeaderDate>
      </ItemPageHeader>
      <TextWithAuthors text={wagtailPage.body} authors={wagtailPage.authors} />
    </Page>
  );
};

export default BlogPostPage;
