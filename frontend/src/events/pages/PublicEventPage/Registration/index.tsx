import { useUser } from '~/common/hooks';

import { CommonProps } from '../types';

import AnonChoice from './AnonChoice';
import AuthenticatedRegistration from './AuthenticatedRegistration';

export default function Registration(props: CommonProps) {
  const user = useUser();

  if (user.is_authenticated) {
    return <AuthenticatedRegistration {...props} />;
  } else {
    return <AnonChoice {...props} />;
  }
}
