import { useCallback } from 'react';

import { Row, Label } from '@kocherga/frontkit';

import Card, { CardHeader } from '~/components/Card';
import AsyncButtonWithConfirm from '~/components/AsyncButtonWithConfirm';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import {
  useEmailSubscribeChannelDeleteMutation,
  useEmailSubscribeChannelAddEmailMutation,
  SubscribeChannelFragment,
} from '../queries.generated';

interface ManualSubscribeFormResults {
  email: string;
}

const manualSubscribeFormShape: FormShape = [{ name: 'email', type: 'email' }];

interface Props {
  subscribeChannel: SubscribeChannelFragment;
}

const SubscribeChannelCard: React.FC<Props> = ({ subscribeChannel }) => {
  const [deleteMutation] = useEmailSubscribeChannelDeleteMutation({
    refetchQueries: ['EmailSubscribeChannels'],
    awaitRefetchQueries: true,
  });
  const [subscribeMutation] = useEmailSubscribeChannelAddEmailMutation({
    refetchQueries: ['EmailSubscribeChannels'],
    awaitRefetchQueries: true,
  });

  const deleteCb = useCallback(async () => {
    await deleteMutation({
      variables: {
        slug: subscribeChannel.slug,
      },
    });
  }, [subscribeChannel.slug, deleteMutation]);

  const manualSubscribeCb = useCallback(
    async (values: ManualSubscribeFormResults) => {
      const email: string = values.email;
      await subscribeMutation({
        variables: {
          email,
          slug: subscribeChannel.slug,
        },
      });
    },
    [subscribeMutation, subscribeChannel.slug]
  );

  return (
    <Card>
      <CardHeader>{subscribeChannel.slug}</CardHeader>
      <Row vCentered>
        <Label>Webhook:</Label>
        <code>
          {process.env.NEXT_PUBLIC_KOCHERGA_WEBSITE}
          /api/email/subscribe_channel/
          {subscribeChannel.slug}/subscribe
        </code>
      </Row>
      <ul>
        {subscribeChannel.interests.map(interest => (
          <li key={interest.id}>{interest.name}</li>
        ))}
      </ul>
      <Row>
        <AsyncButtonWithConfirm
          small
          act={deleteCb}
          confirmText="Точно удалить?"
        >
          Удалить
        </AsyncButtonWithConfirm>
        <ModalFormButton
          fields={manualSubscribeFormShape}
          small
          buttonName="Подписать вручную"
          modalTitle="Подписать вручную"
          modalButtonName="Подписать"
          post={manualSubscribeCb}
        />
      </Row>
    </Card>
  );
};

export default SubscribeChannelCard;
