import styled from 'styled-components';

export const Line = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > * + * {
    margin-left: 5px;
  }
`;

// FIXME - this css is pretty specific to RoomPicker
export const ButtonLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > button {
    flex: 1;
    margin-bottom: 6px;
  }
  & > * + * {
    margin-left: 4px;
  }
  @media (max-width: 440px) {
    & > button {
      flex: 0 1 48%;
      margin-left: 0;
    }
  }
  justify-content: space-between;
`;

export const Row = styled.div`
  display: flex;

  & > * + * {
  margin-left: 5px;
  }
`;

export const SmallColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 450px;
`;
