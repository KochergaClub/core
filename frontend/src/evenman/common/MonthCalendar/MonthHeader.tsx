import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

const borderColor = colors.grey[200];

const Container = styled.div`
  display: flex;
  width: 100%;
  & > div {
    flex: 1;
    text-align: center;
    border-top: 1px solid ${borderColor};
    font-size: 0.8em;
    letter-spacing: 0.4px;
    font-weight: bold;
  }
  & > div + div {
    border-left: 1px solid ${borderColor};
  }
`;

const MonthHeader: React.FC = () => {
  return (
    <Container>
      {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map(weekday => (
        <div key={weekday}>{weekday}</div>
      ))}
    </Container>
  );
};

export default MonthHeader;
