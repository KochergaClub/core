type Props = React.HTMLAttributes<HTMLDivElement>;

// identical to Label, but without its cursor quirk
export const LabelDiv: React.FC<Props> = ({ className, ...rest }) => (
  <div
    className={`text-sm font-medium leading-tight text-gray-500 ${
      className || ''
    }`}
    {...rest}
  />
);
