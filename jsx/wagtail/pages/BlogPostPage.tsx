import React from 'react';
import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

import Page from '~/components/Page';
import ItemPageHeader from '~/blocks/ItemPageHeader';
import { formatDate } from '~/common/utils';

import { BlogPostPageType as Props, BlogPostAuthorType } from './types';

const AuthorContainer = styled.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  max-width: 128px;
  align-items: center;
`;

const AuthorImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const AuthorName = styled.div`
  margin-top: 8px;

  text-align: center;

  font-weight: 500;
`;

const AuthorDescription = styled.div`
  margin-top: 4px;

  text-align: center;

  color: ${colors.grey[700]};
  font-size: 12px;
  line-height: 1.35;
`;

const Author = ({ name, description, image }: BlogPostAuthorType) => {
  return (
    <AuthorContainer>
      <AuthorImage src={image.meta.download_url} />
      <AuthorName>{name}</AuthorName>
      <AuthorDescription>{description}</AuthorDescription>
    </AuthorContainer>
  );
};

const AuthorsList = ({ authors }: { authors: BlogPostAuthorType[] }) => {
  return (
    <div>{authors.map((author, i) => <Author key={i} {...author} />)}</div>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const TextContainer = styled.div`
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
      <TextContainer dangerouslySetInnerHTML={{ __html: text }} />
      <AuthorsList authors={authors} />
    </Container>
  );
};

const HeaderDate = styled.div`
  color: ${colors.grey[500]};
`;

export default function BlogPostPage(props: Props) {
  return (
    <Page title={props.title}>
      <ItemPageHeader
        title={props.title}
        sectionTitle="Блог Кочерги"
        sectionLink="/blog"
      >
        <HeaderDate>
          {formatDate(new Date(props.date), 'd MMMM yyyy')}
        </HeaderDate>
      </ItemPageHeader>
      <TextWithAuthors text={props.body} authors={props.authors} />
    </Page>
  );
}
