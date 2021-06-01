import clsx from 'clsx';

interface Props {
  src?: string;
  src_x2?: string;
  empty: () => JSX.Element;
  displayOverlay?: boolean;
}

export const ImageBox: React.FC<Props> = ({
  src,
  src_x2,
  empty,
  displayOverlay,
  children,
}) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          'bg-white', // allows to darken transparent images on hover
          'transition duration-300',
          displayOverlay && 'filter brightness-50'
        )}
      >
        {src ? (
          <img
            className="block"
            src={src}
            srcSet={src_x2 ? `${src}, ${src_x2} 2x` : undefined}
          />
        ) : (
          empty()
        )}
      </div>
      <div className={clsx('absolute inset-0', displayOverlay || 'opacity-0')}>
        {children}
      </div>
    </div>
  );
};
