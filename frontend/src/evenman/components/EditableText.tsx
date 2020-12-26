import autosize from 'autosize';
import React, { useCallback, useReducer, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import styled from 'styled-components';

import { Markdown } from '~/components';
import { AsyncButton, Button, Column, ControlsFooter, Row } from '~/frontkit';

import { Header, IconLink, UserText } from './ui';

const Textarea = styled.textarea`
  width: 100%;
  background-color: #ffffdd;
  padding: 2px 4px;
`;

interface Props {
  title: string;
  text: string;
  save: (text: string) => Promise<unknown>;
  empty: React.ReactNode;
}

interface State {
  editing: boolean;
  saving: boolean;
}

type Action = 'START_EDITING' | 'CANCEL_EDITING' | 'START_SAVING' | 'SAVED';

const reducer = (_: State, action: Action): State => {
  switch (action) {
    case 'START_EDITING':
      return {
        editing: true,
        saving: false,
      };
    case 'START_SAVING':
      return {
        editing: true,
        saving: true,
      };
    case 'CANCEL_EDITING':
      return {
        editing: false,
        saving: false,
      };
    case 'SAVED':
      return {
        editing: false,
        saving: false,
      };
  }
};

const EditableText: React.FC<Props> = ({ title, text, save, empty }) => {
  const [{ editing, saving }, dispatch] = useReducer(reducer, {
    editing: false,
    saving: false,
  });

  const textarea = useRef<HTMLTextAreaElement>();
  const setTextarea = useCallback((node: HTMLTextAreaElement) => {
    if (node) {
      node.focus();
      autosize(node);
    }
    textarea.current = node;
  }, []);

  const startEditing = useCallback(() => dispatch('START_EDITING'), []);

  const cancelEditing = useCallback(() => dispatch('CANCEL_EDITING'), []);

  const commitEditing = useCallback(async () => {
    if (!textarea.current) {
      return;
    }
    dispatch('START_SAVING');
    await save(textarea.current.value);
    dispatch('SAVED');
  }, [save]);

  const editText = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.keyCode === 27) {
        cancelEditing();
        return;
      }
      if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
        commitEditing();
        return;
      }
    },
    [cancelEditing, commitEditing]
  );

  const renderEditing = () => {
    return (
      <Column stretch>
        <Textarea
          ref={setTextarea}
          onKeyDown={editText}
          defaultValue={text}
          disabled={saving}
        />
        <ControlsFooter>
          <Button size="small" onClick={cancelEditing}>
            Отменить
          </Button>
          <AsyncButton size="small" kind="primary" act={commitEditing}>
            Сохранить
          </AsyncButton>
        </ControlsFooter>
      </Column>
    );
  };

  const renderPreview = () => {
    if (text) {
      return (
        <UserText>
          <Markdown source={text} />
        </UserText>
      );
    } else {
      return (
        <>
          {empty}
          <Button size="small" kind="primary" onClick={startEditing}>
            добавить описание
          </Button>
        </>
      );
    }
  };

  return (
    <section>
      <Header>
        <Row vCentered>
          <span>{title}</span>
          <IconLink
            href=""
            onClick={(e: React.SyntheticEvent<EventTarget>) => {
              e.preventDefault();
              startEditing();
            }}
          >
            <FaEdit />
          </IconLink>
        </Row>
      </Header>
      {editing ? renderEditing() : renderPreview()}
    </section>
  );
};

export default EditableText;
