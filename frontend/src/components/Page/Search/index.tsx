import { useState, useRef, useCallback } from 'react';

import { usePopper } from 'react-popper';

import SearchResults from './SearchResults';
import SearchInput from './SearchInput';
import useOnClickOutside from 'use-onclickoutside';

import { useSearchQuery } from './queries.generated';
import { FloatingList } from '~/components';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const queryResults = useSearchQuery({
    variables: {
      input: {
        query,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);

  const start = () => {
    setActive(true);
  };

  const stop = () => {
    setActive(false);
    setQuery('');
  };

  useOnClickOutside(containerRef, stop);

  return (
    <div ref={containerRef}>
      <div ref={setReferenceElement}>
        <SearchInput
          query={query}
          setQuery={setQuery}
          active={active}
          start={start}
          stop={stop}
        />
      </div>
      <FloatingList
        expanded={Boolean(queryResults.data)}
        ref={setPopperElement}
        style={styles.popper}
        attributes={attributes.popper}
      >
        <SearchResults results={queryResults.data} />
      </FloatingList>
    </div>
  );
};

export default Search;
