import { useCallback } from 'react';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';

import { usePermissions } from '~/common/hooks';
import { ApolloQueryResults } from '~/components';
import { CustomCardListView, PagedApolloCollection } from '~/components/collections';
import { FormShape } from '~/components/forms/types';
import {
    StaffMemberFullFragment, StaffMembersDocument, StaffMembersQuery
} from '~/staff/queries.generated';

import {
    CashierCreatePaymentDocument, CashierPaymentsDocument, PaymentFragment
} from '../queries.generated';
import PaymentCard from './PaymentCard';

const PaymentCollection: React.FC = () => {
  const queryResults = useQuery(CashierPaymentsDocument, {
    variables: {
      first: 20,
    },
  });
  const [createPaymentMutation] = useMutation(CashierCreatePaymentDocument, {
    refetchQueries: [
      {
        query: CashierPaymentsDocument,
        variables: { first: 20 },
      },
    ],
    awaitRefetchQueries: true,
  });

  const apolloClient = useApolloClient();

  const [canCreate] = usePermissions(['cashier.create']);

  const paymentShape: FormShape = [
    { name: 'amount', type: 'number' },
    { name: 'comment', type: 'string' },
    {
      name: 'whom',
      type: 'fk',
      widget: {
        type: 'async',
        load: async () => {
          const { data } = await apolloClient.query({
            query: StaffMembersDocument,
          });

          if (!data) {
            throw new Error('query failed');
          }
          return data.staffMembersAll;
        },
        display: (member: StaffMemberFullFragment) => member.full_name,
        getValue: (member: StaffMemberFullFragment) => parseInt(member.user.id),
      },
    },
  ];

  interface CreatePaymentParams {
    amount: number;
    comment: string;
    whom: string;
  }

  const renderItem = useCallback(
    (payment: PaymentFragment) => <PaymentCard payment={payment} />,
    []
  );

  const add = useCallback(
    async (values: CreatePaymentParams) => {
      await createPaymentMutation({ variables: { params: values } });
    },
    [createPaymentMutation]
  );

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { payments } }) => (
        <PagedApolloCollection
          connection={payments}
          fetchPage={queryResults.refetch}
          names={{
            plural: 'выплаты',
            genitive: 'выплату',
          }}
          add={canCreate ? { cb: add, shape: paymentShape } : undefined}
          view={(props) => (
            <CustomCardListView
              {...props}
              isMuted={(payment) => payment.is_redeemed}
              renderItem={renderItem}
            />
          )}
        />
      )}
    </ApolloQueryResults>
  );
};

export default PaymentCollection;
