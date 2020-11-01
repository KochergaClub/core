import React, { useState } from 'react';
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
  setDiscount: (v: number) => void;
}

type Status =
  | {
      type: 'unchecked';
    }
  | { type: 'failed' }
  | { type: 'ok'; discount: number };

const PromocodeField: React.FC<Props> = ({ form, setDiscount }) => {
  const watchTicketType = form.watch('ticket_type');
  const watchCode = form.watch('promocode');
  const [checkMutation] = useMutation(CheckRatioPromocodeDocument);
  const [status, setStatus] = useState<Status>({ type: 'unchecked' });

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
      const discount = mutationResults.data?.result.discount;
      setStatus({
        type: 'ok',
        discount,
      });
      setDiscount(discount);
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
          disabled={status.type === 'ok'}
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
              <span>{status.discount} руб.</span>
            </Row>
          )}
        </div>
      </Row>
    </FieldContainer>
  );
};

export default PromocodeField;
0;
