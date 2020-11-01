import React, { useEffect, useState } from 'react';
import { UseFormMethods } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';

import { useMutation } from '@apollo/client';

import { AsyncButton } from '~/components';
import { FieldContainer } from '~/components/forms2';
import { Input, Row } from '~/frontkit';

import { FormData } from './FormOrderModal';
import { CheckRatioPromocodeDocument } from './queries.generated';

interface Props {
  form: UseFormMethods<FormData>;
  setDiscountedPrice: (v: number | undefined) => void;
}

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
    <FieldContainer title="Промокод, если есть" error={form.errors.promocode}>
      <Row vCentered>
        <Input
          type="string"
          name="promocode"
          placeholder="Промокод"
          ref={form.register}
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
        <div>
          {status.type === 'unchecked' ? null : status.type === 'failed' ? (
            'Неверный промокод'
          ) : (
            <Row vCentered>
              <FaCheck />
              <s>{watchTicketType.value.price} руб.</s>
              <strong>{status.discounted_price} руб.</strong>
            </Row>
          )}
        </div>
      </Row>
    </FieldContainer>
  );
};

export default PromocodeField;
0;
