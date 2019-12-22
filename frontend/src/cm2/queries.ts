import gql from 'graphql-tag';

const customerFragment = gql`
  fragment Customer on Cm2Customer {
    id
    first_name
    last_name
    card_id
  }
`;

const orderWithCustomerFragment = gql`
  fragment OrderWithCustomer on Cm2Order {
    id
    start
    end
    value
    customer {
      ...Customer
    }
  }
  ${customerFragment}
`;

export const GET_ORDERS = gql`
  query GetCm2Orders($status: String, $page: Int) {
    cm2Orders(status: $status, page: $page) {
      pageInfo {
        hasNextPage
        pageNumber
      }
      edges {
        node {
          ...OrderWithCustomer
        }
      }
    }
  }

  ${orderWithCustomerFragment}
`;

export const GET_ORDER = gql`
  query Cm2Order($id: ID!) {
    cm2Order(id: $id) {
      ...OrderWithCustomer
    }
  }

  ${orderWithCustomerFragment}
`;

export const CREATE_ORDER = gql`
  mutation Cm2CreateOrder($params: Cm2CreateOrderInput!) {
    cm2CreateOrder(params: $params) {
      customer {
        id
      }
    }
  }
`;

export const SEARCH_CUSTOMERS = gql`
  query SearchCm2Customers($search: String!) {
    cm2Customers(search: $search, first: 10) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ...Customer
        }
      }
    }
  }
  ${customerFragment}
`;

const GET_CUSTOMERS = gql`
  query Cm2Customers($page: Int) {
    cm2Customers(page: $page) {
      pageInfo {
        hasNextPage
        pageNumber
      }
      edges {
        node {
          ...Customer
        }
      }
    }
  }
  ${customerFragment}
`;

const CREATE_CUSTOMER = gql`
  mutation Cm2CreateCustomer($params: Cm2CreateCustomerInput!) {
    cm2CreateCustomer(params: $params) {
      id
    }
  }
`;

const CLOSE_ORDER = gql`
  mutation Cm2CloseOrder($id: ID!) {
    cm2CloseOrder(id: $id)
  }
`;

const GET_CUSTOMER = gql`
  query Cm2CustomerPage($id: ID!) {
    cm2Customer(id: $id) {
      ...Customer
      orders {
        edges {
          node {
            id
            start
          }
        }
      }
    }
  }
  ${customerFragment}
`;
