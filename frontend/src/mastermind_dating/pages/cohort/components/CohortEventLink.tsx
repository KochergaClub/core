import React, { useState, useCallback, useContext } from 'react';
import Async from 'react-select/async';

import { format } from 'date-fns';

import { A, Label, Row } from '@kocherga/frontkit';
import { useAPI } from '~/common/hooks';

import ConfirmModal from '~/components/ConfirmModal';
import AsyncButton from '~/components/AsyncButton';
import { ServerEvent } from '~/events/types';
import { searchEvents } from '~/events/api';

import { Cohort } from '../../../types';
import { MastermindContext } from '../reducer';

interface Props {
  cohort: Cohort;
}

const CohortEventLink: React.FC<Props> = ({ cohort }) => {
  const api = useAPI();
  const dispatch = useContext(MastermindContext);

  const [confirming, setConfirming] = useState<ServerEvent | undefined>(
    undefined
  );

  const loadEvents = useCallback(
    async (inputValue: string, callback: (options: any[]) => void) => {
      try {
        const events = await searchEvents(api, { query: inputValue });

        callback(
          events.map(event => {
            const label = `${event.title} ${format(event.start, 'yyyy-MM-dd')}`;
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
    [api]
  );

  const pickEventForConfirming = useCallback((v: any) => {
    setConfirming(v.value);
  }, []);

  const cancelConfirming = useCallback(() => setConfirming(undefined), []);

  const setEvent = useCallback(async () => {
    if (!confirming) {
      return; // this shouldn't happen
    }
    const updatedCohort = await api.call(
      `mastermind_dating/cohort/${cohort.id}/set_event`,
      'POST',
      {
        event_id: confirming.id,
      }
    );
    dispatch({
      type: 'REPLACE_COHORT',
      payload: {
        cohort: updatedCohort,
      },
    });
  }, [api, dispatch, cohort.id, confirming]);

  const unsetEvent = useCallback(async () => {
    const updatedCohort = await api.call(
      `mastermind_dating/cohort/${cohort.id}/unset_event`,
      'POST'
    );
    dispatch({
      type: 'REPLACE_COHORT',
      payload: {
        cohort: updatedCohort,
      },
    });
  }, [dispatch, cohort.id]);

  if (cohort.event_id) {
    return (
      <Row>
        <div>
          Связанное событие:{' '}
          <A
            href={`https://evenman.team.kocherga.club/event/${cohort.event_id}`}
          >
            {cohort.event_title}
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
          act={setEvent}
        >
          Установить событие {confirming.title}
        </ConfirmModal>
      )}
    </div>
  );
};

export default CohortEventLink;
