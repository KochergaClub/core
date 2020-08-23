import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button, Column, ControlsFooter, Input, Label, Modal } from '@kocherga/frontkit';

import { useCommonHotkeys, useFocusOnFirstModalRender, useNotification } from '~/common/hooks';

import { Defaults } from './types';

interface Props {
  toggle: () => void;
  save: (params: {
    url: string;
    title: string;
    basename: string;
  }) => Promise<void>;
  defaults: Defaults;
}

const WideInput = styled(Input)`
  width: 100%;
`;

// TODO - formik
const InputModal: React.FC<Props> = ({ toggle, save, defaults }) => {
  const [acting, setActing] = useState(false);

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState(defaults.title);
  const [basename, setBasename] = useState(defaults.basename);
  const updateUrl = (e: React.FormEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  };
  const updateTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const updateBasename = (e: React.FormEvent<HTMLInputElement>) => {
    setBasename(e.currentTarget.value);
  };

  const notify = useNotification();

  const submit = useCallback(async () => {
    if (!url || !title || !basename) {
      return;
    }
    setActing(true);
    try {
      await save({ url, title, basename });
    } catch (e) {
      notify({ text: String(e), type: 'Error' });
    }
    setActing(false);
  }, [save, notify, url, title, basename]);

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({ onEnter: submit, onEscape: toggle });

  return (
    <Modal>
      <Modal.Header toggle={toggle}>Ссылка на страницу</Modal.Header>
      <Modal.Body {...hotkeys}>
        <Column stretch>
          <div>
            <Label>Прямая ссылка на картинку:</Label>
            <WideInput
              type="text"
              value={url}
              onChange={updateUrl}
              ref={focus}
              scale="big"
            />
          </div>
          <div>
            <Label>Заголовок:</Label>
            <WideInput type="text" value={title} onChange={updateTitle} />
          </div>
          <div>
            <Label>Название файла:</Label>
            <WideInput type="text" value={basename} onChange={updateBasename} />
          </div>
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button
            disabled={acting || !url.startsWith('http')}
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
