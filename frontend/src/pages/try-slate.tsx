import React, { useCallback, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import { createEditor, Editor, Element, Path, Range, Text, Transforms } from 'slate';
import {
    Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, useEditor, useSlate,
    withReact
} from 'slate-react';
import styled from 'styled-components';

import { NextApolloPage, withApollo } from '~/apollo';
import { DropdownMenu, FloatingList, PaddedBlock, Page } from '~/components';
import { Action } from '~/components/DropdownMenu';
import { Button, Column, fonts, HR, Input } from '~/frontkit';

// model
interface HRBlock extends Element {
  type: 'hr';
}

interface ParagraphBlock extends Element {
  type: 'paragraph';
}

type Block = HRBlock | ParagraphBlock;

type Value = Block[];

const KochergaEditor = {
  toggleBold(editor: Editor) {
    const isBold = !Editor.nodes(editor, {
      match: (n) => n.bold === true,
      mode: 'all',
    }).next().done;

    Transforms.setNodes(
      editor,
      { bold: isBold ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
};

const withKocherga = (editor: Editor): Editor => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'hr' ? true : isVoid(element);
  };

  return editor;
};

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

// comments
const CommentsInner: React.FC<{ selection: Selection }> = ({ selection }) => {
  const editor = useEditor();
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);

  const domRange = selection.getRangeAt(0);

  const { styles, attributes } = usePopper(domRange, popperElement);

  return (
    <FloatingList
      ref={setPopperElement}
      style={styles.popper}
      attributes={attributes.popper || {}}
      expanded={true}
    >
      <Input type="text" />
      <Button
        onClick={() => {
          Transforms.setNodes(
            editor,
            { thread: true }, // TODO - store thread_id if it doesn't exist, populate with uuid
            { match: (n) => Text.isText(n), split: true }
          );
        }}
      >
        Прокомментировать
      </Button>
    </FloatingList>
  );
};

const Comments: React.FC = () => {
  const editor = useSlate();

  if (typeof window === 'undefined') {
    return null; // SSR
  }
  const { selection } = editor;

  if (
    !selection ||
    // !ReactEditor.isFocused(editor) ||
    Range.isCollapsed(selection) ||
    Editor.string(editor, selection) === ''
  ) {
    return null;
  }

  // TODO - copy domSelection and store in React context (?) so that we can keep it stable while cursor is positioned in Comments overlay
  const domSelection = window.getSelection();
  if (!domSelection) {
    return null;
  }

  return <CommentsInner selection={domSelection} />;
};

const TrySlate: React.FC = () => {
  const editor = useMemo(() => withReact(withKocherga(createEditor())), []);

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

  return (
    <Column gutter={16} stretch>
      <Slate
        editor={editor}
        value={value}
        onChange={(v) => {
          setValue(v as Value);
        }}
      >
        <div>
          <Comments />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={onKeyDown}
          />
        </div>
      </Slate>
      <pre style={{ fontSize: fonts.sizes.XS }}>
        {JSON.stringify(value, null, 2)}
      </pre>
    </Column>
  );
};

const SlatePage: NextApolloPage = () => {
  return (
    <Page title="Slate.JS experiments">
      <PaddedBlock>
        <TrySlate />
      </PaddedBlock>
    </Page>
  );
};

export default withApollo(SlatePage);
