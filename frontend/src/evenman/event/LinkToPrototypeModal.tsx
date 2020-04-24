import { useState, useCallback, useEffect } from 'react';
import { Button, Modal, ControlsFooter, Row, Column } from '@kocherga/frontkit';
import Toggle from 'react-toggle';

import { AsyncButton, Spinner } from '~/components';
import PrototypePicker from './PrototypePicker';
import {
  EvenmanEvent_DetailsFragment,
  EvenmanUpdateMutationVariables,
} from './queries.generated';
import { useEvenmanPrototypeLazyQuery } from '../event-prototype/queries.generated';
import { useUpdateMutation } from './hooks';

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

type AllUpdateArgs = Omit<EvenmanUpdateMutationVariables, 'id'>;

type UpdatableArgs = Pick<
  AllUpdateArgs,
  | 'title'
  | 'summary'
  | 'description'
  | 'location'
  | 'project_slug'
  | 'timing_description_override'
  | 'image_id'
>;

const FIELDS: { key: keyof UpdatableArgs; title: string }[] = [
  { key: 'title', title: 'Название' },
  { key: 'summary', title: 'Короткое описание' },
  { key: 'description', title: 'Описание' },
  { key: 'location', title: 'Комната' },
  { key: 'project_slug', title: 'Проект' },
  { key: 'timing_description_override', title: 'Описание расписания' },
  { key: 'image_id', title: 'Картинка' },
];

const LinkToPrototypeModal: React.FC<Props> = ({ event, close }) => {
  const [selectedId, setSelectedId] = useState(event.prototype?.id);
  const update = useUpdateMutation(event.id);

  const [loadPrototype, { loading, data }] = useEvenmanPrototypeLazyQuery();

  const [selectedFields, setSelectedFields] = useState(
    () => new Set<keyof UpdatableArgs>(FIELDS.map(f => f.key))
  );

  const save = useCallback(async () => {
    if (!data) {
      return;
    }

    const updateArgs: UpdatableArgs = {};

    selectedFields.forEach(f => {
      if (f === 'project_slug') {
        updateArgs[f] = data.prototype.project?.meta.slug;
      } else if (f === 'image_id') {
        updateArgs[f] = data.prototype.image?.original_image.id;
      } else {
        updateArgs[f] = data.prototype[f];
      }
    });

    await update({
      prototype_id: data.prototype.id,
      ...updateArgs,
    });
    close();
  }, [update, close, data, selectedFields]);

  useEffect(() => {
    if (!selectedId) {
      return;
    }
    loadPrototype({
      variables: {
        id: selectedId,
      },
    });
  }, [loadPrototype, selectedId]);

  const saveDisabled = !selectedId || !data || loading;

  return (
    <Modal>
      <Modal.Header toggle={close}>
        Заполнить из прототипа {loading && <Spinner size="span" />}
      </Modal.Header>
      <Modal.Body>
        <Column stretch>
          <PrototypePicker selectedId={selectedId} select={setSelectedId} />
          {selectedId && (
            <>
              {FIELDS.map(f => (
                <WrappedToggle
                  key={f.key}
                  checked={selectedFields.has(f.key)}
                  setChecked={(value: boolean) => {
                    const newSelectedFields = new Set(selectedFields);
                    if (value) {
                      newSelectedFields.add(f.key);
                    } else {
                      newSelectedFields.delete(f.key);
                    }
                    setSelectedFields(newSelectedFields);
                  }}
                  title={f.title}
                />
              ))}
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
