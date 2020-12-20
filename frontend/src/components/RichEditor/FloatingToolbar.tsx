import React from 'react';
import { usePopper } from 'react-popper';
import { Editor, Range, Text, Transforms } from 'slate';
import { useEditor, useSlate } from 'slate-react';

import { FloatingList } from '~/components';
import { Button, Input } from '~/frontkit';

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
        size="small"
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

export const FloatingToolbar: React.FC = () => {
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
