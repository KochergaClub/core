import '@testing-library/jest-dom';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react';

import KochergaApolloCache from '~/apollo/cache';
import { CurrentUserDocument } from '~/auth/queries.generated';

const customRender = (
  children: React.ReactElement,
  { mocks }: { mocks: MockedResponse[] } = { mocks: [] }
) => {
  const my = {
    my: {
      user: {
        __typename: 'AuthCurrentUser',
        id: '0',
        is_authenticated: false,
        is_staff: false,
        is_superuser: false,
        permissions: [],
        email: null,
      },
    },
  };

  const allMocks: MockedResponse[] = [
    ...mocks,
    {
      request: {
        query: CurrentUserDocument,
      },
      result: { data: my },
    },
  ];

  const cache = new KochergaApolloCache({ addTypename: false });
  cache.writeQuery({
    query: CurrentUserDocument,
    data: my,
  });

  return render(
    <MockedProvider mocks={allMocks} addTypename={false} cache={cache}>
      {children}
    </MockedProvider>
  );
};

export { customRender as render };
