import { FaCheck } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

import { RatioConfirmOrderOutcome } from '~/apollo/types.generated';
import { PaddedBlock } from '~/components';
import { Card } from '~/components/cards';
import { A, colors, Column, Row } from '~/frontkit';

const BigOutcome: React.FC<{
  title: string;
  icon: React.ElementType;
  color?: string;
}> = ({ title, icon, color = 'black', children }) => {
  const Icon = icon;
  return (
    <PaddedBlock>
      <Column centered>
        <Card>
          <div className="p-0 sm:px-10">
            <Row gutter={16} vCentered>
              <Icon style={{ color }} size={32} />
              <h1 className="text-2xl sm:text-3xl leading-none">{title}</h1>
            </Row>
            <div>{children}</div>
          </div>
        </Card>
      </Column>
    </PaddedBlock>
  );
};

const AskUs: React.FC<{ capitalize?: boolean }> = ({ capitalize }) => (
  <span>
    {capitalize ? 'Н' : 'н'}апишите нам на{' '}
    <A href="mailto:workshop@kocherga-club.ru">workshop@kocherga-club.ru</A> и
    мы поможем разбираться, что произошло.
  </span>
);

interface Props {
  outcome: RatioConfirmOrderOutcome | 'graphql-error';
}

const ConfirmOutcome: React.FC<Props> = ({ outcome }) => {
  switch (outcome) {
    case RatioConfirmOrderOutcome.NotFound:
      return (
        <BigOutcome
          title="Заказ не найден"
          icon={MdError}
          color={colors.accent[500]}
        >
          <p>Как вы попали на эту страницу?</p>
          <p>
            Если вы оплачивали заказ, а не просто ввели адрес страницы вручную,{' '}
            <AskUs />
          </p>
        </BigOutcome>
      );
    case RatioConfirmOrderOutcome.NotPaid:
      return (
        <BigOutcome title="Заказ не оплачен" icon={MdError}>
          <p>Как вы попали на эту страницу?</p>
          <p>
            Если вы оплачивали заказ, <AskUs />
          </p>
        </BigOutcome>
      );
    case RatioConfirmOrderOutcome.Ok:
      return (
        <BigOutcome
          title="Заказ подтверждён"
          icon={FaCheck}
          color={colors.good[500]}
        >
          <p>
            Спасибо! Мы отправили вам на почту письмо с подтверждением и
            подробностями.
          </p>
        </BigOutcome>
      );
    case RatioConfirmOrderOutcome.AlreadyFulfilled:
      return (
        <BigOutcome
          title="Заказ уже исполнен"
          icon={FaCheck}
          color={colors.good[500]}
        >
          <p>
            Этот заказ уже был выполнен. Возможно, вы обновили страницу только
            что завершённого заказа? Письмо с подтверждениями давно или недавно
            ушло на почту, указанную в заказе.
          </p>
          <p>
            Если у вас есть какие-то вопросы, <AskUs />
          </p>
        </BigOutcome>
      );
    case RatioConfirmOrderOutcome.TicketAlreadyExists:
      return (
        <BigOutcome
          title="E-mail уже зарегистрирован"
          icon={MdError}
          color={colors.accent[500]}
        >
          <p>
            Упс. Вы оплатили заказ, но указанный e-mail уже был зарегистрирован
            на это мероприятие.
          </p>
          <p>
            Ваши деньги скоро вернутся к вам на счёт. Если у вас есть какие-то
            вопросы, <AskUs />
          </p>
        </BigOutcome>
      );
    case 'graphql-error':
    default:
      return (
        <BigOutcome
          title="Неизвестная ошибка"
          icon={MdError}
          color={colors.accent[500]}
        >
          <p>
            Ваши деньги скоро вернутся к вам на счёт. <AskUs capitalize />
          </p>
        </BigOutcome>
      );
  }
};

export default ConfirmOutcome;
