import { A, Column } from '@kocherga/frontkit';

import { HintCard } from '~/components';
import Registration from './Registration';
import TimepadRegistration from './TimepadRegistration';

import { CommonProps } from './types';

const Tariffs: React.FC<CommonProps> = ({ event }) => {
  if (event.pricing_type === 'anticafe') {
    return (
      <Column centered>
        <HintCard>
          Участие по{' '}
          <A href="/pricing" target="_blank">
            обычным тарифам пространства Кочерги
          </A>{' '}
          — 2,5 руб./минута, для владельцев абонементов — без доплаты. Оплата по
          факту участия.
        </HintCard>
      </Column>
    );
  }

  if (event.pricing_type === 'free') {
    return null;
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
  <Column stretch gutter={40}>
    <Tariffs event={event} />
    <AnyRegistrationInsides event={event} />
  </Column>
);

export default AnyRegistration;
