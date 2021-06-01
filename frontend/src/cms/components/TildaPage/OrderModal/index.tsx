import React, { useCallback, useState } from 'react';

import { useQuery } from '@apollo/client';

import { Spinner } from '~/components';
import { Modal } from '~/frontkit';

import CheckoutOrderModal from './CheckoutOrderModal';
import FormOrderModal from './FormOrderModal';
import { RatioOrder_CreatedFragment, RatioTicketTypesDocument } from './queries.generated';

export type OrderParams = {
  ticketTypeId?: string;
  trainingType?: string;
  showNameFields?: boolean;
  showCityField?: boolean;
  showPromocodeField?: boolean;
};

type Props = OrderParams & {
  close: () => void;
};

const SpinnerContainer: React.FC = ({ children }) => (
  <div className="flex text-center justify-center items-center min-h-80">
    {children}
  </div>
);

export const OrderModal: React.FC<Props> = ({
  ticketTypeId,
  trainingType,
  showNameFields = true,
  showPromocodeField = true,
  showCityField = false,
  close,
}) => {
  const [order, setOrder] = useState<RatioOrder_CreatedFragment | undefined>();

  const ticketTypesResults = useQuery(RatioTicketTypesDocument, {
    variables: {
      input: {
        id: ticketTypeId,
        training_type: trainingType,
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
        showNameFields={showNameFields}
        showCityField={showCityField}
        showPromocodeField={showPromocodeField}
        onOrderCreated={onOrderCreated}
      />
    );
  }
};
