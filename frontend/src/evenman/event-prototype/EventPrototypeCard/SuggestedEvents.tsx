import { parseISO, getUnixTime } from 'date-fns';

import { Row } from '@kocherga/frontkit';

import { formatDate } from '~/common/utils';
import { AsyncButton } from '~/components';

import { Header } from '../../components/ui';

import {
  useEvenmanPrototypeCancelDateMutation,
  useEvenmanPrototypeNewEventMutation,
  EventsPrototypeFragment,
} from '../queries.generated';

interface Props {
  prototype: EventsPrototypeFragment;
}

const SuggestedEvents: React.FC<Props> = ({ prototype }) => {
  const [cancelDate] = useEvenmanPrototypeCancelDateMutation({
    refetchQueries: ['EvenmanPrototype'],
  });
  const [newEvent] = useEvenmanPrototypeNewEventMutation({
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
                  small
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
                  small
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
