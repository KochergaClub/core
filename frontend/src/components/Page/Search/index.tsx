import { useState, useRef, useCallback } from 'react';

import { usePopper } from 'react-popper';

import SearchResults from './SearchResults';
import SearchInput from './SearchInput';
import useOnClickOutside from 'use-onclickoutside';

import { useWagtailSearchQuery } from './queries.generated';
import { FloatingList } from '~/components';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const queryResults = useWagtailSearchQuery({
    variables: {
      input: {
        query,
      },
    },
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

  const blur = useCallback(() => setQuery(''), []);

  useOnClickOutside(containerRef, blur);

  return (
    <div ref={containerRef}>
      <div ref={setReferenceElement}>
        <SearchInput query={query} setQuery={setQuery} />
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
