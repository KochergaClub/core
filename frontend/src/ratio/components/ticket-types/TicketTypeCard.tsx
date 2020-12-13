import React from 'react';
import { FaEdit, FaPlus } from 'react-icons/fa';

import { Card, CardSection } from '~/components/cards';
import DropdownMenu, { ModalAction } from '~/components/DropdownMenu';
import { Column, Row } from '~/frontkit';

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
      <Column stretch gutter={16}>
        <div>{ticketType.name}</div>
        {ticketType.discount_by_email ||
        ticketType.discount_percent_by_email ? (
          <CardSection title="Промокоды">
            <Column stretch>
              <EmailDiscount entity={ticketType} entityType="ticket_type" />
              <TicketTypePromocodesCollection ticketType={ticketType} />
            </Column>
          </CardSection>
        ) : null}
      </Column>
    </Card>
  );
};

export default TicketTypeCard;
