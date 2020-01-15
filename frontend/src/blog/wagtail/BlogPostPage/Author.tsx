import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

import { BlogPostAuthorFragment } from '../fragments.generated';

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

const Author = ({ name, description, image }: BlogPostAuthorFragment) => {
  return (
    <AuthorContainer>
      <AuthorImage src={image.url} />
      <AuthorName>{name}</AuthorName>
      <AuthorDescription>{description}</AuthorDescription>
    </AuthorContainer>
  );
};

export default Author;
