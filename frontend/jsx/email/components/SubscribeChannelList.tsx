import { useSelector } from 'react-redux';

import { Column } from '@kocherga/frontkit';
import { CardList } from '~/components/Card';

import { selectSubscribeChannels } from '../features/subscribeChannels';

import CreateSubscribeChannelButton from './CreateSubscribeChannelButton';
import SubscribeChannelCard from './SubscribeChannelCard';

const SubscribeChannelList: React.FC = () => {
  const subscribeChannels = useSelector(selectSubscribeChannels);

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
