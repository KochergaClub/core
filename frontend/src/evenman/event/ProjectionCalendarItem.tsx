import { format, getUnixTime } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { FaGhost } from 'react-icons/fa';

import { MutationButton } from '~/components';
import { ControlsFooter, Modal, Row } from '~/frontkit';

import {
    EvenmanPrototypeCancelDateDocument, EvenmanPrototypeNewEventDocument
} from '../event-prototype/queries.generated';
import { CalendarItemContainer, CalendarItemIcon, CalendarItemTitle } from './calendar-helpers';
import { Projection } from './EventCalendar/projection';

type Props = {
  projection: Projection;
};

const ProjectionControls: React.FC<Props> = ({ projection }) => {
  return (
    <Row vCentered gutter={16}>
      <MutationButton
        kind="primary"
        mutation={EvenmanPrototypeCancelDateDocument}
        refetchQueries={['EvenmanEventsCalendar']}
        variables={{
          id: projection.prototype.id,
          date: format(projection.date, 'yyyy-MM-dd'),
        }}
      >
        Пропустить
      </MutationButton>
      <MutationButton
        kind="primary"
        mutation={EvenmanPrototypeNewEventDocument}
        refetchQueries={['EvenmanEventsCalendar']}
        variables={{
          id: projection.prototype.id,
          ts: getUnixTime(projection.date),
        }}
      >
        Создать
      </MutationButton>
    </Row>
  );
};

export const ProjectionCalendarItem: React.FC<Props> = ({ projection }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <CalendarItemContainer onClick={openModal}>
        <CalendarItemIcon>
          <FaGhost color="black" size="11" />
        </CalendarItemIcon>
        <CalendarItemTitle>{projection.prototype.title}</CalendarItemTitle>
      </CalendarItemContainer>
      {showModal && (
        <Modal>
          <Modal.Header close={closeModal}>
            {projection.prototype.title}
          </Modal.Header>
          <Modal.Footer>
            <ControlsFooter>
              <ProjectionControls projection={projection} />
            </ControlsFooter>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
