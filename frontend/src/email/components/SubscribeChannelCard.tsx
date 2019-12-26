import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Row, Label } from '@kocherga/frontkit';

import Card, { CardHeader } from '~/components/Card';
import AsyncButtonWithConfirm from '~/components/AsyncButtonWithConfirm';
import ModalFormButton from '~/components/forms/ModalFormButton';
import { useDispatch } from '~/common/hooks';

import { SubscribeChannel } from '../types';
import { selectMailchimpInterestsDict } from '../features/mailchimpCategories';
import {
  deleteSubscribeChannel,
  subscribeEmailToSubscribeChannel,
} from '../features/subscribeChannels';

const SubscribeChannelCard: React.FC<{
  subscribeChannel: SubscribeChannel;
}> = ({ subscribeChannel }) => {
  const mailchimpInterestsDict = useSelector(selectMailchimpInterestsDict);
  const dispatch = useDispatch();

  const deleteCb = useCallback(async () => {
    await dispatch(deleteSubscribeChannel(subscribeChannel.slug));
  }, [dispatch, subscribeChannel.slug]);

  const manualSubscribeCb = useCallback(
    async (values: any) => {
      const email: string = values.email;
      await dispatch(
        subscribeEmailToSubscribeChannel(subscribeChannel.slug, email)
      );
    },
    [dispatch, subscribeChannel.slug]
  );

  return (
    <Card>
      <CardHeader>{subscribeChannel.slug}</CardHeader>
      <Row vCentered>
        <Label>Webhook:</Label>
        <code>
          https://kocherga-club.ru/api/email/subscribe_channel/
          {subscribeChannel.slug}/subscribe
        </code>
      </Row>
      <ul>
        {subscribeChannel.interests.map(id => (
          <li key={id}>{mailchimpInterestsDict[id].name}</li>
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
          fields={[{ name: 'email', type: 'email' }]}
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
