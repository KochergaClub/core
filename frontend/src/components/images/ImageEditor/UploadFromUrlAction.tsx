import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { ModalAction } from '~/components/DropdownMenu';

import {
    WagtailUploadImageFromUrlDocument, WagtailUploadImageFromUrlMutationVariables
} from './queries.generated';
import { Defaults, SetImageIdProps } from './types';
import { UploadFromUrlModal } from './UploadFromUrlModal';

type Props = SetImageIdProps & {
  defaults: Defaults;
};

const UploadFromUrlAction: React.FC<Props> = ({ setImageId, defaults }) => {
  const [uploadMutation] = useMutation(WagtailUploadImageFromUrlDocument);

  const submit = useCallback(
    async (input: WagtailUploadImageFromUrlMutationVariables['input']) => {
      const result = await uploadMutation({
        variables: {
          input,
        },
      });
      if (!result.data) {
        throw new Error('Upload failed'); // FIXME - show notification instead
      }
      await setImageId(result.data.result.image.id);
    },
    [uploadMutation, setImageId]
  );

  return (
    <ModalAction title="По ссылке">
      {({ close }) => (
        <UploadFromUrlModal close={close} save={submit} defaults={defaults} />
      )}
    </ModalAction>
  );
};

export default UploadFromUrlAction;
