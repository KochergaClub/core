import { getUnixTime, parseISO } from 'date-fns';

import { useMutation } from '@apollo/client';

import { formatDate } from '~/common/utils';
import { AsyncButton, Row } from '~/frontkit';

import { Header } from '../../components/ui';
import {
    EvenmanPrototypeCancelDateDocument, EvenmanPrototypeNewEventDocument, EventsPrototypeFragment
} from '../queries.generated';

interface Props {
  prototype: EventsPrototypeFragment;
}

const SuggestedEvents: React.FC<Props> = ({ prototype }) => {
  const [cancelDate] = useMutation(EvenmanPrototypeCancelDateDocument, {
    refetchQueries: ['EvenmanPrototype'],
  });
  const [newEvent] = useMutation(EvenmanPrototypeNewEventDocument, {
    refetchQueries: ['EvenmanPrototype'],
  });

  if (!prototype.active) {
    return null;
  }

  const d = parseISO(prototype.suggested_dates[0]);
  return (
    <section>
      <Header>Будущие мероприятия</Header>
      <table>
        <tbody>
          <tr>
            <td>
              {formatDate(d, 'd MMMM')}{' '}
              {/*
              <MutedSpan>
                {' ('}
                {m.fromNow()}
                {') '}
              </MutedSpan>
      */}
            </td>
            <td>
              <Row>
                <AsyncButton
                  size="small"
                  kind="primary"
                  act={() =>
                    newEvent({
                      variables: {
                        id: prototype.id,
                        ts: getUnixTime(d),
                      },
                    })
                  }
                >
                  Создать
                </AsyncButton>
                <AsyncButton
                  size="small"
                  act={() =>
                    cancelDate({
                      variables: {
                        id: prototype.id,
                        date: formatDate(d, 'yyyy-MM-dd'),
                      },
                    })
                  }
                >
                  Отменить
                </AsyncButton>
              </Row>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default SuggestedEvents;
