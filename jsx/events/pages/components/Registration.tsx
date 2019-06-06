import React, { useCallback, useState, useContext } from 'react';

import { A, Button } from '@kocherga/frontkit';

import GlobalContext from '../../../components/GlobalContext';
import { useAPI } from '../../../common/hooks';

import { Props } from '../event';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <section>
    <h2>Регистрация</h2>
    {children}
  </section>
);

export default function Registration({ ticket, event }: Props) {
  const { user } = useContext(GlobalContext);
  if (!user.is_authenticated) {
    // TODO - set `next` (we'll need to store location/path in global context for this, since we can't use window.location on server)
    return (
      <Wrapper>
        <em>
          Чтобы зарегистрироваться на мероприятие, сначала{' '}
          <A href={`/login`}>войдите на сайт</A>.
        </em>
      </Wrapper>
    );
  }

  const [acting, setActing] = useState(false);

  const api = useAPI();

  const unregister = useCallback(async () => {
    setActing(true);
    await api.call(
      `events/${event.event_id}/tickets/my`,
      'DELETE',
      {},
      false // don't expect JSON
    );
    window.location.reload();
  }, [event.event_id]);

  const register = useCallback(async () => {
    setActing(true);
    await api.call(`events/${event.event_id}/tickets/my`, 'POST');
    window.location.reload();
  }, [event.event_id]);

  return (
    <Wrapper>
      {ticket ? (
        <div>
          <div>Вы зарегистрированы.</div>
          <div>
            <A href="/my/">Посмотреть в личном кабинете</A>
          </div>
          <Button loading={acting} disabled={acting} onClick={unregister}>
            Отменить регистрацию
          </Button>
        </div>
      ) : (
        <Button
          kind="primary"
          loading={acting}
          disabled={acting}
          onClick={register}
        >
          Зарегистрироваться
        </Button>
      )}
    </Wrapper>
  );
}
