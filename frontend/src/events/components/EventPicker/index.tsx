import { format, parseISO } from 'date-fns';
import React, { CSSProperties, useCallback } from 'react';
import { ValueType } from 'react-select';
import Async from 'react-select/async';

import { useApolloClient } from '@apollo/client';

import {
    Event_ForPickerFragment as Event, SearchEventsForPickerDocument
} from './queries.generated';

interface OptionType {
  value: Event;
  label: string;
}

type Props = {
  onChange: (event: Event) => void;
};

export const EventPicker: React.FC<Props> = ({ onChange }) => {
  const apolloClient = useApolloClient();

  const loadEvents = useCallback(
    async (inputValue: string, callback: (options: OptionType[]) => void) => {
      try {
        const { data } = await apolloClient.query({
          query: SearchEventsForPickerDocument,
          variables: { search: inputValue },
        });
        if (!data?.events) {
          return []; // TODO - proper error handling
        }

        callback(
          data.events.nodes.map((event) => {
            const label = `${event.title} ${format(
              parseISO(event.start),
              'yyyy-MM-dd'
            )}`;
            return {
              value: event,
              label,
            };
          })
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    [apolloClient]
  );

  const onSelectChange = useCallback(
    (v: ValueType<OptionType, false>) => {
      if (!v) {
        return;
      }
      onChange(v.value);
    },
    [onChange]
  );

  return (
    <Async
      loadOptions={loadEvents}
      onChange={onSelectChange}
      menuPortalTarget={
        typeof document === 'undefined' ? undefined : document.body // document can be undefined in SSR
      }
      styles={{
        menuPortal: (provided: CSSProperties) => ({
          ...provided,
          zIndex: 1100,
        }),
        container: (provided: CSSProperties) => ({
          ...provided,
          width: '100%',
        }),
      }}
    />
  );
};
