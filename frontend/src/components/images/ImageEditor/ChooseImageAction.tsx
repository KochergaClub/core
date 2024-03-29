import { useCallback, useState } from 'react';
import { FiGrid } from 'react-icons/fi';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { ModalAction } from '~/components/DropdownMenu';
import { A, Button, Column, ControlsFooter, Input, Label, Modal } from '~/frontkit';

import { SetImageIdProps as Props } from './types';

interface ModalProps {
  close: () => void;
  save: (id: string) => Promise<unknown>;
}

const ChooseImageModal: React.FC<ModalProps> = ({ close, save }) => {
  const [acting, setActing] = useState(false);

  const [value, setValue] = useState('');

  const updateValue = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const submit = useCallback(async () => {
    if (!value) {
      return;
    }
    setActing(true);
    await save(value);
    setActing(false); // not really necessary, modal will be destroyed on close()
    close();
  }, [save, close, value]);

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({ onEnter: submit, onEscape: close });

  return (
    <Modal>
      <Modal.Header close={close}>Выбор существующей картинки</Modal.Header>
      <Modal.Body {...hotkeys}>
        <Column stretch>
          <div className="text-sm">
            Возможность искать картинки появится позже. Пока что можно пойти в{' '}
            <A href="/wagtail/images/">Wagtail</A> и найти ID картинки там
            (взять из URL-а).
          </div>
          <Label>ID картинки в Wagtail:</Label>
          <Input
            type="number"
            value={value}
            onChange={updateValue}
            ref={focus}
            scale="big"
          />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button
            disabled={acting}
            loading={acting}
            onClick={submit}
            kind="primary"
          >
            Сохранить
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

const ChooseImageAction: React.FC<Props> = ({ setImageId }) => {
  return (
    <ModalAction title="Выбрать существующую" icon={FiGrid}>
      {({ close }) => <ChooseImageModal close={close} save={setImageId} />}
    </ModalAction>
  );
};

export default ChooseImageAction;
