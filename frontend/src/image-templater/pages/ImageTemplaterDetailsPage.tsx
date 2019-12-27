import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';
import { NextApolloPage } from '~/apollo/types';

import { ApolloQueryResults, Page } from '~/components';

import { useImageTemplateBySlugQuery } from '../queries.generated';

import ViewingTemplateScreen from '../components/ViewingTemplateScreen';

interface Props {
  slug: string;
}

const ImageTemplaterDetailsPage: NextApolloPage<Props> = ({ slug }) => {
  const queryResults = useImageTemplateBySlugQuery({
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
      team
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
