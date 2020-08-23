import DropdownMenu, { Action } from '~/components/DropdownMenu';

import ChooseImageAction from './ChooseImageAction';
import { Defaults, SetImageIdProps } from './types';
import UploadFromUrlAction from './UploadFromUrlAction';

type Props = SetImageIdProps & {
  openFilePicker: () => void;
  defaults: Defaults;
};

const Controls: React.FC<Props> = ({
  openFilePicker,
  setImageId,
  defaults,
}) => {
  return (
    <DropdownMenu title="Выбрать" placement="bottom-start">
      <Action syncAct={openFilePicker}>Локальный файл</Action>
      <UploadFromUrlAction setImageId={setImageId} defaults={defaults} />
      <ChooseImageAction setImageId={setImageId} />
    </DropdownMenu>
  );
};

export default Controls;
