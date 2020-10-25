import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';

import { Spinner } from '~/components';
import { Modal } from '~/frontkit';

import { RatioOrderFragment, RatioTicketTypesDocument } from '../queries.generated';
import CheckoutOrderModal from './CheckoutOrderModal';
import FormOrderModal from './FormOrderModal';

interface Props {
  close: () => void;
}

const SpinnerContainer = styled.div`
  min-height: 400px;
`;

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
          <SpinnerContainer>
            <Spinner size="div" />
          </SpinnerContainer>
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
