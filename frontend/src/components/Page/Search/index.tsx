import { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import useOnClickOutside from 'use-onclickoutside';

import { useLazyQuery } from '@apollo/client';

import { FloatingList } from '~/components';

import { SearchDocument } from './queries.generated';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

const isRunnableQuery = (query: string) => query !== '';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  const [runSearchQuery, queryResults] = useLazyQuery(SearchDocument, {
    variables: {
      input: {
        query,
      },
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (isRunnableQuery(query)) {
      runSearchQuery({
        variables: {
          input: {
            query,
          },
        },
      });
    }
  }, [runSearchQuery, query]);

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

  const searchData = isRunnableQuery(query) ? queryResults.data : undefined;

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
        expanded={Boolean(searchData)}
        ref={setPopperElement}
        style={styles.popper}
        attributes={attributes.popper || {}}
      >
        <SearchResults results={searchData} />
      </FloatingList>
    </div>
  );
};
