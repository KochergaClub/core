import { add, sub } from 'date-fns';
import React, { useCallback } from 'react';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import { formatDate } from '~/common/utils';
import { Column, Row } from '~/frontkit';

type Props = {
  date: Date;
  onViewChange: (value: Date) => void;
};

const IconContainer: React.FC<{
  icon: React.ElementType;
  onClick: () => void;
}> = ({ icon: Icon, onClick }) => (
  // TODO - unify with CopyToClipboardIcon code?
  <div className="text-gray-400 hover:text-gray-600 cursor-pointer">
    <Icon onClick={onClick} size={20} className="block" />
  </div>
);

export const Header: React.FC<Props> = ({ date, onViewChange }) => {
  const back = useCallback(() => {
    onViewChange(sub(date, { months: 1 }));
  }, [date, onViewChange]);

  const forward = useCallback(() => {
    onViewChange(add(date, { months: 1 }));
  }, [date, onViewChange]);

  return (
    <div className="p-2 border-b border-gray-300 bg-gray-200">
      <Column>
        <Row spaced vCentered>
          <IconContainer icon={BiCaretLeft} onClick={back} />
          <div className="font-bold">{formatDate(date, 'LLLL yyyy')}</div>
          <IconContainer icon={BiCaretRight} onClick={forward} />
        </Row>
        <Row>
          {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((weekday) => (
            <div key={weekday} className="w-8 text-center text-sm">
              {weekday}
            </div>
          ))}
        </Row>
      </Column>
    </div>
  );
};
