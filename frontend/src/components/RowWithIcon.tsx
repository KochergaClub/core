import Tippy from '@tippyjs/react';

interface Props {
  icon: React.ElementType;
  hint: string;
}

export const RowWithIcon: React.FC<Props> = ({ icon, hint, children }) => {
  const Icon = icon;
  // Note that icon needs to be wrapped until https://github.com/react-icons/react-icons/issues/336 is fixed.
  return (
    <div className="flex items-center space-x-3">
      <Tippy content={hint}>
        <div className="flex justify-center items-center text-gray-400">
          <Icon size={24} />
        </div>
      </Tippy>
      <div>{children}</div>
    </div>
  );
};
