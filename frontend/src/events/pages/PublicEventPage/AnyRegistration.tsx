import Registration from './Registration';
import TimepadRegistration from './TimepadRegistration';

import { PublicEvent, EventTicket } from '~/events/types';

interface Props {
  event: PublicEvent;
  ticket?: EventTicket;
}

const AnyRegistration: React.FC<Props> = props => {
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

export default AnyRegistration;
