import gql from 'graphql-tag';

const memberFragment = gql`
  fragment Member on StaffMember {
    id
    user_id
    full_name
    short_name
    email
    role
    color
    is_current
    slack_image
    slack_id
    vk
  }
`;

export const GET_MEMBERS = gql`
  query StaffMembers {
    staffMembersAll {
      ...Member
    }
  }
  ${memberFragment}
`;

export const GET_MEMBER = gql`
  query StaffMember($id: ID!) {
    staffMember(id: $id) {
      ...Member
    }
  }
  ${memberFragment}
`;

export const GRANT_GOOGLE_PERMISSIONS_TO_MEMBER = gql`
  mutation StaffGrantGooglePermissionsToMember($id: ID!) {
    staffGrantGooglePermissionsToMember(id: $id)
  }
`;

export const FIRE_MEMBER = gql`
  mutation StaffFireMember($id: ID!) {
    staffFireMember(id: $id)
  }
`;
