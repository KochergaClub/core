import { differenceInMinutes, formatRelative, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { CardList } from '~/components/Card';
import { colors, Column, Row } from '~/frontkit';

import OfdShiftCard from '../ofd/OfdShiftCard';
import { KkmDashboardDocument, KkmDashboardQuery } from './queries.generated';

const LastImport: React.FC<{ data: KkmDashboardQuery }> = ({
  data: { importer },
}) => {
  const date = importer.last_dt ? parseISO(importer.last_dt) : undefined;
  const now = new Date();
  const MAX_MINUTES_AGE = 30;
  const diffMinutes = date ? differenceInMinutes(now, date) : undefined;
  return (
    <Row vCentered gutter={16}>
      {diffMinutes && diffMinutes < MAX_MINUTES_AGE ? (
        <MdCheckCircle size={32} color={colors.grey[700]} />
      ) : (
        <MdError size={32} color={colors.accent[700]} />
      )}
      <div>
        Последний импорт из ОФД:
        <br />
        {date
          ? formatRelative(date, new Date(), {
              locale: ru,
              weekStartsOn: 1,
            })
          : 'никогда'}
      </div>
    </Row>
  );
};

const KkmDashboard: React.FC = () => {
  const queryResults = useQuery(KkmDashboardDocument);
  return (
    <PaddedBlock>
      <ApolloQueryResults {...queryResults}>
        {({ data }) => (
          <div>
            <LastImport data={data} />
            <h2>Открытые смены</h2>
            <Column stretch gutter={8}>
              <small>
                Данные о сменах импортируются из ОФД и могут быть не
                актуальными.
              </small>
              <CardList>
                {data.ofdShifts.nodes.map((shift) => (
                  <OfdShiftCard shift={shift} key={shift.id} />
                ))}
              </CardList>
            </Column>
          </div>
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default KkmDashboard;
