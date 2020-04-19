import { ReactSelectCreatable } from '../components/ui';

interface Option {
  value: string;
  label: string;
}

interface Props {
  value?: Option;
  values?: Option[];
  placeholder: string;
  setValue: (v?: Option) => void;
  loading?: boolean;
  error?: boolean;
}

const LoadingPicker: React.FC<Props> = props => {
  if (props.loading) {
    return <ReactSelectCreatable placeholder={props.placeholder} isDisabled />;
  }
  if (props.error || !props.values) {
    return <ReactSelectCreatable placeholder="Ошибка загрузки" isDisabled />;
  }

  if (
    props.value &&
    props.values.findIndex(v => v.value === props.value?.value) === -1
  ) {
    props.values.push(props.value);
  }

  return (
    <ReactSelectCreatable
      placeholder={props.placeholder}
      options={props.values || { value: '', label: 'Ø' }}
      value={props.value}
      onChange={(option?: Option) => {
        props.setValue(option);
      }}
    />
  );
};

export default LoadingPicker;
