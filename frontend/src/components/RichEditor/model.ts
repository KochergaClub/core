import { createEditor, Editor, Element, Text, Transforms } from 'slate';

interface HRBlock extends Element {
  type: 'hr';
}

interface ParagraphBlock extends Element {
  type: 'paragraph';
}

type Block = HRBlock | ParagraphBlock;

export type Value = Block[];

export const KochergaEditor = {
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

export const withKocherga = (editor: Editor): Editor => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === 'hr' ? true : isVoid(element);
  };

  return editor;
};

export const createKochergaEditor = () => withKocherga(createEditor());
