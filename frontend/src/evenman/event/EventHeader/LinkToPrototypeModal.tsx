import { useState, useCallback } from 'react';
import { Button, Modal, ControlsFooter, Row, Column } from '@kocherga/frontkit';
import Toggle from 'react-toggle';

import { AsyncButton } from '~/components';
import PrototypePicker from './PrototypePicker';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import { useEvenmanPrototypeLazyQuery } from '../../event-prototype/queries.generated';
import { useUpdateMutation } from '../hooks';

const WrappedToggle: React.FC<{
  title: string;
  checked: boolean;
  setChecked: (v: boolean) => void;
}> = ({ title, checked, setChecked }) => {
  const change = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setChecked(e.currentTarget.checked);
    },
    [setChecked]
  );
  return (
    <Row>
      <Toggle checked={checked} onChange={change} />
      <span>{title}</span>
    </Row>
  );
};

interface Props {
  close: () => void;
  event: EvenmanEvent_DetailsFragment;
}

const LinkToPrototypeModal: React.FC<Props> = ({ event, close }) => {
  const [selectedId, setSelectedId] = useState(event.prototype?.id);
  const update = useUpdateMutation(event.id);

  const [loadPrototype, { loading, data }] = useEvenmanPrototypeLazyQuery();

  const [fillTitle, setFillTitle] = useState(true);
  const [fillSummary, setFillSummary] = useState(true);
  const [fillDescription, setFillDescription] = useState(true);

  const save = useCallback(async () => {
    if (!data) {
      return;
    }
    await update({
      prototype_id: data.prototype.id,
      ...(fillTitle ? { title: data.prototype.title } : {}),
      ...(fillSummary ? { summary: data.prototype.summary } : {}),
      ...(fillDescription ? { description: data.prototype.description } : {}),
    });
    close();
  }, [update, close, data, fillTitle, fillSummary, fillDescription]);

  const select = useCallback(
    async (id: string) => {
      setSelectedId(id);
      loadPrototype({
        variables: {
          id,
        },
      });
    },
    [loadPrototype]
  );

  const saveDisabled = !selectedId || !data || loading;

  return (
    <Modal>
      <Modal.Header toggle={close}>Заполнить из прототипа</Modal.Header>
      <Modal.Body>
        <Column stretch>
          <PrototypePicker selectedId={selectedId} select={select} />
          {selectedId && (
            <>
              <WrappedToggle
                checked={fillTitle}
                setChecked={setFillTitle}
                title="Название"
              />
              <WrappedToggle
                checked={fillSummary}
                setChecked={setFillSummary}
                title="Короткое описание"
              />
              <WrappedToggle
                checked={fillDescription}
                setChecked={setFillDescription}
                title="Описание"
              />
            </>
          )}
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={close}>Отменить</Button>
          <AsyncButton act={save} disabled={saveDisabled} kind="primary">
            Сохранить
          </AsyncButton>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default LinkToPrototypeModal;
