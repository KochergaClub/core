import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useQuery } from '@apollo/client';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { ApolloQueryResults } from '~/components';
import { AsyncButton, Column, Input, Modal, Row } from '~/frontkit';

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

  const { ref: inputRef, ...inputRest } = register('query');

  const inputRefWithFocus = useCallback(
    (el: HTMLInputElement | null) => {
      if (!el) {
        return;
      }
      focus(el);
      inputRef(el);
    },
    [focus, inputRef]
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
            <Input
              type="text"
              placeholder="Найти..."
              wide
              ref={inputRefWithFocus}
              {...inputRest}
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
