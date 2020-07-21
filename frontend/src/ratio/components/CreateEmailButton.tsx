import { useCallback, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import { Button, Row, Column, Input, Modal } from '@kocherga/frontkit';

import { AsyncButton, ButtonWithModal } from '~/components';

import {
  RatioTrainingEmailPrototypeQuery,
  RatioTrainingEmailPrototypeQueryVariables,
  RatioTrainingEmailPrototypeDocument,
  useRatioTrainingSendEmailMutation,
} from '../queries.generated';

interface PrototypeParams {
  title: string;
  type: string;
}

interface Props {
  training_id: string;
  prototypes: PrototypeParams[];
}

interface ModalProps {
  training_id: string;
  prototypes: PrototypeParams[];
  close: () => void;
}

interface PrototypePickerProps {
  training_id: string;
  prototype: PrototypeParams;
  pick: (value: string) => void;
  children: React.ReactNode;
}

const PrototypePicker: React.FC<PrototypePickerProps> = ({
  training_id,
  prototype,
  pick,
}) => {
  const apolloClient = useApolloClient();

  const loadPrototype = useCallback(async () => {
    const { data } = await apolloClient.query<
      RatioTrainingEmailPrototypeQuery,
      RatioTrainingEmailPrototypeQueryVariables
    >({
      query: RatioTrainingEmailPrototypeDocument,
      variables: { training_id, type: prototype.type },
    });
    if (!data) {
      throw new Error('No data');
    }
    pick(data.content);
  }, [apolloClient, prototype.type, training_id, pick]);

  return <AsyncButton act={loadPrototype}>{prototype.title}</AsyncButton>;
};

const PrototypePickerList = ({
  prototypes,
  pick,
  training_id,
}: {
  prototypes: PrototypeParams[];
  pick: (v: string) => void;
  training_id: string;
}) => {
  return (
    <Row>
      {prototypes.map((prototype, i) => (
        <PrototypePicker
          key={i}
          prototype={prototype}
          pick={pick}
          training_id={training_id}
        >
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

  const [sendEmailMutation] = useRatioTrainingSendEmailMutation();

  const { close } = props;
  const create = useCallback(async () => {
    setCreating(true);
    const result = await sendEmailMutation({
      variables: {
        input: {
          training_id: props.training_id,
          title,
          content,
        },
      },
    });
    if (result.data) {
      alert(result.data.email.draft_link);
      close();
    } else {
      alert(JSON.stringify(result.errors));
    }
  }, [sendEmailMutation, props.training_id, title, content, close]);

  return (
    <Modal>
      <Modal.Header toggle={props.close}>Создать рассылку</Modal.Header>
      <Modal.Body>
        <Column>
          <PrototypePickerList
            prototypes={props.prototypes}
            pick={setContent}
            training_id={props.training_id}
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
  return (
    <ButtonWithModal title="Написать">
      {({ close }) => (
        <EmailModal
          prototypes={props.prototypes}
          close={close}
          training_id={props.training_id}
        />
      )}
    </ButtonWithModal>
  );
}
