import { differenceInMinutes, formatRelative, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import { MdCheckCircle, MdError } from 'react-icons/md';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, MutationButton, PaddedBlock } from '~/components';
import { colors, Column, Row } from '~/frontkit';

import { CloseKkmShiftDocument, KkmDashboardDocument } from './queries.generated';

const parseMaybeDate = (dateStr: string | null | undefined): Date | undefined =>
  dateStr ? parseISO(dateStr) : undefined;

type DateReportProps = {
  date: Date | undefined;
  label: string;
  maxMinutesAge: number;
};

const DateReport: React.FC<DateReportProps> = ({
  date,
  label,
  maxMinutesAge,
}) => {
  const now = new Date();
  const diffMinutes = date ? differenceInMinutes(now, date) : undefined;
  return (
    <Row vCentered gutter={16}>
      {diffMinutes && diffMinutes < maxMinutesAge ? (
        <MdCheckCircle size={32} color={colors.grey[700]} />
      ) : (
        <MdError size={32} color={colors.accent[700]} />
      )}
      <div>
        <small>{label}</small>
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

const CloseShiftButton: React.FC = () => {
  return (
    <MutationButton
      mutation={CloseKkmShiftDocument}
      variables={{}}
      confirmText="Вы точно хотите закрыть смену вручную?"
      refetchQueries={['KkmDashboard']}
      kind="primary"
    >
      Закрыть смену
    </MutationButton>
  );
};

const KkmDashboard: React.FC = () => {
  const queryResults = useQuery(KkmDashboardDocument);
  return (
    <PaddedBlock>
      <ApolloQueryResults {...queryResults}>
        {({ data }) => (
          <Column stretch gutter={16}>
            <DateReport
              date={parseMaybeDate(data.importer.last_dt)}
              label="Последний импорт из ОФД:"
              maxMinutesAge={30}
            />
            <DateReport
              date={parseMaybeDate(data.kkmStatus.last_shift_closed)}
              label="Время закрытия последней смены:"
              maxMinutesAge={60 * 23}
            />
            <small>
              Время закрытия последней смены хранится в БД. Если смена была
              закрыта прямым взаимодействием с кассой, время обновлено не будет.
            </small>
            <CloseShiftButton />
          </Column>
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default KkmDashboard;
