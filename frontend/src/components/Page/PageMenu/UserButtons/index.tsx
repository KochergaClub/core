import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FaEdit, FaUser, FaUserCircle, FaUserTie } from 'react-icons/fa';
import { GoGear, GoSignOut } from 'react-icons/go';
import styled from 'styled-components';

import { useLazyQuery, useMutation } from '@apollo/client';
import { colors, fonts, Row } from '~/frontkit';

import { CurrentUserDocument } from '~/auth/queries.generated';
import { WagtailPageContext } from '~/cms/contexts';
import { useNotification } from '~/common/hooks';
import { ApolloQueryResults, DropdownMenu } from '~/components';
import { Action, NextLinkAction } from '~/components/DropdownMenu';
import { BasicSpinner } from '~/components/Spinner';
import { LogoutDocument } from '~/my/queries.generated';

import { MenuKind } from '../../types';
import LoginButton from './LoginButton';
import { WagtailEditablePageDocument } from './queries.generated';

const Email = styled.div`
  padding: 4px 12px;
  text-align: center;
  font-size: ${fonts.sizes.XS};
`;

const LogoutAction: React.FC = () => {
  const [acting, setActing] = useState(false);

  const [logoutMutation] = useMutation(LogoutDocument);
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

const EditWagtailPageAction: React.FC = () => {
  const {
    state: { editing },
    dispatch,
  } = useContext(WagtailPageContext);

  const [query, queryResults] = useLazyQuery(WagtailEditablePageDocument, {
    variables: { path: window.location.pathname },
  });

  useEffect(() => {
    if (!dispatch) {
      return; // avoid query if on non-wagtail pages
    }
    query();
  }, [dispatch, query]);

  const act = useCallback(async () => {
    if (!dispatch) {
      return; // shouldn't happen
    }
    dispatch({ type: 'EDIT' });
  }, [dispatch]);

  if (editing) {
    return null; // already editing
  }

  if (!queryResults.data) {
    return null;
  }

  if (!queryResults.data?.wagtailPage?.meta.permissions.can_edit) {
    return null;
  }

  return (
    <Action act={act}>
      <Row vCentered>
        <FaEdit color={colors.grey[500]} />
        <span>Редактировать</span>
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
  const [getUser, queryResults] = useLazyQuery(CurrentUserDocument, {
    // we can't provide user data from server since we often use static pages, e.g. for wagtail
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
            <EditWagtailPageAction />
          </DropdownMenu>
        ) : (
          <LoginButton />
        )
      }
    </ApolloQueryResults>
  );
};

export default UserButtons;
