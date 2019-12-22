import gql from 'graphql-tag';

const memberFragments = {
  full: gql`
    fragment StaffMemberFull on StaffMember {
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
  `,
  forPicker: gql`
    fragment StaffMemberForPicker on StaffMember {
      id
      user_id
      full_name
      short_name
      color
    }
  `,
};

export const GET_MEMBERS = gql`
  query StaffMembers {
    staffMembersAll {
      ...StaffMemberFull
    }
  }
  ${memberFragments.full}
`;

export const GET_MEMBERS_FOR_PICKER = gql`
  query StaffMembersForPicker {
    members: staffMembersAll {
      ...StaffMemberForPicker
    }
  }
  ${memberFragments.forPicker}
`;

export const GET_MEMBER = gql`
  query StaffMember($id: ID!) {
    staffMember(id: $id) {
      ...StaffMemberFull
    }
  }
  ${memberFragments.full}
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
