import { parseISO } from 'date-fns';
import styled from 'styled-components';

import ItemPageHeader from '~/blocks/ItemPageHeader';
import { formatDate } from '~/common/utils';
import { Page } from '~/components';
import { colors, RichText } from '~/frontkit';
import { NextWagtailPage } from '~/wagtail/types';

import {
    BlogPostAuthorFragment, BlogPostPageFragment, BlogPostPageFragmentDoc
} from '../fragments.generated';
import Author from './Author';

const AuthorsList = ({ authors }: { authors: BlogPostAuthorFragment[] }) => {
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
  authors: BlogPostAuthorFragment[];
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
  color: ${colors.grey[400]};
`;

const BlogPostPage: NextWagtailPage<BlogPostPageFragment> = ({ page }) => {
  return (
    <Page title={page.title} description={page.summary}>
      <ItemPageHeader
        title={page.title}
        sectionTitle="Блог Кочерги"
        sectionLink="/blog"
      >
        <HeaderDate>
          {formatDate(parseISO(page.date), 'd MMMM yyyy')}
        </HeaderDate>
      </ItemPageHeader>
      <TextWithAuthors text={page.body} authors={page.authors} />
    </Page>
  );
};

BlogPostPage.fragment = BlogPostPageFragmentDoc;

export default BlogPostPage;
