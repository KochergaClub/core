import React from 'react';

import { useMutation } from '@apollo/client';

import { FormShapeModalButton } from '~/components/forms';
import { ShapeToValues } from '~/components/forms/types';
import { Row } from '~/frontkit';

import { SendUniqueRatioPromocodeDocument } from './queries.generated';

const shape = [
  {
    name: 'email',
    type: 'email',
  },
] as const;

interface Props {
  entity: {
    id: string;
    discount_by_email: number;
    discount_percent_by_email: number;
  };
  entityType: 'training' | 'ticket_type';
}

const EmailDiscount: React.FC<Props> = ({ entity, entityType }) => {
  const [generateMutation] = useMutation(SendUniqueRatioPromocodeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });
  const post = async (v: ShapeToValues<typeof shape>) => {
    const input =
      entityType === 'training'
        ? {
            training_id: entity.id,
            email: v.email,
          }
        : entityType === 'ticket_type'
        ? {
            ticket_type_id: entity.id,
            email: v.email,
          }
        : null;

    if (!input) {
      throw new Error('invalid entityType');
    }
    await generateMutation({
      variables: {
        input,
      },
    });
  };

  if (!entity.discount_by_email && !entity.discount_percent_by_email) {
    return null;
  }

  return (
    <Row>
      <div>
        Скидка по e-mail&apos;у:{' '}
        {entity.discount_by_email
          ? `${entity.discount_by_email} руб.`
          : `${entity.discount_percent_by_email} %`}
      </div>
      <FormShapeModalButton
        shape={shape}
        size="small"
        buttonLabel="Сгенерировать"
        modalTitle="Сгенерировать промокод по e-mail"
        modalSubmitLabel="Сгенерировать и отправить"
        post={post}
      />
    </Row>
  );
};

export default EmailDiscount;
