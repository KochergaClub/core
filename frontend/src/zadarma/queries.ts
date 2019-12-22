import gql from 'graphql-tag';

const commonPbxCallFragment = gql`
  fragment CommonZadarmaPbxCall on ZadarmaPbxCall {
    pbx_call_id
    ts
    calls {
      call_id
      ts
      call_type
      destination
      disposition
      clid
      sip
      record
      watchman
    }
    data {
      staff_member {
        color
        short_name
      }
    }
  }
`;

export const GET_PBX_CALLS = gql`
  query ZadarmaPbxCalls($page: Int) {
    pbxCalls: zadarmaPbxCalls(page: $page, page_size: 20) {
      pageInfo {
        pageNumber
        hasNextPage
      }
      nodes {
        ...CommonZadarmaPbxCall
      }
    }
  }
  ${commonPbxCallFragment}
`;

export const GET_PBX_CALL = gql`
  query ZadarmaPbxCall($pbx_call_id: ID!) {
    pbxCall: zadarmaPbxCall(pbx_call_id: $pbx_call_id) {
      ...CommonZadarmaPbxCall
    }
  }
  ${commonPbxCallFragment}
`;

export const SET_MEMBER_FOR_PBX_CALL = gql`
  mutation ZadarmaSetMemberForPbxCall($member_id: ID!, $pbx_call_id: ID!) {
    zadarmaSetMemberForPbxCall(member_id: $member_id, pbx_call_id: $pbx_call_id)
  }
`;
