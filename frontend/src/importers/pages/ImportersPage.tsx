import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';
import Card, { CardList } from '~/components/Card';

import { ImportersDocument } from '../queries.generated';

const ImportersPage: NextApolloPage = () => {
  const queryResults = useQuery(ImportersDocument);

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
