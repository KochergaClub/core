import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page, ApolloQueryResults, PaddedBlock } from '~/components';
import { useImportersQuery } from '../queries.generated';
import Card, { CardList } from '~/components/Card';

const ImportersPage: NextApolloPage = () => {
  const queryResults = useImportersQuery();

  return (
    <Page title="Управление импортерами" menu="team">
      <Page.Title>Управление импортерами</Page.Title>
      <ApolloQueryResults {...queryResults}>
        {({ data: { importers } }) => (
          <PaddedBlock>
            <CardList>
              {importers.map(importer => (
                <Card key={importer.name}>{importer.name}</Card>
              ))}
            </CardList>
          </PaddedBlock>
        )}
      </ApolloQueryResults>
    </Page>
  );
};

export default withApollo(withStaff(ImportersPage));
