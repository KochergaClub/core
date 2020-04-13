import { useEvenmanTimepadCategoriesQuery } from './queries.generated';

import LabeledLoadingPicker from './LabeledLoadingPicker';

interface Props {
  code?: string;
  setCode: (v?: string) => void;
}

const VkGroupPicker: React.FC<Props> = props => {
  const { data, loading, error } = useEvenmanTimepadCategoriesQuery();

  const value = data?.timepadCategories.find(el => el.code === props.code);

  return (
    <LabeledLoadingPicker
      placeholder="Указать timepad-категорию"
      value={value && { value: value.code, label: value.name }}
      setValue={v => props.setCode(v?.value)}
      loading={loading}
      error={Boolean(error)}
      values={
        data &&
        data.timepadCategories.map(v => ({ value: v.code, label: v.name }))
      }
    />
  );
};

export default VkGroupPicker;
