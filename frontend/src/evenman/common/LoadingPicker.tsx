import { ReactSelectCreatable } from '../components/ui';

interface Props {
  value: string;
  values?: string[];
  placeholder: string;
  setValue: (v?: string) => void;
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

  if (props.value && props.values.indexOf(props.value) === -1) {
    props.values.push(props.value);
  }

  const value2option = (g: string | null | undefined) => {
    if (g === null || g === undefined || g === '') {
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
    <ReactSelectCreatable
      placeholder={props.placeholder}
      options={props.values.map(g => value2option(g))}
      value={value2option(props.value)}
      onChange={(option: any) => {
        props.setValue(option ? (option.value as string) : undefined);
      }}
    />
  );
};

export default LoadingPicker;
