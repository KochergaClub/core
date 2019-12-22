import gql from 'graphql-tag';

const maybeStaffUserFragment = gql`
  fragment MaybeStaffUser on AuthUser {
    id
    email
    staff_member {
      id
      full_name
    }
  }
`;

export const GET_GROUPS = gql`
  query AuthGroups {
    groups: authGroupsAll {
      id
      name
      permissions {
        id
        name
      }
      users {
        ...MaybeStaffUser
      }
    }
  }

  ${maybeStaffUserFragment}
`;

export const ADD_USER_TO_GROUP = gql`
  mutation AuthAddUserToGroup($user_id: ID!, $group_id: ID!) {
    authAddUserToGroup(user_id: $user_id, group_id: $group_id)
  }
`;

export const REMOVE_USER_FROM_GROUP = gql`
  mutation AuthRemoveUserFromGroup($user_id: ID!, $group_id: ID!) {
    authRemoveUserFromGroup(user_id: $user_id, group_id: $group_id)
  }
`;

export const GET_SINGLE_PERMISSIONS = gql`
  query AuthPermissions {
    permissions: authPermissionsAll {
      id
      name
      users {
        ...MaybeStaffUser
      }
    }
  }

  ${maybeStaffUserFragment}
`;
