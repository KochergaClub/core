type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

// Fonts are similar to Label, but uses different colors;
// useful on colored backgrounds.
export const LabelA: React.FC<Props> = ({ className, ...rest }) => (
  <a
    className={`text-sm font-medium text-primary-300 no-underline hover:underline ${
      className || ''
    }`}
    {...rest}
  />
);
