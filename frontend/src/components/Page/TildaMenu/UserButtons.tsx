import { FaGlobe, FaGrin, FaHammer } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

import { MenuKind } from '../types';
import { Row } from '@kocherga/frontkit';
import Link from 'next/link';
import { useCurrentUserQuery } from '~/auth/queries.generated';
import { ApolloQueryResults } from '~/components';
import LoginButton from './LoginButton';

interface ButtonProps {
  kind: MenuKind;
  currentKind: MenuKind;
  href: string;
  icon: IconType;
}

const UserButton: React.FC<ButtonProps> = ({
  kind,
  currentKind,
  href,
  icon: IconComponent,
}) => {
  const color = kind === currentKind ? 'white' : '#333333';

  return (
    <Link href={href} passHref>
      <a>
        <IconComponent size={24} color={color} />
      </a>
    </Link>
  );
};

interface Props {
  kind: MenuKind;
}

const UserButtons: React.FC<Props> = ({ kind }) => {
  const queryResults = useCurrentUserQuery({ ssr: true });

  if (typeof window === 'undefined') {
    return null; // no buttons on server
  }

  return (
    <ApolloQueryResults renderLoading={() => null} {...queryResults}>
      {({
        data: {
          my: { user },
        },
      }) =>
        user.is_authenticated ? (
          <Row gutter={10}>
            {user.is_staff ? (
              <UserButton
                kind="team"
                currentKind={kind}
                href="/team"
                icon={FaHammer}
              />
            ) : null}
            <UserButton
              kind="public"
              currentKind={kind}
              href="/"
              icon={FaGlobe}
            />
            <UserButton kind="my" currentKind={kind} href="/my" icon={FaGrin} />
          </Row>
        ) : (
          <LoginButton />
        )
      }
    </ApolloQueryResults>
  );
};

export default UserButtons;
