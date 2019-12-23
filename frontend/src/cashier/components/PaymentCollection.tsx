import { useCallback } from 'react';

import { useApolloClient } from '@apollo/react-hooks';

import { usePermissions } from '~/common/hooks';

import { ApolloQueryResults } from '~/components';
import {
  PagedApolloCollection,
  CustomCardListView,
} from '~/components/collections';
import { FormShape } from '~/components/forms/types';

import {
  StaffMembersDocument,
  StaffMembersQuery,
  StaffMemberFullFragment,
} from '~/staff/queries.generated';

import {
  useCashierPaymentsQuery,
  CashierPaymentsDocument,
  useCashierCreatePaymentMutation,
  PaymentFragment,
} from '../queries.generated';

import PaymentCard from './PaymentCard';

const PaymentCollection: React.FC = () => {
  const queryResults = useCashierPaymentsQuery();
  const [createPaymentMutation] = useCashierCreatePaymentMutation({
    refetchQueries: [
      {
        query: CashierPaymentsDocument,
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
          const {
            data: { staffMembersAll: members },
          } = await apolloClient.query<StaffMembersQuery>({
            query: StaffMembersDocument,
          });
          return members;
        },
        display: (member: StaffMemberFullFragment) => member.full_name,
        getValue: (member: StaffMemberFullFragment) => parseInt(member.user_id),
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
          fetchPage={async (page: number) => {
            await queryResults.refetch({ page });
          }}
          names={{
            plural: 'выплаты',
            genitive: 'выплату',
          }}
          add={canCreate ? { cb: add, shape: paymentShape } : undefined}
          view={props => (
            <CustomCardListView
              {...props}
              isMuted={payment => payment.is_redeemed}
              renderItem={renderItem}
            />
          )}
        />
      )}
    </ApolloQueryResults>
  );
};

export default PaymentCollection;
