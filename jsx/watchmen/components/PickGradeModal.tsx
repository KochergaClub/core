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

  return (
    <Row spaced>
      <Row>
        <div>{grade.code}</div>
        <div>({grade.multiplier})</div>
      </Row>
      <Button
        small
        onClick={pickGrade}
        loading={pickingGradeId === grade.id}
        disabled={Boolean(pickingGradeId)}
      >
        выбрать
      </Button>
    </Row>
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
        Грейд для: {watchman.short_name}
      </Modal.Header>
      <Modal.Body>
        <Column gutter={10}>
          {grades.map(grade => (
            <GradeItem grade={grade} key={grade.id} />
          ))}
        </Column>
      </Modal.Body>
    </Modal>
  );
};

export default PickGradeModal;
