import React, { useCallback, useMemo, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { Path, Transforms } from 'slate';
import {
    Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, useEditor, withReact
} from 'slate-react';
import styled from 'styled-components';

import { DropdownMenu } from '~/components';
import { Action } from '~/components/DropdownMenu';
import { Column, fonts, HR } from '~/frontkit';

import { RichEditorContext, useRichEditorReducer } from './contexts';
import { FloatingToolbar } from './FloatingToolbar';
import { createKochergaEditor, KochergaEditor, Value } from './model';

// blocks
const BlockWrapperContainer = styled.div`
  display: flex;
  flex-direction: row;

  > :first-child {
    visibility: hidden;
    position: relative;
    top: 16px;
  }
  :hover {
    > :first-child {
      visibility: visible;
    }
  }

  > * + * {
    margin-left: 8px;
    flex: 1;
  }
`;

const BlockWrapper: React.FC<{ props: RenderElementProps }> = ({
  props,
  children,
}) => {
  const editor = useEditor();

  return (
    <BlockWrapperContainer>
      <div contentEditable={false}>
        <DropdownMenu>
          <Action
            syncAct={() => {
              const path = ReactEditor.findPath(editor, props.element);
              Transforms.removeNodes(editor, { at: path });
            }}
            title="Удалить"
            icon={FaTrash}
          />
          <Action
            syncAct={() => {
              let path = ReactEditor.findPath(editor, props.element);
              path = Path.next(path);
              Transforms.insertNodes(
                editor,
                [
                  {
                    type: 'hr',
                    children: [{ text: '' }],
                  },
                ],
                { at: path }
              );
            }}
            title="Черта"
            icon={FaPlus}
          />
        </DropdownMenu>
      </div>
      <div>{children}</div>
    </BlockWrapperContainer>
  );
};

const renderElementInner = (props: RenderElementProps): React.ReactElement => {
  switch (props.element.type) {
    case 'hr':
      return (
        <div {...props.attributes}>
          <HR />
          {props.children}
        </div>
      );
    case 'paragraph':
    default:
      return <p {...props.attributes}>{props.children}</p>;
  }
};

const renderElement = (props: RenderElementProps): React.ReactElement => {
  return <BlockWrapper props={props}>{renderElementInner(props)}</BlockWrapper>;
};

const renderLeaf = (props: RenderLeafProps): React.ReactElement => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
};

export const RichEditor: React.FC = () => {
  const editor = useMemo(() => withReact(createKochergaEditor()), []);
  const [state, dispatch] = useRichEditorReducer();

  const [value, setValue] = useState<Value>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
    {
      type: 'hr',
      children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'More text' }],
    },
  ]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'b' && event.metaKey) {
        event.preventDefault();
        KochergaEditor.toggleBold(editor);
      }
      return;
    },
    [editor]
  );

  const decorate = useCallback(() => {
    return [];
  }, [state.lockedSelection]);

  return (
    <Column gutter={16} stretch>
      <RichEditorContext.Provider value={{ state, dispatch }}>
        <Slate
          editor={editor}
          value={value}
          onChange={(v) => {
            setValue(v as Value);
          }}
        >
          <div>
            <FloatingToolbar />
            <Editable
              decorate={decorate}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={onKeyDown}
            />
          </div>
        </Slate>
      </RichEditorContext.Provider>
      <pre style={{ fontSize: fonts.sizes.XS }}>
        {JSON.stringify(value, null, 2)}
      </pre>
    </Column>
  );
};
