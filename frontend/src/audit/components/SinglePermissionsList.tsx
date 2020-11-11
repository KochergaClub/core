import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { Column, Label, Row } from '~/frontkit';

import { AuthPermissionsWithUsersDocument } from '../queries.generated';
import UserInfo from './UserInfo';

const SinglePermissionsList: React.FC = () => {
  const queryResults = useQuery(AuthPermissionsWithUsersDocument);

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { permissions } }) => {
        const nonEmptyPermissions = permissions.filter(
          (permission) => permission.users.length > 0
        );
        if (!nonEmptyPermissions.length) {
          return null;
        }
        return (
          <section>
            <h2>ВНИМАНИЕ: есть пользователи с доступами вне групп!</h2>
            {nonEmptyPermissions.map((permission) => (
              <Column key={permission.id}>
                <strong>{permission.name}</strong>
                <Label>Пользователи с этим доступом:</Label>
                <Row>
                  {permission.users.map((user) => (
                    <UserInfo key={user.id} user={user} />
                  ))}
                </Row>
              </Column>
            ))}
          </section>
        );
      }}
    </ApolloQueryResults>
  );
};

export default SinglePermissionsList;
