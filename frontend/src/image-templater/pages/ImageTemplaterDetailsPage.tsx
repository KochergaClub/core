import { withApollo, withStaff, NextApolloPage } from '~/apollo';

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
