import { useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import Async from 'react-select/async';
import { ValueType } from 'react-select';

import { format, parseISO } from 'date-fns';

import { A, Label, Row } from '@kocherga/frontkit';

import { AsyncButton, ConfirmModal } from '~/components';

import {
  MastermindDatingCohortDetailsFragment as Cohort,
  useMastermindDatingUnsetEventForCohortMutation,
  useMastermindDatingSetEventForCohortMutation,
  MastermindDatingSearchEventsQuery,
  MastermindDatingSearchEventsQueryVariables,
  MastermindDatingSearchEventsDocument,
  MastermindDatingEventFragment as Event,
} from '../queries.generated';

interface Props {
  cohort: Cohort;
}

interface OptionType {
  value: Event;
  label: string;
}

const CohortEventLink: React.FC<Props> = ({ cohort }) => {
  const [confirming, setConfirming] = useState<Event | undefined>(undefined);

  const apolloClient = useApolloClient();

  const [unsetEvent] = useMastermindDatingUnsetEventForCohortMutation({
    refetchQueries: ['MastermindDatingCohorts'],
    awaitRefetchQueries: true,
    variables: {
      cohort_id: cohort.id,
    },
  });

  const [setEvent] = useMastermindDatingSetEventForCohortMutation({
    refetchQueries: ['MastermindDatingCohorts'],
    awaitRefetchQueries: true,
  });

  const loadEvents = useCallback(
    async (inputValue: string, callback: (options: OptionType[]) => void) => {
      try {
        const { data } = await apolloClient.query<
          MastermindDatingSearchEventsQuery,
          MastermindDatingSearchEventsQueryVariables
        >({
          query: MastermindDatingSearchEventsDocument,
          variables: { search: inputValue },
        });
        if (!data?.events) {
          return []; // TODO - proper error handling
        }

        callback(
          data.events.nodes.map(event => {
            const label = `${event.title} ${format(
              parseISO(event.start),
              'yyyy-MM-dd'
            )}`;
            return {
              value: event,
              label,
            };
          })
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    [apolloClient]
  );

  const pickEventForConfirming = useCallback((v: ValueType<OptionType>) => {
    if (!v) {
      return;
    }
    if (v instanceof Array) {
      return;
    }
    setConfirming((v as OptionType).value);
  }, []);

  const cancelConfirming = useCallback(() => setConfirming(undefined), []);

  const setEventCb = useCallback(async () => {
    if (!confirming) {
      return; // this shouldn't happen
    }

    setEvent({
      variables: {
        cohort_id: cohort.id,
        event_id: confirming.event_id,
      },
    });
  }, [cohort.id, setEvent, confirming]);

  if (cohort.event) {
    return (
      <Row>
        <div>
          Связанное событие:{' '}
          <A href={`/team/events/view/${cohort.event.event_id}`}>
            {cohort.event.title}
          </A>
        </div>
        <AsyncButton act={unsetEvent} small>
          Отвязать
        </AsyncButton>
      </Row>
    );
  }

  return (
    <div>
      <Label>Связать с событием:</Label>
      <Async loadOptions={loadEvents} onChange={pickEventForConfirming} />
      {confirming && (
        <ConfirmModal
          yes="Выбрать событие"
          close={cancelConfirming}
          act={setEventCb}
        >
          Установить событие {confirming.title}
        </ConfirmModal>
      )}
    </div>
  );
};

export default CohortEventLink;
