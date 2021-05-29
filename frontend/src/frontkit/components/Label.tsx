type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<Props> = ({ className, ...rest }) => (
  <label
    className={`block text-sm font-medium leading-tight text-gray-500 ${
      className || ''
    }`}
    {...rest}
  />
);
