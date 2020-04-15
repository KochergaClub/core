import { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Input, Modal, Button, ControlsFooter } from '@kocherga/frontkit';

import {
  useFocusOnFirstModalRender,
  useCommonHotkeys,
  useNotification,
} from '~/common/hooks';

interface Props {
  title: string;
  description: string;
  toggle: () => void;
  save: (text: string) => Promise<void>;
}

const WideInput = styled(Input)`
  width: 100%;
`;

const Centered = styled.div`
  text-align: center;
`;

const InputModal: React.FC<Props> = ({ title, description, toggle, save }) => {
  const [value, setValue] = useState('');
  const [acting, setActing] = useState(false);
  const updateValue = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const notify = useNotification();

  const submit = useCallback(async () => {
    if (!value) {
      return; // nothing to save
    }
    setActing(true);
    try {
      await save(value);
    } catch (e) {
      notify({ text: String(e), type: 'Error' });
    }
    setActing(false);
  }, [save, value, notify]);

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({ onEnter: submit, onEscape: toggle });

  return (
    <Modal>
      <Modal.Header toggle={toggle}>{title}</Modal.Header>
      <Modal.Body {...hotkeys}>
        <Centered>
          {description}
          <br />
          <WideInput
            type="text"
            value={value}
            onChange={updateValue}
            ref={focus}
          />
        </Centered>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button
            disabled={acting || !value.startsWith('http')}
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

export default InputModal;
