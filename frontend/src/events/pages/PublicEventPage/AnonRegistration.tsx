import { useCallback, useState } from 'react';

import styled from 'styled-components';

import { FaCheck, FaHeart } from 'react-icons/fa';
import { A, Button, Input, Column, Label, Row } from '@kocherga/frontkit';

import { trackEvent } from '~/components/analytics';
import { useMyEventsTicketRegisterAnonMutation } from './queries.generated';

import { CommonProps as Props } from './types';

const CheckboxLabel = styled(Label)`
  cursor: pointer;
`;

const Success: React.FC<{
  email: string;
  restart: (e: React.SyntheticEvent) => void;
}> = ({ email, restart }) => {
  return (
    <Column gutter={16}>
      <Row vCentered gutter={16}>
        <FaCheck size={32} />
        <Column stretch>
          <Row vCentered>
            <div>Регистрация завершена успешно!</div>
            <FaHeart style={{ color: 'red' }} />
          </Row>
          <div>Мы отправили вам письмо с подтверждением на ящик {email}.</div>
        </Column>
      </Row>
      <A href="#" onClick={restart} style={{ textDecorationStyle: 'dashed' }}>
        <small>Ещё одна регистрация</small>
      </A>
    </Column>
  );
};

// TODO - formik
const AnonRegistration: React.FC<Props> = ({ event }) => {
  const [acting, setActing] = useState(false);
  const [email, setEmail] = useState('');
  const [complete, setComplete] = useState(false);

  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [registerMutation] = useMyEventsTicketRegisterAnonMutation();

  const anonRegister = useCallback(async () => {
    trackEvent('register', {
      category: 'events',
      label: event.title,
    });

    setActing(true);
    await registerMutation({
      variables: {
        input: {
          email,
          event_id: event.event_id,
          subscribed_to_newsletter: subscribedToNewsletter,
        },
      },
    });
    setComplete(true);
    setActing(false);
  }, [
    registerMutation,
    event.title,
    event.event_id,
    email,
    subscribedToNewsletter,
  ]);

  const restart = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      trackEvent('register_restart', {
        category: 'events',
        label: event.title,
      });

      // TODO - reducer
      setActing(false);
      setEmail('');
      setComplete(false);
      setSubscribedToNewsletter(true);
      setAgreedToTerms(false);
    },
    [event.title]
  );

  if (complete) {
    return <Success email={email} restart={restart} />;
  }

  const canSubmit =
    !acting &&
    email.length > 0 &&
    agreedToTerms &&
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  return (
    <Column stretch gutter={16}>
      <Column stretch gutter={0}>
        <Label>E-mail</Label>
        <Input
          type="email"
          name="email"
          scale="big"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />
      </Column>
      <div>
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
      </div>
      <div>
        <Button
          kind="primary"
          size="big"
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
