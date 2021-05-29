import styled from 'styled-components';

export const CalendarItemContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 16px;
  font-size: 11px;
  z-index: 0; // force stacking context to make Progress z-index safe
`;

export const CalendarItemTitle = styled.div`
  flex: 1;
  overflow: hidden;
  line-height: 1;
`;

export const CalendarItemIcon = styled.div`
  line-height: 1;
  margin-right: 2px;
  margin-left: 2px;
`;
