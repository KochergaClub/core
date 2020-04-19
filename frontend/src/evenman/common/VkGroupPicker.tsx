import { useEvenmanVkGroupsQuery } from './queries.generated';

import LoadingPicker from './LoadingPicker';

interface Props {
  value: string;
  setValue: (v?: string) => void;
}

const VkGroupPicker: React.FC<Props> = props => {
  const { data, loading, error } = useEvenmanVkGroupsQuery();

  return (
    <LoadingPicker
      placeholder="Выбрать ВК-группу"
      value={props.value}
      setValue={props.setValue}
      loading={loading}
      error={Boolean(error)}
      values={data && data.vkGroups.map(v => v.name)}
    />
  );
};

export default VkGroupPicker;
