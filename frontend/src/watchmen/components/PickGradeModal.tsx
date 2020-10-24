import { useCallback, useState } from 'react';

import { useQuery } from '@apollo/client';
import { Column, Modal, Row } from '~/frontkit';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { ApolloQueryResults, AsyncButton } from '~/components';

import { GradeFragment, WatchmanFragment, WatchmenGradesListDocument } from '../queries.generated';

interface GradeItemProps {
  grade: GradeFragment;
  highlight?: boolean;
  disabled?: boolean;
  pick: () => Promise<void>;
}

const GradeItem: React.FC<GradeItemProps> = ({
  grade,
  pick,
  highlight,
  disabled,
}) => {
  return (
    <AsyncButton
      act={pick}
      disabled={disabled}
      kind={highlight ? 'primary' : undefined}
    >
      <Row centered>
        <div>{grade.code}</div>
        <div>(x{grade.multiplier})</div>
      </Row>
    </AsyncButton>
  );
};

interface Props {
  watchman: WatchmanFragment;
  close: () => void;
  pick: (grade: GradeFragment) => Promise<void>;
}

const PickGradeModal: React.FC<Props> = ({ watchman, close, pick }) => {
  const [acting, setActing] = useState(false);
  const gradesQueryResults = useQuery(WatchmenGradesListDocument);

  const focus = useFocusOnFirstModalRender();
  const hotkeys = useCommonHotkeys({
    onEscape: close,
  });

  const pickCb = useCallback(
    async (grade: GradeFragment) => {
      setActing(true);
      await pick(grade);
    },
    [pick]
  );

  return (
    <Modal>
      <Modal.Header toggle={close}>
        {watchman.member.short_name}. Выбрать грейд:
      </Modal.Header>
      <Modal.Body ref={focus} {...hotkeys}>
        <ApolloQueryResults {...gradesQueryResults}>
          {({ data: { grades } }) => (
            <Column stretch>
              {grades.map(grade => (
                <GradeItem
                  key={grade.id}
                  grade={grade}
                  pick={() => pickCb(grade)}
                  disabled={acting}
                  highlight={
                    watchman.grade ? grade.id === watchman.grade.id : false
                  }
                />
              ))}
            </Column>
          )}
        </ApolloQueryResults>
      </Modal.Body>
    </Modal>
  );
};

export default PickGradeModal;
