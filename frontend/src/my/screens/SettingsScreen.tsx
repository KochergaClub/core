import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock, Page } from '~/components';
import { HR } from '~/frontkit';

import EmailSettings from '../components/EmailSettings';
import SetNames from '../components/SetNames';
import SetPassword from '../components/SetPassword';
import { MySettingsPageDocument } from '../queries.generated';

export const SettingsScreen: React.FC = () => {
  const queryResults = useQuery(MySettingsPageDocument);
  const title = 'Настройки';

  return (
    <div>
      <Page.Title>{title}</Page.Title>
      <PaddedBlock>
        <ApolloQueryResults {...queryResults} size="block">
          {({ data: { my } }) => (
            <div>
              <SetNames user={my.user} />
              <HR />
              <SetPassword />
              {/* {my.membership ? (
        <>
          <HR />
          <PrivacySettings membership={my.membership} />
        </>
      ) : null} */}
              <HR />
              <EmailSettings email_subscription={my.email_subscription} />
            </div>
          )}
        </ApolloQueryResults>
      </PaddedBlock>
    </div>
  );
};
