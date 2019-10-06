import React from 'react';
import { useSelector } from 'react-redux';

import Card, { CardList } from '~/components/Card';

import { SubscribeChannel } from '../types';
import { selectSubscribeChannels } from '../selectors';

import CreateSubscribeChannelButton from './CreateSubscribeChannelButton';

const SubscribeChannelCard: React.FC<{
  subscribeChannel: SubscribeChannel;
}> = ({ subscribeChannel }) => <Card>{subscribeChannel.slug}</Card>;

const SubscribeChannelList: React.FC = () => {
  const subscribeChannels = useSelector(selectSubscribeChannels);

  return (
    <div>
      <h2>Каналы подписки</h2>
      <CreateSubscribeChannelButton />
      <CardList>
        {subscribeChannels.map(subscribeChannel => (
          <SubscribeChannelCard
            key={subscribeChannel.slug}
            subscribeChannel={subscribeChannel}
          />
        ))}
      </CardList>
    </div>
  );
};

export default SubscribeChannelList;
