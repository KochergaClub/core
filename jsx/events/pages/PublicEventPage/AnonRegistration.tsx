import { useCallback, useState } from 'react';

import styled from 'styled-components';

import { FaCheck, FaHeart } from 'react-icons/fa';
import {
  A,
  Button,
  Input,
  Column,
  Label,
  Row,
  colors,
} from '@kocherga/frontkit';

import { trackEvent } from '~/components/analytics';
import { useAPI } from '~/common/hooks';

import { PublicEvent, EventTicket } from '~/events/types';

interface Props {
  event: PublicEvent;
  ticket?: EventTicket;
}

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

const AnonRegistrationForm: React.FC<Props> = ({ event }) => {
  const [acting, setActing] = useState(false);
  const [email, setEmail] = useState('');
  const [complete, setComplete] = useState(false);

  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const api = useAPI();

  const anonRegister = useCallback(async () => {
    trackEvent('event_register', {
      label: event.title,
    });

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

    trackEvent('event_register_restart', {
      label: event.title,
    });

    // TODO - reducer
    setActing(false);
    setEmail('');
    setComplete(false);
    setSubscribedToNewsletter(true);
    setAgreedToTerms(false);
  }, []);

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

const TariffsContainer = styled.div`
  border: 1px solid ${colors.grey[300]};
  background-color: ${colors.grey[100]};
  padding: 20px;
  margin-bottom: 32px;
`;

const Tariffs: React.FC = () => (
  <TariffsContainer>
    Участие по <A href="/pricing">обычным тарифам пространства Кочерги</A> — 2,5
    руб./минута, для владельцев абонементов — без доплаты. Оплата по факту
    участия.
  </TariffsContainer>
);

// TODO - formik
const AnonRegistration: React.FC<Props> = ({ event }) => {
  return (
    <Column stretch>
      <Tariffs />
      <AnonRegistrationForm event={event} />
    </Column>
  );
};

export default AnonRegistration;
