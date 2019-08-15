import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

import WatchmanPicker from './WatchmanPicker';

import { useAPI, useExpandable } from '~/common/hooks';
import { State } from '~/redux/store';

import { nightColor } from '../constants';
import { Shift, Watchman } from '../types';

import { updateShift as updateShiftApiCall } from '../api';
import { updateShift } from '../actions';
import { selectEditing } from '../selectors';

const Container = styled.div<{ editing: boolean }>`
  position: relative;
  cursor: ${props => (props.editing ? 'pointer' : 'auto')};
`;

const Box = styled.div`
  height: 2em;
  line-height: 2em;
  text-align: center;
  border: 1px solid white;
`;

const EmptyBox = styled(Box)`
  background-color: ${colors.grey[100]};
`;

const NightBoxContainer = styled(Box)`
  background-color: ${nightColor};
  color: white;
`;

const NightBox = () => <NightBoxContainer>Ночь</NightBoxContainer>;

const WatchmanLink = styled.a`
  color: black;
  text-decoration: none;
`;

const InnerShiftBox = ({
  shift,
  editing,
}: {
  shift: Shift;
  editing: boolean;
}) => {
  if (shift.is_night) {
    return <NightBox />;
  }
  if (!shift.watchman) {
    return <EmptyBox />;
  }

  let content = <>{shift.watchman.short_name}</>;
  if (!editing) {
    content = (
      <WatchmanLink href={`/team/staff/${shift.watchman.id}`}>
        {content}
      </WatchmanLink>
    );
  }

  return <Box style={{ backgroundColor: shift.watchman.color }}>{content}</Box>;
};

interface OwnProps {
  shift: Shift;
}

interface StateProps {
  editing: boolean;
}

interface DispatchProps {
  updateShift: (shift: Shift) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const ShiftBox = (props: Props) => {
  const { editing } = props;
  const api = useAPI();

  const { flipExpand, unexpand, ref, expanded } = useExpandable();

  const { date, shift: shiftType } = props.shift;

  const updateShiftCb = useCallback(
    async (data: { watchman: Watchman | null; is_night: boolean }) => {
      await updateShiftApiCall(api, {
        date,
        shift: shiftType,
        watchman: data.watchman,
        is_night: data.is_night,
      });

      props.updateShift({
        ...props.shift,
        ...data,
      });
      unexpand();
    },
    [api, date, shiftType, props.shift, props.updateShift, unexpand]
  );

  const pickWatchman = async (watchman: Watchman) => {
    await updateShiftCb({ watchman, is_night: false });
  };

  const pickExtra = async (text: string) => {
    await updateShiftCb({
      watchman: null,
      is_night: text === 'Ночь',
    });
  };

  return (
    <Container ref={ref} editing={editing}>
      <div onClick={editing ? flipExpand : undefined}>
        <InnerShiftBox shift={props.shift} editing={editing} />
      </div>
      {expanded && (
        <WatchmanPicker
          pickedWatchman={pickWatchman}
          pickedExtra={pickExtra}
          extra={[
            { text: 'Ночь', color: nightColor, dark: true },
            { text: 'Очистить', color: 'white', dark: false },
          ]}
        />
      )}
    </Container>
  );
};

export default connect(
  (state: State) => ({ editing: selectEditing(state) }),
  { updateShift }
)(ShiftBox);
