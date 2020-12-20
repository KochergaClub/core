import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Editor, Range as SlateRange, Text, Transforms } from 'slate';
import { ReactEditor, useEditor, useSlate } from 'slate-react';
import styled from 'styled-components';

import { useFocusOnFirstModalRender } from '~/common/hooks';
import { FloatingList } from '~/components';
import { Button, Input, Row } from '~/frontkit';

import { RichEditorContext } from './contexts';
import { KochergaEditor } from './model';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

type OverlayProps = {
  close: () => void;
};

const ToolbarForRange: React.FC<{
  domRange: Range;
  overlay?: OverlayProps;
}> = ({ domRange, overlay, children }) => {
  const [
    popperElement,
    setPopperElement,
  ] = React.useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(domRange, popperElement);

  const [el] = React.useState(() => document.createElement('div'));

  React.useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  const render = () => {
    return (
      <>
        <FloatingList
          ref={setPopperElement}
          style={styles.popper}
          attributes={attributes.popper || {}}
          expanded={true}
        >
          {children}
        </FloatingList>
        {overlay ? <Overlay onClick={overlay.close} /> : null}
      </>
    );
  };

  return ReactDOM.createPortal(render(), el);
};

const CommentsToolbar: React.FC<{ domRange: Range; close: () => void }> = ({
  domRange,
  close,
}) => {
  const editor = useEditor();
  const focus = useFocusOnFirstModalRender();

  return (
    <ToolbarForRange domRange={domRange} overlay={{ close }}>
      <Row vCentered>
        <Input type="text" ref={focus} />
        <Button
          kind="primary"
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
      </Row>
    </ToolbarForRange>
  );
};

const getSelectionDomRange = (editor: ReactEditor): Range | undefined => {
  const { selection } = editor;

  if (
    !selection ||
    // !ReactEditor.isFocused(editor) ||
    SlateRange.isCollapsed(selection) ||
    Editor.string(editor, selection) === ''
  ) {
    return;
  }

  const domSelection = window.getSelection();
  if (!domSelection) {
    return;
  }

  const domRange = domSelection.getRangeAt(0);
  return domRange;
};

export const FloatingToolbar: React.FC = () => {
  const editor = useSlate();
  const context = useContext(RichEditorContext);

  if (typeof window === 'undefined') {
    return null; // SSR
  }

  if (context.state.lockedSelection) {
    return (
      <CommentsToolbar
        domRange={context.state.lockedSelection.domRange}
        close={() => {
          context.dispatch({
            type: 'UNLOCK_SELECTION',
          });
        }}
      />
    );
  } else {
    const domRange = getSelectionDomRange(editor);
    if (!domRange) {
      return null;
    }

    return (
      <ToolbarForRange domRange={domRange}>
        <Button
          onClick={() => {
            KochergaEditor.toggleBold(editor);
          }}
        >
          Bold
        </Button>
        <Button
          onClick={() => {
            if (!editor.selection) {
              return; // this should never happen... probably
            }
            context.dispatch({
              type: 'LOCK_SELECTION',
              payload: {
                range: editor.selection,
                domRange,
                mode: 'comment',
              },
            });
          }}
        >
          Comment
        </Button>
      </ToolbarForRange>
    );
  }
};
