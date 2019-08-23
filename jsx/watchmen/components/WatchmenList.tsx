import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Link from 'next/link';

import { FaEdit } from 'react-icons/fa';

import { A, Row, Button, Label } from '@kocherga/frontkit';

import { usePermissions } from '~/common/hooks';
import Card, { CardList } from '~/components/Card';
import AsyncButton from '~/components/AsyncButton';

import { askForWatchmanGrade, setWatchmanPriority } from '../actions';
import {
  selectWatchmen,
  selectGrades,
  selectAskingForGradeWatchman,
} from '../selectors';
import { Watchman } from '../types';

import PickGradeModal from './PickGradeModal';
import AddWatchman from './AddWatchman';

const priority2name: { [k: number]: string } = {
  1: 'Регулярный админ',
  2: 'Эпизодический админ',
  3: 'Не админ',
};

const FixedRow = styled(Row)`
  align-items: center;
`;

const WatchmanPriorityButton: React.FC<{
  watchman: Watchman;
  priority: number;
}> = ({ watchman, priority, children }) => {
  const dispatch = useDispatch();

  const cb = useCallback(async () => {
    await dispatch(setWatchmanPriority(watchman, priority));
  }, [watchman, priority, setWatchmanPriority]);

  if (watchman.priority === priority) {
    return null;
  }

  return (
    <AsyncButton small act={cb}>
      {children}
    </AsyncButton>
  );
};

const WatchmanItem = ({ watchman }: { watchman: Watchman }) => {
  const grades = useSelector(selectGrades);
  const dispatch = useDispatch();
  const [canManage] = usePermissions(['watchmen.manage']);

  const grade = grades.find(grade => grade.id === watchman.grade_id);

  const editGradeCb = useCallback(() => {
    dispatch(askForWatchmanGrade(watchman));
  }, [dispatch, askForWatchmanGrade, watchman]);

  return (
    <Card>
      <strong>
        <Link
          href="/team/staff/[id]"
          as={`/team/staff/${watchman.member_id}`}
          passHref
        >
          <A>{watchman.short_name}</A>
        </Link>
      </strong>
      <Row>
        <FixedRow>
          <Label>Грейд:</Label> <strong>{grade ? grade.code : 'нет'}</strong>
        </FixedRow>
        {canManage && (
          <Button small onClick={editGradeCb}>
            <FaEdit /> Редактировать
          </Button>
        )}
      </Row>
      <Row>
        <FixedRow gutter={8}>
          <Label>Приоритет:</Label>
          <div>{priority2name[watchman.priority]}</div>
        </FixedRow>
        {canManage && (
          <Row>
            <WatchmanPriorityButton watchman={watchman} priority={1}>
              Сделать регулярным
            </WatchmanPriorityButton>
            <WatchmanPriorityButton watchman={watchman} priority={2}>
              Сделать эпизодическим
            </WatchmanPriorityButton>
            <WatchmanPriorityButton watchman={watchman} priority={3}>
              Не админит никогда
            </WatchmanPriorityButton>
          </Row>
        )}
      </Row>
    </Card>
  );
};

const WatchmenSublist: React.FC<{ watchmen: Watchman[] }> = ({ watchmen }) => (
  <CardList>
    {watchmen.map(watchman => (
      <WatchmanItem watchman={watchman} key={watchman.id} />
    ))}
  </CardList>
);

const WatchmenList = () => {
  const watchmen = useSelector(selectWatchmen);
  const askingForGradeWatchman = useSelector(selectAskingForGradeWatchman);
  const [canManage] = usePermissions(['watchmen.manage']);

  const firstPriorityWatchmen = watchmen.filter(w => w.priority === 1);
  const secondPriorityWatchmen = watchmen.filter(w => w.priority === 2);
  const thirdPriorityWatchmen = watchmen.filter(w => w.priority === 3);

  return (
    <div>
      <Row>
        <h2>Админы</h2>
        {canManage && <AddWatchman />}
      </Row>
      <h3>Регулярные админы</h3>
      <WatchmenSublist watchmen={firstPriorityWatchmen} />
      <h3>Эпизодические админы</h3>
      <WatchmenSublist watchmen={secondPriorityWatchmen} />
      <h3>Не админы</h3>
      <WatchmenSublist watchmen={thirdPriorityWatchmen} />
      {askingForGradeWatchman && <PickGradeModal />}
    </div>
  );
};

export default WatchmenList;
