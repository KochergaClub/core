import React from 'react';

import { useMutation } from '@apollo/client';

import Card from '~/components/Card';
import DropdownMenu, { ModalAction } from '~/components/DropdownMenu';
import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';
import { Row } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import CreatePromocodeModal from './CreatePromocodeModal';
import EditTicketTypeModal from './EditTicketTypeModal';
import PromocodesCollection from './PromocodesCollection';
import { SendUniqueRatioPromocodeDocument } from './queries.generated';

const DiscountRow: React.FC<Props> = ({ ticketType }) => {
  const [generateMutation] = useMutation(SendUniqueRatioPromocodeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });
  const post = async (v: { email: string }) => {
    await generateMutation({
      variables: {
        input: {
          ticket_type_id: ticketType.id,
          email: v.email,
        },
      },
    });
  };

  const shape: FormShape = [
    {
      name: 'email',
      type: 'email',
    },
  ];

  if (!ticketType.discount_by_email && !ticketType.discount_percent_by_email) {
    return null;
  }

  return (
    <Row>
      <div>
        Скидка по e-mail&apos;у:{' '}
        {ticketType.discount_by_email
          ? `${ticketType.discount_by_email} руб.`
          : `${ticketType.discount_percent_by_email} %`}
      </div>
      <ModalFormButton
        shape={shape}
        small
        buttonName="Сгенерировать"
        modalTitle="Сгенерировать промокод по e-mail"
        modalButtonName="Сгенерировать и отправить"
        post={post}
      />
    </Row>
  );
};

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
            <ModalAction title="Редактировать">
              {({ close }) => (
                <EditTicketTypeModal close={close} ticketType={ticketType} />
              )}
            </ModalAction>
            <ModalAction title="Создать промокод">
              {({ close }) => (
                <CreatePromocodeModal close={close} ticketType={ticketType} />
              )}
            </ModalAction>
          </DropdownMenu>
        </Row>
      </header>
      <div>{ticketType.name}</div>
      <DiscountRow ticketType={ticketType} />
      <PromocodesCollection ticketType={ticketType} />
    </Card>
  );
};

export default TicketTypeCard;
