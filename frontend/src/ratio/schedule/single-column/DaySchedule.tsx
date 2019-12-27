import styled from 'styled-components';

import { HR } from '@kocherga/frontkit';

import { TrainingDayFragment } from '../../queries.generated';

import Activity from './Activity';
import EditDayInAdmin from '../EditDayInAdmin';

const DayFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #666;

  @media print {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

const DayFooterBranding = styled.div`
  display: flex;
  align-items: center;
  font-family: Intro;

  img {
    height: 32px;
    margin-right: 8px;
  }
`;

const DayContainer = styled.section`
  page-break-after: always;
  text-align: center;

  @media screen {
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

const DayHeader = styled.header`
  font-size: 32px;
  font-weight: bold;
`;

interface Props {
  index: number;
  day_schedule: TrainingDayFragment;
  long_name: string;
}

const DaySchedule: React.FC<Props> = ({ day_schedule, long_name, index }) => (
  <DayContainer>
    <DayHeader>День {index}</DayHeader>
    <EditDayInAdmin day_schedule={day_schedule} />
    <HR />

    {day_schedule.activities.map((activity, i) => (
      <Activity key={i} activity={activity} />
    ))}

    <DayFooter>
      <DayFooterBranding>
        <img src="/static/logo.png" />
        <div>Кочерга</div>
      </DayFooterBranding>
      <div>{long_name}</div>
    </DayFooter>
  </DayContainer>
);

export default DaySchedule;
