import Registration from './Registration';
import TimepadRegistration from './TimepadRegistration';

import { CommonProps } from './types';

const AnyRegistration: React.FC<CommonProps> = props => {
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
