import { Column, Row, Label } from '@kocherga/frontkit';
import { ApolloQueryResults } from '~/components';

import UserInfo from './UserInfo';

import { useAuthPermissionsQuery } from '../codegen';

const SinglePermissionsList: React.FC = () => {
  const queryResults = useAuthPermissionsQuery();

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { permissions } }) => {
        const nonEmptyPermissions = permissions.filter(
          permission => permission.users.length > 0
        );
        if (!nonEmptyPermissions.length) {
          return null;
        }
        return (
          <section>
            <h2>ВНИМАНИЕ: есть пользователи с доступами вне групп!</h2>
            {nonEmptyPermissions.map(permission => (
              <Column key={permission.id}>
                <strong>{permission.name}</strong>
                <Label>Пользователи с этим доступом:</Label>
                <Row>
                  {permission.users.map(user => (
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
