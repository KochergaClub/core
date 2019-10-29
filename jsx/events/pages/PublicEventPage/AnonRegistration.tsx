import { useCallback, useState } from 'react';

import styled from 'styled-components';

import { FaCheck } from 'react-icons/fa';
import { A, Button, Input, Column, Label, Row } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { PublicEvent, EventTicket } from '~/events/types';

interface Props {
  event: PublicEvent;
  ticket?: EventTicket;
}

const CheckboxLabel = styled(Label)`
  cursor: pointer;
`;

const Success: React.FC<{ email: string, restart: () => void }> = ({ email, restart }) => {
  return (
  <Column gutter={16}>
    <Row vCentered gutter={16}>
      <FaCheck size={32} />
      <Column stretch>
        Регистрация завершена успешно!
        <br />
        Мы отправили вам письмо с подтверждением на ящик {email}.
      </Column>
    </Row>
    <A href="#" onClick={restart} style={{ textDecorationStyle: 'dashed' }}>
      <small>Ещё одна регистрация</small>
    </A>
  </Column>
  );
}

const AnonRegistrationForm: React.FC<Props> = ({ event }) => {
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

  const restart = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // TODO - reducer
    setActing(false);
    setEmail('');
    setComplete(false);
    setSubscribedToNewsletter(true);
    setAgreedToTerms(false);
  }, []);

  if (complete) {
    return (
      <Success email={email} restart={restart}>
    );
  }

  const canSubmit =
    !acting &&
    email.length > 0 &&
    agreedToTerms &&
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  return (
    <Column stretch>
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
        <CheckboxLabel htmlFor="subscribed_to_newsletter">
          Я хочу получать анонсы событий Кочерги по электронной почте
        </CheckboxLabel>
      </Row>
      <Row vCentered gutter={8}>
        <Input
          type="checkbox"
          name="agreed_to_terms"
          id="agreed_to_terms"
          checked={agreedToTerms}
          onChange={e => setAgreedToTerms(e.currentTarget.checked)}
        />
        <CheckboxLabel htmlFor="agreed_to_terms">
          Я даю согласие на обработку моих персональных данных (
          <A href="/terms">подробности</A>)
        </CheckboxLabel>
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

// TODO - formik
const AnonRegistration: React.FC<Props> = ({ event }) => {
  return (
    <Column stretch>
      <p>
        Участие по <A href="/pricing">обычным тарифам пространства Кочерги</A> —
        2,5 руб./минута, для владельцев абонементов — без доплаты.
      </p>
      <AnonRegistrationForm event={event} />
    </Column>
  );
};

export default AnonRegistration;
