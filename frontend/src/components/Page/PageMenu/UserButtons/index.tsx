import Link from 'next/link';
import { useCallback, useContext, useEffect } from 'react';
import { FaEdit, FaUser, FaUserCircle, FaUserTie } from 'react-icons/fa';
import { GoGear, GoSignOut } from 'react-icons/go';

import { useLazyQuery, useMutation } from '@apollo/client';

import { CurrentUserDocument } from '~/auth/queries.generated';
import { WagtailPageContext } from '~/cms/contexts';
import { ApolloQueryResults, DropdownMenu } from '~/components';
import { Action, NextLinkAction } from '~/components/DropdownMenu';
import { useNotification } from '~/frontkit';
import { LogoutDocument } from '~/my/queries.generated';
import { useEditWagtailPage } from '~/wagtail/hooks';

import { MenuKind } from '../../types';
import LoginButton from './LoginButton';
import { WagtailEditablePageDocument } from './queries.generated';

const LogoutAction: React.FC = () => {
  const [logoutMutation] = useMutation(LogoutDocument);
  const notify = useNotification();

  const act = useCallback(async () => {
    const { data } = await logoutMutation();
    if (!data?.result?.ok) {
      notify({ text: 'Не получилось выйти', type: 'Error' });
      return;
    }
    window.location.href = '/';
  }, [logoutMutation, notify]);

  return <Action act={act} title="Выйти" icon={GoSignOut} />;
};

const EditWagtailPageAction: React.FC = () => {
  const { state, dispatch } = useContext(WagtailPageContext);

  const [query, queryResults] = useLazyQuery(WagtailEditablePageDocument, {
    variables: { path: window.location.pathname },
  });

  useEffect(() => {
    if (!dispatch) {
      return; // avoid query if on non-wagtail pages
    }
    query();
  }, [dispatch, query]);

  const act = useEditWagtailPage();

  if (state.editing) {
    return null; // already editing
  }

  if (!queryResults.data) {
    return null;
  }

  if (!queryResults.data?.wagtailPage?.meta.permissions.can_edit) {
    return null;
  }

  return <Action act={act} title="Редактировать" icon={FaEdit} />;
};

interface Props {
  kind: MenuKind;
}

const UserButtons: React.FC<Props> = (
  {
    /* kind - unused for now */
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
          <DropdownMenu
            render={() => (
              <FaUserCircle size="24" color="white" className="block" />
            )}
          >
            <Link href="/my">
              <a className="block no-underline text-black text-xs text-center px-3 py-1">
                {user.email}
              </a>
            </Link>
            <NextLinkAction href="/my" icon={FaUser} title="Личный кабинет" />
            {user.is_staff ? (
              <NextLinkAction href="/team" icon={FaUserTie} title="Интранет" />
            ) : null}
            <NextLinkAction
              href="/my/settings"
              icon={GoGear}
              title="Настройки"
            />
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
