import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { CopyToClipboardIcon, MutationButton } from '~/components';
import Card, { CardHeader } from '~/components/Card';
import { FormShapeModalButton } from '~/components/forms';
import { Column, Label, Row } from '~/frontkit';

import {
    EmailSubscribeChannelAddEmailDocument, EmailSubscribeChannelDeleteDocument,
    SubscribeChannelFragment
} from '../queries.generated';

type ManualSubscribeFormResults = {
  email: string;
};

const manualSubscribeFormShape = [{ name: 'email', type: 'email' }] as const;

interface Props {
  subscribeChannel: SubscribeChannelFragment;
}

const SubscribeChannelCard: React.FC<Props> = ({ subscribeChannel }) => {
  const [subscribeMutation] = useMutation(
    EmailSubscribeChannelAddEmailDocument,
    {
      refetchQueries: ['EmailSubscribeChannels'],
      awaitRefetchQueries: true,
    }
  );

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
      <Column>
        <CardHeader>
          <Row gutter={8}>
            <div>{subscribeChannel.slug}</div>
            <MutationButton
              size="small"
              confirmText="Точно удалить?"
              mutation={EmailSubscribeChannelDeleteDocument}
              refetchQueries={['EmailSubscribeChannels']}
              variables={{
                slug: subscribeChannel.slug,
              }}
            >
              Удалить
            </MutationButton>
            <FormShapeModalButton
              shape={manualSubscribeFormShape}
              size="small"
              buttonName="Подписать вручную"
              modalTitle="Подписать вручную"
              modalButtonName="Подписать"
              post={manualSubscribeCb}
            />
          </Row>
        </CardHeader>
        <div>
          <Label>Webhook:</Label>
          <Row vCentered>
            <code>{url}</code>
            <CopyToClipboardIcon text={url} />
          </Row>
        </div>
        <div>
          <Label>Интересы:</Label>
          <ul>
            {subscribeChannel.interests.map((interest) => (
              <li key={interest.id}>
                {interest.category.title} &rarr; {interest.name}
              </li>
            ))}
          </ul>
        </div>
        {subscribeChannel.log.nodes.length ? (
          <div>
            <Label>Последние подписки:</Label>
            {subscribeChannel.log.nodes.map((entry) => (
              <Row key={entry.id}>
                <div>{entry.email}</div>
                <div>{entry.dt}</div>
              </Row>
            ))}
          </div>
        ) : null}
      </Column>
    </Card>
  );
};

export default SubscribeChannelCard;
