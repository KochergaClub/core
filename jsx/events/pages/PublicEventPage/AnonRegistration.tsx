import { useCallback, useState } from 'react';

import { A, Button, Input, Column, Label, Row } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { PublicEvent, EventTicket } from '~/events/types';

interface Props {
  event: PublicEvent;
  ticket?: EventTicket;
}

// TODO - formik
const AnonRegistration: React.FC<Props> = ({ event }) => {
  const [acting, setActing] = useState(false);
  const [email, setEmail] = useState('');
  const [complete, setComplete] = useState(false);

  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const api = useAPI();

  const anonRegister = useCallback(async () => {
    setActing(true);
    await api.call(`events/${event.event_id}/anon_ticket/register`, 'POST', {
      email,
      subscribed_to_newsletter: subscribedToNewsletter,
    });
    setComplete(true);
    setActing(false);
  }, [api, event.event_id, email, subscribedToNewsletter]);

  if (complete) {
    return (
      <Column stretch>
        Регистрация завершена успешно!
        <br />
        Мы отправили вам письмо с подтверждением на ящик {email}.
      </Column>
    );
  }

  const canSubmit = !acting && email.length > 0 && agreedToTerms;

  return (
    <Column stretch>
      <p>
        Участие по <A href="/pricing">обычным тарифам пространства Кочерги</A> —
        2,5 руб./минута, для владельцев абонементов — без доплаты.
      </p>
      <Column stretch gutter={0}>
        <Label>E-mail</Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />
      </Column>
      <Row vCentered gutter={8}>
        <Input
          type="checkbox"
          id="subscribed_to_newsletter"
          name="subscribed_to_newsletter"
          checked={subscribedToNewsletter}
          onChange={e => setSubscribedToNewsletter(e.currentTarget.checked)}
        />
        <Label htmlFor="subscribed_to_newsletter">
          Я хочу получать анонсы событий Кочерги по электронной почте
        </Label>
      </Row>
      <Row vCentered gutter={8}>
        <Input
          type="checkbox"
          name="agreed_to_terms"
          id="agreed_to_terms"
          checked={agreedToTerms}
          onChange={e => setAgreedToTerms(e.currentTarget.checked)}
        />
        <Label htmlFor="agreed_to_terms">
          Я подтверждаю свое согласие с условиями Пользовательского соглашения
        </Label>
      </Row>
      <div>
        <Button
          kind="primary"
          loading={acting}
          disabled={!canSubmit}
          onClick={anonRegister}
        >
          Зарегистрироваться
        </Button>
      </div>
    </Column>
  );
};

export default AnonRegistration;
