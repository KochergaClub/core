import styled from 'styled-components';

import { colors } from '~/frontkit';

const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${colors.grey[200]};

  & > div {
    flex: 1;
    text-align: center;
    font-size: 0.8em;
    letter-spacing: 0.08em;
    font-weight: bold;
  }
  & > div + div {
    border-left: 1px solid ${colors.grey[200]};
  }
`;

const MonthHeader = () => (
  <Container>
    {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((weekday) => (
      <div key={weekday}>{weekday}</div>
    ))}
  </Container>
);

export default MonthHeader;
