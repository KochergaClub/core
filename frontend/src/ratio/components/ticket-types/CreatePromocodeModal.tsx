import { useMutation } from '@apollo/client';

import { useNotification } from '~/common/hooks';
import ModalForm from '~/components/forms/ModalForm';
import { FormShape } from '~/components/forms/types';

import { RatioTicketTypeFragment } from '../../queries.generated';
import { CreateRatioPromocodeDocument } from './queries.generated';

interface Props {
  close: () => void;
  ticketType: RatioTicketTypeFragment;
}

const shape: FormShape = [
  { name: 'code', type: 'string' },
  { name: 'discount', type: 'number' },
];

const CreatePromocodeModal: React.FC<Props> = ({ close, ticketType }) => {
  const notify = useNotification();
  const [create] = useMutation(CreateRatioPromocodeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  type FormValues = {
    code: string;
    discount: number;
  };

  const post = async (v: FormValues) => {
    const result = await create({
      variables: {
        input: {
          code: v.code,
          discount: v.discount,
          ticket_type_id: ticketType.id,
        },
      },
    });
    if (!result.data) {
      notify({ text: 'Mutation failed', type: 'Error' });
      return { close: false };
    }
    switch (result.data.result.__typename) {
      case 'RatioPromocode':
        return; // TODO - update TicketType
      default:
        // TODO - display error
        notify({ text: 'Error', type: 'Error' });
        return { close: false };
    }
  };

  return (
    <ModalForm
      close={close}
      shape={shape}
      modalButtonName="Создать"
      modalTitle="Создание промокода"
      post={post}
    />
  );
};

export default CreatePromocodeModal;
