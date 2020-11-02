import { useCallback, useState } from 'react';
import { FaCheck, FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';
import { A, Button, Column, Input, Label, Row } from '~/frontkit';

import { HintCard } from '~/components';
import { trackEvent } from '~/components/analytics';

import { MyEventsTicketRegisterAnonDocument } from '../queries.generated';
import { CommonProps as Props } from '../types';

const CheckboxLabel = styled(Label)`
  cursor: pointer;
`;

const Success: React.FC<{
  email: string;
}> = ({ email }) => {
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
    </Column>
  );
};

const CommunityNote: React.FC = () => {
  return null;

  // TODO:
  // return (
  //   <HintCard>
  //     Это событие сообщества Кочерги — сообщества рационалистов. (узнать больше)
  //   </HintCard>
  // );
};

const RegistrationNote: React.FC = () => {
  return (
    <HintCard>
      <p>Вот что случится после регистрации:</p>
      <p>
        <ol>
          <li>Мы пришлём вам письмо с подтверждением.</li>
          <li>
            Мы создадим для вас личный кабинет, в котором вы сможете видеть
            список всех ваших событий.
          </li>
          <li>
            Мы подпишем вас на рассылку с нашими анонсами и мероприятиями, если
            вы поставите галочку «хочу получать анонсы».
          </li>
        </ol>
      </p>
    </HintCard>
  );
};

// TODO - formik
const AnonRegistration: React.FC<Props> = ({ event }) => {
  const [acting, setActing] = useState(false);
  const [email, setEmail] = useState('');
  const [complete, setComplete] = useState(false);

  const [subscribedToNewsletter, setSubscribedToNewsletter] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [registerMutation] = useMutation(MyEventsTicketRegisterAnonDocument);

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
          event_id: event.id,
          subscribed_to_newsletter: subscribedToNewsletter,
        },
      },
    });
    setComplete(true);
    setActing(false);
  }, [registerMutation, event.title, event.id, email, subscribedToNewsletter]);

  if (complete) {
    return <Success email={email} />;
  }

  const canSubmit =
    !acting &&
    email.length > 0 &&
    agreedToTerms &&
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  return (
    <Column stretch gutter={16}>
      <CommunityNote />
      <Column stretch gutter={0}>
        <Label>E-mail</Label>
        <Input
          type="email"
          name="email"
          scale="big"
          style={{ width: '100%' }} // somehow this fixes mobile layout, I'm not sure why
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />
      </Column>
      <Column>
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
      </Column>
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
      <RegistrationNote />
    </Column>
  );
};

export default AnonRegistration;
