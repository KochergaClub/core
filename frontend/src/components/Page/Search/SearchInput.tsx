import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

const placeholderClasses = 'uppercase tracking-widest text-xs';
const paddings = 'py-1 pl-7 pr-2'; // positions main content after SearchIcon

const Placeholder: React.FC = ({ children }) => (
  <div
    className={clsx(
      paddings,
      placeholderClasses,
      'leading-5 text-white cursor-pointer'
    )}
  >
    {children}
  </div>
);

const SearchIcon: React.FC<{ active?: boolean }> = ({ active }) => (
  <FaSearch
    className={clsx(
      'absolute left-1.5 top-1.5 cursor-pointer',
      active ? 'text-gray-400' : 'text-white'
    )}
  />
);

interface Props {
  active: boolean;
  start: () => void;
  stop: () => void;
  query: string;
  setQuery: (query: string) => void;
}

export const SearchInput: React.FC<Props> = ({
  active,
  start,
  query,
  setQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active) {
      inputRef.current?.focus();
    }
  }, [active]);

  const onChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => setQuery(e.currentTarget.value),
    [setQuery]
  );

  const placeholderText = 'Поиск';

  return (
    <div className="relative" onClick={active ? undefined : start}>
      <SearchIcon active={active || undefined} />
      {active ? (
        <input
          type="text"
          className={clsx(
            'rounded',
            'border border-transparent bg-transparent w-20 transition-width',
            'focus:outline-none focus:border-accent-500 focus:bg-white focus:w-48',
            paddings
          )}
          value={query}
          placeholder={placeholderText}
          onChange={onChange}
          ref={inputRef}
        />
      ) : (
        <Placeholder>{placeholderText}</Placeholder>
      )}
    </div>
  );
};
