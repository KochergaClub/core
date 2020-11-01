import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';

import { Spinner } from '~/components';
import { Modal } from '~/frontkit';

import CheckoutOrderModal from './CheckoutOrderModal';
import FormOrderModal from './FormOrderModal';
import { RatioOrder_CreatedFragment, RatioTicketTypesDocument } from './queries.generated';

export interface OrderParams {
  ticketTypeId?: string;
}

interface Props {
  ticketTypeId?: string;
  close: () => void;
}

const SpinnerContainer = styled.div`
  min-height: 300px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OrderModal: React.FC<Props> = ({ ticketTypeId, close }) => {
  const [order, setOrder] = useState<RatioOrder_CreatedFragment | undefined>();

  const ticketTypesResults = useQuery(RatioTicketTypesDocument, {
    variables: {
      input: {
        id: ticketTypeId,
      },
    },
  });

  const onOrderCreated = useCallback((order: RatioOrder_CreatedFragment) => {
    setOrder(order);
  }, []);

  if (ticketTypesResults.loading || !ticketTypesResults.data) {
    return (
      <Modal>
        <Modal.Header close={close}>Регистрация</Modal.Header>
        <Modal.Body>
          <SpinnerContainer>
            <Spinner size="div" />
          </SpinnerContainer>
        </Modal.Body>
      </Modal>
    );
  }

  const ticketTypes = ticketTypesResults.data.result;
  if (!ticketTypes.length) {
    return (
      <Modal>
        <Modal.Header close={close}>Регистрация</Modal.Header>
        <Modal.Body>
          <SpinnerContainer>Нет билетов в продаже.</SpinnerContainer>
        </Modal.Body>
      </Modal>
    );
  }
  if (order) {
    return <CheckoutOrderModal close={close} order={order} />;
  } else {
    return (
      <FormOrderModal
        close={close}
        ticketTypes={ticketTypesResults.data?.result}
        onOrderCreated={onOrderCreated}
      />
    );
  }
};

export default OrderModal;
