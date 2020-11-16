import React from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';

import Card from '~/components/Card';
import DropdownMenu, { ModalAction } from '~/components/DropdownMenu';
import { Row } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import CreatePromocodeModal from '../promocodes/CreatePromocodeModal';
import EmailDiscount from '../promocodes/EmailDiscount';
import EditTicketTypeModal from './EditTicketTypeModal';
import TicketTypePromocodesCollection from './TicketTypePromocodesCollection';

interface Props {
  ticketType: RatioTicketTypeFragment;
}

const TicketTypeCard: React.FC<Props> = ({ ticketType }) => {
  return (
    <Card>
      <header>
        <Row spaced>
          <strong>{ticketType.price} руб.</strong>
          <DropdownMenu>
            <ModalAction title="Редактировать" icon={FaEdit}>
              {({ close }) => (
                <EditTicketTypeModal close={close} ticketType={ticketType} />
              )}
            </ModalAction>
            <ModalAction title="Создать промокод" icon={FaPlus}>
              {({ close }) => (
                <CreatePromocodeModal
                  close={close}
                  ticketTypeId={ticketType.id}
                />
              )}
            </ModalAction>
          </DropdownMenu>
        </Row>
      </header>
      <div>{ticketType.name}</div>
      <EmailDiscount entity={ticketType} entityType="ticket_type" />
      <TicketTypePromocodesCollection ticketType={ticketType} />
    </Card>
  );
};

export default TicketTypeCard;
