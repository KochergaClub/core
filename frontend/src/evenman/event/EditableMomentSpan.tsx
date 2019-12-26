import React, { useState, useCallback } from 'react';

import moment from 'moment';

import { A } from '@kocherga/frontkit';

import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

const EditableMomentSpan = ({
  m,
  onChange,
}: {
  m: moment.Moment;
  onChange: (m: moment.Moment) => void;
}) => {
  const [focused, setFocused] = useState(false);

  const onDateChange = useCallback(
    (newDate: moment.Moment | null) => {
      if (!newDate) {
        return;
      }
      const newMoment = newDate.set({
        hour: m.hour(),
        minute: m.minute(),
      });
      onChange(newMoment);
    },
    [m, onChange]
  );

  const onFocusChange = useCallback(
    ({ focused }: { focused: boolean | null }) => setFocused(Boolean(focused)),
    []
  );

  const onExpand = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setFocused(true);
    },
    [setFocused]
  );

  return (
    <span>
      {focused ? (
        <SingleDatePicker
          id="event-date-picker"
          date={m}
          focused={focused}
          onDateChange={onDateChange}
          onFocusChange={onFocusChange}
        />
      ) : (
        <A href="#" onClick={onExpand}>
          <b>{m.format('ddd').toUpperCase()}</b> {m.format('D MMMM')}
        </A>
      )}
      , {m.format('HH:mm')}
      {' ('}
      {m.fromNow()}
      {')'}
    </span>
  );
};

export default EditableMomentSpan;
