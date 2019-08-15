import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Link from 'next/link';

import { FaEdit } from 'react-icons/fa';

import { A, Row, Button } from '@kocherga/frontkit';

import { usePermissions } from '~/common/hooks';
import Card, { CardList } from '~/components/Card';

import { askForWatchmanGrade } from '../actions';
import {
  selectWatchmen,
  selectGrades,
  selectAskingForGradeWatchman,
} from '../selectors';
import { Watchman } from '../types';

import PickGradeModal from './PickGradeModal';

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
        <div>Грейд: {grade ? grade.code : 'нет'}</div>
        {canManage && (
          <Button
            small
            onClick={editGradeCb}
            style={{ verticalAlign: 'middle' }}
          >
            <FaEdit /> Редактировать
          </Button>
        )}
      </Row>
    </Card>
  );
};

const WatchmenList = () => {
  const watchmen = useSelector(selectWatchmen);
  const askingForGradeWatchman = useSelector(selectAskingForGradeWatchman);
  return (
    <div>
      <h2>Админы</h2>
      <CardList>
        {watchmen.map(watchman => (
          <WatchmanItem watchman={watchman} key={watchman.id} />
        ))}
        {askingForGradeWatchman && <PickGradeModal />}
      </CardList>
    </div>
  );
};

export default WatchmenList;
