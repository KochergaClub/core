import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useQuery } from '@apollo/client';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { ApolloQueryResults, WideInput } from '~/components';
import { AsyncButton, Column, Modal, Row } from '~/frontkit';

import { SearchUsersForPickerDocument, UserForPickerFragment } from './queries.generated';

interface Props {
  close: () => void;
  pick: (user: UserForPickerFragment) => Promise<void>;
}

const AdminModalUserPicker: React.FC<Props> = ({ close, pick }) => {
  const { register, watch } = useForm();
  const watchSearchQuery = watch('query');

  const queryResults = useQuery(SearchUsersForPickerDocument, {
    variables: {
      input: {
        query: watchSearchQuery || '',
      },
    },
  });

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({ onEscape: close });

  const inputRef = useCallback(
    (el: HTMLInputElement | null) => {
      if (!el) {
        return;
      }
      focus(el);
      register(el);
    },
    [focus, register]
  );

  return (
    <Modal>
      <Modal.Header close={close}>Выбрать пользователя</Modal.Header>
      <Modal.Body {...hotkeys}>
        <Column stretch>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <WideInput
              type="text"
              name="query"
              placeholder="Найти..."
              ref={inputRef}
            />
          </form>
          <ApolloQueryResults {...queryResults}>
            {({
              data: {
                searchUsers: { results },
              },
            }) => (
              <Column stretch>
                {results.map((user) => (
                  <Row key={user.id} spaced>
                    <div>{user.email}</div>
                    <AsyncButton act={() => pick(user)} size="small">
                      Выбрать
                    </AsyncButton>
                  </Row>
                ))}
              </Column>
            )}
          </ApolloQueryResults>
        </Column>
      </Modal.Body>
    </Modal>
  );
};

export default AdminModalUserPicker;
