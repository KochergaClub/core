import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { ErrorMessage, FieldContainer } from '~/components/forms';
import { AsyncButton, colors, deviceMediaQueries, Input, Row } from '~/frontkit';

import { FormData } from './FormOrderModal';
import { CheckRatioPromocodeDocument } from './queries.generated';

interface Props {
  form: UseFormReturn<FormData>;
  setDiscountedPrice: (v: number | undefined) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    width: 140px;
  }

  > * + * {
    margin-left: 8px;
  }

  ${deviceMediaQueries.mobile(`
    > * + * {
      margin-left: 0;
    }
    flex-direction: column;
    align-items: start;
  `)}
`;

type Status =
  | {
      type: 'unchecked';
    }
  | { type: 'failed' }
  | { type: 'ok'; discounted_price: number };

const PromocodeField: React.FC<Props> = ({ form, setDiscountedPrice }) => {
  const watchTicketType = form.watch('ticket_type');
  const watchCode = form.watch('promocode');
  const [checkMutation] = useMutation(CheckRatioPromocodeDocument);
  const [status, setStatus] = useState<Status>({ type: 'unchecked' });

  useEffect(() => {
    setStatus({ type: 'unchecked' });
    setDiscountedPrice(undefined);
  }, [watchTicketType, setDiscountedPrice]);

  const check = async () => {
    if (!watchTicketType || !watchTicketType) {
      // ticket type is not selected
      return;
    }
    const ticket_type_id = watchTicketType.value.id;
    const mutationResults = await checkMutation({
      variables: {
        input: {
          ticket_type_id,
          code: watchCode,
        },
      },
    });

    if (mutationResults.data?.result) {
      const { discounted_price } = mutationResults.data?.result;
      setStatus({
        type: 'ok',
        discounted_price,
      });
      setDiscountedPrice(discounted_price);
    } else {
      setStatus({
        type: 'failed',
      });
    }
  };

  return (
    <FieldContainer
      title="Промокод, если есть"
      error={form.formState.errors.promocode}
    >
      <Container>
        <Row vCentered>
          <Input
            type="string"
            placeholder="Промокод"
            {...form.register('promocode')}
            readOnly={status.type === 'ok'} // prevent weird UI states when promocode is applied and then changed
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                check();
                e.preventDefault();
              }
            }}
          />
          <AsyncButton
            act={check}
            disabled={
              !watchTicketType || watchCode === '' || status.type === 'ok'
            }
          >
            {watchTicketType ? 'Применить' : 'Выберите тип билета'}
          </AsyncButton>
        </Row>
        <div>
          {status.type === 'unchecked' ? null : status.type === 'failed' ? (
            <ErrorMessage>Неверный промокод</ErrorMessage>
          ) : (
            <Row vCentered>
              <FaCheck />
              <s>{watchTicketType.value.price} руб.</s>
              <strong style={{ color: colors.good[700] }}>
                {status.discounted_price} руб.
              </strong>
            </Row>
          )}
        </div>
      </Container>
    </FieldContainer>
  );
};

export default PromocodeField;
