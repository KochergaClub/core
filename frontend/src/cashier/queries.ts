import gql from 'graphql-tag';

const paymentFragment = gql`
  fragment Payment on CashierPayment {
    id
    amount
    whom {
      id
      email
      staff_member {
        id
        full_name
      }
    }
    comment
    is_redeemed
    created_dt
    redeem_dt
  }
`;

export const GET_PAYMENTS = gql`
  query CashierPayments {
    payments: cashierPayments {
      pageInfo {
        hasNextPage
        pageNumber
      }
      nodes {
        ...Payment
      }
    }
  }

  ${paymentFragment}
`;

export const CREATE_PAYMENT = gql`
  mutation CashierCreatePayment($params: CashierCreatePaymentInput!) {
    cashierCreatePayment(params: $params)
  }
`;

export const REDEEM_PAYMENT = gql`
  mutation CashierRedeemPayment($id: ID!) {
    cashierRedeemPayment(id: $id)
  }
`;
