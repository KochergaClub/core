import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import Card, { CardList } from '~/components/Card';

import { OfdFiscalDrivesDocument } from './queries.generated';

interface Props {}

const OfdFiscalDriveCollection: React.FC<Props> = () => {
  const queryResults = useQuery(OfdFiscalDrivesDocument);
  return (
    <PaddedBlock>
      <h2>Фискальные накопители</h2>
      <ApolloQueryResults {...queryResults}>
        {({ data }) => (
          <CardList>
            {data.ofdFiscalDrives.map((fd) => (
              <Card key={fd.id}>{fd.fiscal_drive_number}</Card>
            ))}
          </CardList>
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default OfdFiscalDriveCollection;
