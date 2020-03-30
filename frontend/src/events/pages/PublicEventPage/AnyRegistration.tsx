import styled from 'styled-components';

import { A, Column, colors } from '@kocherga/frontkit';

import Registration from './Registration';
import TimepadRegistration from './TimepadRegistration';

import { CommonProps } from './types';

const TariffsContainer = styled.div`
  border: 1px solid ${colors.grey[300]};
  background-color: ${colors.grey[100]};
  padding: 20px;
  margin-bottom: 32px;
`;

const Tariffs: React.FC<CommonProps> = ({ event }) => {
  if (event.pricing_type === 'anticafe') {
    return (
      <TariffsContainer>
        Участие по{' '}
        <A href="/pricing" target="_blank">
          обычным тарифам пространства Кочерги
        </A>{' '}
        — 2,5 руб./минута, для владельцев абонементов — без доплаты. Оплата по
        факту участия.
      </TariffsContainer>
    );
  }

  if (event.pricing_type === 'free') {
    return <TariffsContainer>Вход на встречу — бесплатный.</TariffsContainer>;
  }

  throw new Error('Unknown pricing type');
};

const AnyRegistrationInsides: React.FC<CommonProps> = props => {
  switch (props.event.registration_type) {
    case 'native':
      return <Registration {...props} />;
    case 'timepad':
      return <TimepadRegistration {...props} />;
    default:
      // huh?
      return null;
  }
};

const AnyRegistration: React.FC<CommonProps> = ({ event }) => (
  <Column stretch>
    <Tariffs event={event} />
    <AnyRegistrationInsides event={event} />
  </Column>
);

export default AnyRegistration;
