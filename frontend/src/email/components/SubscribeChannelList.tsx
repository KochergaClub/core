import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { CardList } from '~/components/cards';
import { Column } from '~/frontkit';

import { EmailSubscribeChannelsDocument } from '../queries.generated';
import CreateSubscribeChannelButton from './CreateSubscribeChannelButton';
import SubscribeChannelCard from './SubscribeChannelCard';

const SubscribeChannelList: React.FC = () => {
  const queryResults = useQuery(EmailSubscribeChannelsDocument);

  return (
    <div>
      <h2>Каналы подписки</h2>
      <ApolloQueryResults {...queryResults}>
        {({ data: { subscribeChannels } }) => (
          <Column stretch>
            <div>
              <CreateSubscribeChannelButton />
            </div>
            <CardList>
              {subscribeChannels.map((subscribeChannel) => (
                <SubscribeChannelCard
                  key={subscribeChannel.slug}
                  subscribeChannel={subscribeChannel}
                />
              ))}
            </CardList>
          </Column>
        )}
      </ApolloQueryResults>
    </div>
  );
};

export default SubscribeChannelList;
