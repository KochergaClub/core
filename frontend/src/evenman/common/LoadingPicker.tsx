import LabeledLoadingPicker from './LabeledLoadingPicker';

interface Props {
  value: string;
  values?: string[];
  placeholder: string;
  setValue: (v?: string) => void;
  loading?: boolean;
  error?: boolean;
}

const LoadingPicker: React.FC<Props> = props => {
  const value2option = (g: string | undefined) => {
    if (g === undefined || g === '') {
      return {
        value: '',
        label: 'Ø',
      };
    } else {
      return {
        value: g,
        label: g,
      };
    }
  };

  return (
    <LabeledLoadingPicker
      {...props}
      value={value2option(props.value)}
      values={props.values?.map(value2option)}
      setValue={v => props.setValue(v?.value)}
    />
  );
};

export default LoadingPicker;
