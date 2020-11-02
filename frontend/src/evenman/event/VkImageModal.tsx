import { format, parseISO } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { useAPI, useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { Button, Column, ControlsFooter, Input, Label, Modal } from '~/frontkit';
import { state2link } from '~/image-templater/utils';

import { EvenmanEvent_DetailsFragment } from './queries.generated';

const WideInput = styled(Input)`
  width: 100%;
`;

interface Props {
  event: EvenmanEvent_DetailsFragment;
  close: () => void;
  onSave: (image_id: string) => Promise<unknown>;
}

//test
const VkImageModal: React.FC<Props> = ({ event, close, onSave }) => {
  const api = useAPI();

  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState(event.title);
  const [header, setHeader] = useState('');

  const config = useMemo(() => {
    const date = format(parseISO(event.start), 'yyyy-MM-dd');
    const time = format(parseISO(event.start), 'HH:mm');

    return {
      date,
      time,
      title,
      header,
      background_image: event.imageForVkBackground?.url || '',
      realm: event.realm,
    };
  }, [event.start, title, header, event.imageForVkBackground, event.realm]);

  const buildLink = useCallback(
    (type: 'html' | 'png') =>
      state2link({
        name: 'vk-image',
        type,
        state: config,
      }),
    [config]
  );

  const save = useCallback(async () => {
    setSaving(true);
    const response = await fetch(buildLink('png'));
    if (!response.ok) {
      throw new Error("can't fetch image");
    }
    const blob = await response.blob();

    const imageTitle = `[VK] ${config.date} ${event.title}`;

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('title', imageTitle);

    const result = await api.call('wagtail/upload_image', 'POST', formData, {
      stringifyPayload: false,
    });
    const image_id = result.id;
    await onSave(image_id);

    close();
  }, [api, buildLink, onSave, close, event.title, config.date]);

  const updateTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }, []);

  const updateHeader = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader(e.currentTarget.value);
  }, []);

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({ onEnter: save, onEscape: close });

  const iframeUrl = state2link({
    name: 'vk-image',
    type: 'html',
    state: config,
  });

  return (
    <Modal>
      <Modal.Header close={close}>Картинка для ВК</Modal.Header>
      <Modal.Body {...hotkeys}>
        <Column stretch>
          <div>
            <Label>Заголовок</Label>
            <WideInput
              type="text"
              value={header}
              onChange={updateHeader}
              disabled={saving}
            />
          </div>
          <div>
            <Label>Название</Label>
            <WideInput
              type="text"
              value={title}
              onChange={updateTitle}
              ref={focus}
              disabled={saving}
            />
          </div>
          <iframe
            src={iframeUrl}
            style={{ width: 550, height: 350, border: 0 }}
          />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button
            onClick={save}
            kind="primary"
            loading={saving}
            disabled={saving}
          >
            Сохранить
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default VkImageModal;
