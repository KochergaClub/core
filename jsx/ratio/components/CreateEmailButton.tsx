import React, { useCallback, useState } from 'react';

import { Button, Row, Column, Input, Modal } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

interface PrototypeParams {
  title: string;
  url: string;
}

interface Props {
  prototypes: PrototypeParams[];
  create: string;
  children: React.ReactNode;
}

interface ModalProps {
  prototypes: PrototypeParams[];
  createUrl: string;
  close: () => void;
}

interface PrototypePickerProps {
  prototype: PrototypeParams;
  pick: (value: string) => void;
  children: React.ReactNode;
}

const PrototypePicker = ({ prototype, pick }: PrototypePickerProps) => {
  const [loading, setLoading] = useState(false);

  const api = useAPI();

  const loadPrototype = useCallback(
    async () => {
      setLoading(true);
      const { content } = (await api.call(prototype.url, 'GET')) as {
        content: string;
      };
      setLoading(false);
      pick(content);
    },
    [prototype.url, pick]
  );

  return (
    <Button onClick={loadPrototype} loading={loading} disabled={loading}>
      {prototype.title}
    </Button>
  );
};

const PrototypePickerList = ({
  prototypes,
  pick,
}: {
  prototypes: PrototypeParams[];
  pick: (v: string) => void;
}) => {
  return (
    <Row>
      {prototypes.map((prototype, i) => (
        <PrototypePicker key={i} prototype={prototype} pick={pick}>
          {prototype.title}
        </PrototypePicker>
      ))}
    </Row>
  );
};

const EmailModal = (props: ModalProps) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [creating, setCreating] = useState(false);

  const api = useAPI();

  const create = useCallback(
    async () => {
      setCreating(true);
      const result = await api.call(props.createUrl, 'POST', {
        title,
        content,
      });
      alert(result.draft_link);
      props.close();
    },
    [title, content, props.close]
  );

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={props.close}>Создать рассылку</Modal.Header>
      <Modal.Body>
        <Column>
          <PrototypePickerList
            prototypes={props.prototypes}
            pick={setContent}
          />
          <Input
            type="text"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
            disabled={creating}
          />
          <textarea
            value={content}
            onChange={e => setContent(e.currentTarget.value)}
            disabled={creating}
          />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={create} loading={creating} disabled={creating}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function CreateEmailButton(props: Props) {
  const [open, setOpen] = useState(false);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{props.children}</Button>
      {open && (
        <EmailModal
          createUrl={props.create}
          prototypes={props.prototypes}
          close={closeModal}
        />
      )}
    </div>
  );
}
