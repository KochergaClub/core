import React, { useCallback, useState } from 'react';

import { useQuery } from '@apollo/client';
import { Modal } from '@kocherga/frontkit';

import { Spinner } from '~/components';

import { RatioOrderFragment, RatioTicketTypesDocument } from '../queries.generated';
import CheckoutOrderModal from './CheckoutOrderModal';
import FormOrderModal from './FormOrderModal';

interface Props {
  close: () => void;
}

const OrderModal: React.FC<Props> = ({ close }) => {
  const [order, setOrder] = useState<RatioOrderFragment | undefined>();

  const ticketTypesResults = useQuery(RatioTicketTypesDocument);

  const ticketTypes = ticketTypesResults.data?.result;

  const onOrderCreated = useCallback((order: RatioOrderFragment) => {
    setOrder(order);
  }, []);

  if (ticketTypesResults.loading || !ticketTypes) {
    return (
      <Modal>
        <Modal.Header toggle={close}>Регистрация</Modal.Header>
        <Modal.Body>
          <Spinner size="div" />
        </Modal.Body>
      </Modal>
    );
  } else if (order) {
    return <CheckoutOrderModal close={close} order={order} />;
  } else {
    return (
      <FormOrderModal
        close={close}
        ticketTypes={ticketTypes}
        onOrderCreated={onOrderCreated}
      />
    );
  }
};

export default OrderModal;
