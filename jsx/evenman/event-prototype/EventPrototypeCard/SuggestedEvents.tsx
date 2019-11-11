import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Button, Row } from '@kocherga/frontkit';

import { Header, MutedSpan } from '../../components/ui';

import EventPrototype from '../../stores/EventPrototype';

interface Props {
  prototype: EventPrototype;
}

const SuggestedEvents: React.FC<Props> = observer(({ prototype }) => {
  if (!prototype.active) {
    return null;
  }
  const m = prototype.suggested[0];
  return (
    <section>
      <Header>Будущие мероприятия</Header>
      <table>
        <tbody>
          <tr key={m.format('D MMMM')}>
            <td>
              {m.format('D MMMM')}{' '}
              <MutedSpan>
                {' ('}
                {m.fromNow()}
                {') '}
              </MutedSpan>
            </td>
            <td>
              <Row>
                <Button small primary onClick={() => prototype.newEvent(m)}>
                  Создать
                </Button>
                <Button small onClick={() => prototype.cancelDate(m)}>
                  Отменить
                </Button>
              </Row>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
});

export default SuggestedEvents;
