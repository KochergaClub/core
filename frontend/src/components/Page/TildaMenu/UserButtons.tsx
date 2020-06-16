import { useEffect } from 'react';

import { FaUserCircle, FaUser, FaUserTie } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { IconType } from 'react-icons/lib';

import { useCurrentUserLazyQuery } from '~/auth/queries.generated';
import { ApolloQueryResults, DropdownMenu } from '~/components';
import { NextLinkAction } from '~/components/DropdownMenu';
import { MenuKind } from '../types';
import LoginButton from './LoginButton';
import { colors, Row } from '@kocherga/frontkit';

interface ButtonProps {
  kind: MenuKind;
  currentKind: MenuKind;
  href: string;
  icon: IconType;
}

interface Props {
  kind: MenuKind;
}

const UserButtons: React.FC<Props> = ({ kind }) => {
  const [getUser, queryResults] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });

  // we can't use `ssr: false` query since we use `disableNetworkFetches` in our apollo code
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!queryResults.called) {
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
          <DropdownMenu
            render={() => <FaUserCircle size="24" color="white" />}
            placement="bottom-end"
          >
            <NextLinkAction href="/my" as="/my">
              <Row vCentered>
                <FaUser color={colors.grey[500]} />
                <span>Личный кабинет</span>
              </Row>
            </NextLinkAction>
            {user.is_staff ? (
              <NextLinkAction href="/team" as="/team">
                <Row vCentered>
                  <FaUserTie color={colors.grey[500]} />
                  <span>Интранет</span>
                </Row>
              </NextLinkAction>
            ) : null}
            <NextLinkAction href="/my/settings" as="/my/settings">
              <Row vCentered>
                <GoGear color={colors.grey[500]} />
                <span>Настройки</span>
              </Row>
            </NextLinkAction>
          </DropdownMenu>
        ) : (
          <LoginButton />
        )
      }
    </ApolloQueryResults>
  );
};

export default UserButtons;
