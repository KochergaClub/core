import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { FaUser, FaUserCircle, FaUserTie } from 'react-icons/fa';
import { GoGear, GoSignOut } from 'react-icons/go';
import styled from 'styled-components';

import { colors, fonts, Row } from '@kocherga/frontkit';

import { useCurrentUserLazyQuery } from '~/auth/queries.generated';
import { useNotification } from '~/common/hooks';
import { ApolloQueryResults, DropdownMenu } from '~/components';
import { Action, NextLinkAction } from '~/components/DropdownMenu';
import { BasicSpinner } from '~/components/Spinner';
import { useLogoutMutation } from '~/my/queries.generated';

import { MenuKind } from '../types';
import LoginButton from './LoginButton';

const Email = styled.div`
  padding: 4px 12px;
  text-align: center;
  font-size: ${fonts.sizes.XS};
`;

const LogoutAction: React.FC = () => {
  const [acting, setActing] = useState(false);

  const [logoutMutation] = useLogoutMutation();
  const notify = useNotification();

  const act = useCallback(async () => {
    setActing(true);
    const { data } = await logoutMutation();
    if (!data?.result?.ok) {
      notify({ text: 'Не получилось выйти', type: 'Error' });
      setActing(false);
      return;
    }
    window.location.href = '/';
  }, [logoutMutation, notify]);

  return (
    <Action act={act}>
      <Row vCentered>
        {acting ? (
          <BasicSpinner color={colors.grey[500]} />
        ) : (
          <GoSignOut color={colors.grey[500]} />
        )}
        <span>Выйти</span>
      </Row>
    </Action>
  );
};

interface Props {
  kind: MenuKind;
}

const UserButtons: React.FC<Props> = (
  {
    /* kind */
  }
) => {
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
          <DropdownMenu render={() => <FaUserCircle size="24" color="white" />}>
            <Link href="/my" as="/my">
              <Email>{user.email}</Email>
            </Link>
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
            <LogoutAction />
          </DropdownMenu>
        ) : (
          <LoginButton />
        )
      }
    </ApolloQueryResults>
  );
};

export default UserButtons;