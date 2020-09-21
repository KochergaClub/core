import { useQuery } from '@apollo/client';

import LoadingPicker from './LoadingPicker';
import { EvenmanVkGroupsDocument } from './queries.generated';

interface Props {
  value: string;
  setValue: (v?: string) => void;
}

const VkGroupPicker: React.FC<Props> = (props) => {
  const { data, loading, error } = useQuery(EvenmanVkGroupsDocument);

  return (
    <LoadingPicker
      placeholder="Выбрать ВК-группу"
      value={props.value}
      setValue={props.setValue}
      loading={loading}
      error={Boolean(error)}
      values={data && data.vkGroups.map((v) => v.name)}
    />
  );
};

export default VkGroupPicker;
