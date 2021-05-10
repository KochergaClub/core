import styled from 'styled-components';

export const CalendarItemContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 16px;
  font-size: 11px;
`;

export const CalendarItemTitle = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  z-index: 1;
  line-height: 1;
`;

export const CalendarItemIcon = styled.div`
  line-height: 1;
  z-index: 1;
  margin-right: 2px;
  margin-left: 2px;
`;
