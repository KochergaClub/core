import { parseISO } from 'date-fns';
import React from 'react';

import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { ApolloQueryResults, HumanizedDateTime, PaddedBlock, Page } from '~/components';
import Card, { CardList } from '~/components/Card';
import { Row } from '~/frontkit';

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
              {importers.map((importer) => (
                <Card key={importer.name}>
                  <Row spaced>
                    <div>{importer.name}</div>
                    {importer.last_dt ? (
                      <HumanizedDateTime date={parseISO(importer.last_dt)} />
                    ) : (
                      <div>Нет запусков</div>
                    )}
                  </Row>
                </Card>
              ))}
            </CardList>
          </PaddedBlock>
        )}
      </ApolloQueryResults>
    </Page>
  );
};

export default withApollo(withStaff(ImportersPage));
