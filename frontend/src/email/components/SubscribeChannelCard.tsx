import { useCallback } from 'react';

import { useMutation } from '@apollo/client';
import { Label, Row } from '@kocherga/frontkit';

import { AsyncButtonWithConfirm, CopyToClipboardIcon } from '~/components';
import Card, { CardHeader } from '~/components/Card';
import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import {
    EmailSubscribeChannelAddEmailDocument, EmailSubscribeChannelDeleteDocument,
    SubscribeChannelFragment
} from '../queries.generated';

type ManualSubscribeFormResults = {
  email: string;
};

const manualSubscribeFormShape: FormShape = [{ name: 'email', type: 'email' }];

interface Props {
  subscribeChannel: SubscribeChannelFragment;
}

const SubscribeChannelCard: React.FC<Props> = ({ subscribeChannel }) => {
  const [deleteMutation] = useMutation(EmailSubscribeChannelDeleteDocument, {
    refetchQueries: ['EmailSubscribeChannels'],
    awaitRefetchQueries: true,
  });
  const [subscribeMutation] = useMutation(
    EmailSubscribeChannelAddEmailDocument,
    {
      refetchQueries: ['EmailSubscribeChannels'],
      awaitRefetchQueries: true,
    }
  );

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

  const url = `${process.env.NEXT_PUBLIC_KOCHERGA_WEBSITE}/api/email/subscribe_channel/${subscribeChannel.slug}/subscribe`;

  return (
    <Card>
      <CardHeader>{subscribeChannel.slug}</CardHeader>
      <Row vCentered>
        <Label>Webhook:</Label>
        <code>{url}</code>
        <CopyToClipboardIcon text={url} />
      </Row>
      <ul>
        {subscribeChannel.interests.map((interest) => (
          <li key={interest.id}>
            {interest.category.title} &rarr; {interest.name}
          </li>
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
          shape={manualSubscribeFormShape}
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
