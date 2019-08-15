import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Column, Row, Modal } from '@kocherga/frontkit';

import { pickWatchmanGrade, stopAskingForWatchmanGrade } from '../actions';
import {
  selectGrades,
  selectAskingForGradeWatchman,
  selectPickingWatchmanGrade,
} from '../selectors';
import { Grade } from '../types';

const GradeItem = ({ grade }: { grade: Grade }) => {
  const dispatch = useDispatch();

  const watchman = useSelector(selectAskingForGradeWatchman);
  const pickingGradeId = useSelector(selectPickingWatchmanGrade);

  const pickGrade = useCallback(async () => {
    if (!watchman) {
      return;
    }
    await dispatch(pickWatchmanGrade(watchman, grade));
  }, [dispatch, pickWatchmanGrade, watchman, grade]);

  if (!watchman) {
    throw new Error('Redux logic error');
  }

  return (
    <Button
      onClick={pickGrade}
      loading={pickingGradeId === grade.id}
      disabled={Boolean(pickingGradeId)}
      kind={watchman.grade_id === grade.id ? 'primary' : undefined}
    >
      <Row centered>
        <div>{grade.code}</div>
        <div>(x{grade.multiplier})</div>
      </Row>
    </Button>
  );
};

const PickGradeModal = () => {
  const dispatch = useDispatch();
  const watchman = useSelector(selectAskingForGradeWatchman);
  const grades = useSelector(selectGrades);

  if (!watchman) {
    return null;
  }

  const closeCb = useCallback(() => {
    dispatch(stopAskingForWatchmanGrade());
  }, [dispatch, stopAskingForWatchmanGrade]);

  return (
    <Modal isOpen={true}>
      <Modal.Header toggle={closeCb}>
        {watchman.short_name}. Выбрать грейд:
      </Modal.Header>
      <Modal.Body>
        <Column stretch>
          {grades.map(grade => (
            <GradeItem grade={grade} key={grade.id} />
          ))}
        </Column>
      </Modal.Body>
    </Modal>
  );
};

export default PickGradeModal;
