import React from 'react';
import { useSelector } from 'react-redux';

import { Column } from '@kocherga/frontkit';
import Card, { CardList } from '~/components/Card';

import { SubscribeChannel } from '../types';
import {
  selectSubscribeChannels,
  selectMailchimpInterestsDict,
} from '../selectors';

import CreateSubscribeChannelButton from './CreateSubscribeChannelButton';

const SubscribeChannelCard: React.FC<{
  subscribeChannel: SubscribeChannel;
}> = ({ subscribeChannel }) => {
  const mailchimpInterestsDict = useSelector(selectMailchimpInterestsDict);
  return (
    <Card>
      <header>{subscribeChannel.slug}</header>
      <ul>
        {subscribeChannel.interests.map(id => (
          <li>{mailchimpInterestsDict[id].name}</li>
        ))}
      </ul>
    </Card>
  );
};

const SubscribeChannelList: React.FC = () => {
  const subscribeChannels = useSelector(selectSubscribeChannels);

  console.log(subscribeChannels);

  return (
    <div>
      <h2>Каналы подписки</h2>
      <Column stretch>
        <div>
          <CreateSubscribeChannelButton />
        </div>
        <CardList>
          {subscribeChannels.map(subscribeChannel => (
            <SubscribeChannelCard
              key={subscribeChannel.slug}
              subscribeChannel={subscribeChannel}
            />
          ))}
        </CardList>
      </Column>
    </div>
  );
};

export default SubscribeChannelList;
