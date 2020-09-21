import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, Page } from '~/components';

import ViewingTemplateScreen from '../components/ViewingTemplateScreen';
import { ImageTemplateBySlugDocument } from '../queries.generated';

interface Props {
  slug: string;
}

const ImageTemplaterDetailsPage: NextApolloPage<Props> = ({ slug }) => {
  const queryResults = useQuery(ImageTemplateBySlugDocument, {
    variables: {
      slug,
    },
  });

  return (
    <Page
      title={
        queryResults.data
          ? `${queryResults.data.template.name} | Шаблон картинки`
          : 'Загружается...'
      }
      menu="team"
    >
      <Page.Main>
        <ApolloQueryResults {...queryResults}>
          {({ data: { template } }) => (
            <ViewingTemplateScreen template={template} />
          )}
        </ApolloQueryResults>
      </Page.Main>
    </Page>
  );
};

ImageTemplaterDetailsPage.getInitialProps = async ({ query }) => {
  const slug = query.slug as string;
  return { slug };
};

export default withApollo(withStaff(ImageTemplaterDetailsPage));
