import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

import { Member } from '~/staff/types';
import Picker from '~/staff/components/Picker';
import { useAPI, useExpandable } from '~/common/hooks';

import { nightColor } from '../constants';
import { ScheduleContext } from '../contexts';
import { Shift } from '../types';

import { updateShift } from '../api';

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

const ShiftBox = ({ shift }: { shift: Shift }) => {
  const { editing, setShift } = useContext(ScheduleContext);
  const api = useAPI();

  const { flipExpand, unexpand, ref, expanded } = useExpandable();

  const { date, shift: shiftType } = shift;

  const updateShiftCb = useCallback(
    async (data: { watchman: Member | null; is_night: boolean }) => {
      await updateShift(api, {
        date,
        shift: shiftType,
        watchman: data.watchman,
        is_night: data.is_night,
      });

      setShift({
        ...shift,
        ...data,
      });
      unexpand();
    },
    [api, date, shiftType, shift, setShift, unexpand]
  );

  const pickMember = async (m: Member) => {
    await updateShiftCb({ watchman: m, is_night: false });
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
        <InnerShiftBox shift={shift} editing={editing} />
      </div>
      {expanded && (
        <Picker
          pickedMember={pickMember}
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

export default ShiftBox;
