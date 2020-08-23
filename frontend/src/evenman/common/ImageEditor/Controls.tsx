import { useCallback, useState } from 'react';

import { Button } from '@kocherga/frontkit';

import InputModal from './InputModal';
import { useWagtailUploadImageFromUrlMutation } from './queries.generated';
import { Defaults } from './types';

interface SetImageIdProps {
  setImageId: (id: string) => Promise<unknown>;
  defaults: Defaults;
}

const UploadFromUrlButton: React.FC<SetImageIdProps> = ({
  setImageId,
  defaults,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [uploadMutation] = useWagtailUploadImageFromUrlMutation();

  const toggleModal = useCallback(() => {
    setModalIsOpen(!modalIsOpen);
  }, [modalIsOpen]);

  const submit = useCallback(
    async (params: { url: string; title: string; basename: string }) => {
      const result = await uploadMutation({
        variables: {
          input: params,
        },
      });
      if (!result.data) {
        throw new Error('Upload failed'); // FIXME - show notification instead
      }
      await setImageId(result.data.result.image.id);
      setModalIsOpen(false);
    },
    [uploadMutation, setImageId]
  );

  return (
    <>
      <Button
        size="small"
        onClick={(e) => {
          e.preventDefault();
          toggleModal();
        }}
      >
        Добавить по ссылке
      </Button>
      {modalIsOpen && (
        <InputModal toggle={toggleModal} save={submit} defaults={defaults} />
      )}
    </>
  );
};

type Props = SetImageIdProps & {
  openFilePicker: () => void;
  defaults?: Defaults;
};

const Controls: React.FC<Props> = ({
  openFilePicker,
  setImageId,
  defaults,
}) => {
  return (
    <div>
      <Button size="small" onClick={openFilePicker}>
        Выбрать файл
      </Button>
      <UploadFromUrlButton setImageId={setImageId} defaults={defaults} />
    </div>
  );
};

export default Controls;
