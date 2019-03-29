import React, { useContext, useState, useCallback } from 'react';
import styled from 'styled-components';

import { ScheduleContext } from '../contexts';
import { ScheduleItem } from '../types';
import Picker from './Picker';

const Container = styled.div`
  position: relative;
`;

const Box = styled.div`
  height: 2em;
  line-height: 2em;
  vertical-align: center;
  text-align: center;
  border: 1px solid #ddd;
  margin: 4px;
`;

const NightBoxContainer = styled(Box)``;

const NightBox = () => <NightBoxContainer>Ночь</NightBoxContainer>;

const InnerShiftBox = ({ item }: { item?: ScheduleItem }) => {
  if (!item) {
    return <Box />; // TODO - EmptyItem
  }
  if (item.watchman === 'Ночь') {
    return <NightBox />;
  }
  return <Box style={{ backgroundColor: item.color }}>{item.watchman}</Box>;
};

const ShiftBox = ({ item }: { item?: ScheduleItem }) => {
  const { editable } = useContext(ScheduleContext);
  const [expanded, setExpanded] = useState(false);

  const clicked = useCallback(
    () => {
      setExpanded(!expanded);
    },
    [expanded, editable]
  );
  return (
    <Container>
      <div onClick={editable && clicked}>
        <InnerShiftBox item={item} />
      </div>
      {expanded && <Picker date={item.date} shift={item.shift} />}
    </Container>
  );
};

export default ShiftBox;
