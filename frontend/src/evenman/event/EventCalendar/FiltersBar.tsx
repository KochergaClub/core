import 'react-toggle/style.css';

import React from 'react';
import Toggle from 'react-toggle';

import { Row } from '~/frontkit';

import UnknownEventsDropdown from '../UnknownEventsDropdown';
import { Action, setEventType, setHideAnnounced, State } from './filters';

interface Props {
  filters: State;
  dispatch: (a: Action) => void;
}

const FiltersBar: React.FC<Props> = ({ filters, dispatch }) => {
  return (
    <Row centered>
      <div style={{ flex: 1, marginLeft: 16 }}>
        <UnknownEventsDropdown />
      </div>
      <Row vCentered>
        <Toggle
          checked={filters.eventType === undefined}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            dispatch(
              setEventType(e.currentTarget.checked ? undefined : 'public')
            )
          }
        />
        <span>Приватные</span>
        <Toggle
          checked={!filters.hideAnnounced}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            dispatch(setHideAnnounced(!e.currentTarget.checked))
          }
        />
        <span>Анонсированные</span>
      </Row>
      <div style={{ flex: 1 }}>&nbsp;</div>
    </Row>
  );
};

export default React.memo(FiltersBar);
