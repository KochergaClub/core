import { useSelector } from 'react-redux';

import Page from '~/components/Page';

import { selectView } from '../features/view';

import OpenOrdersScreen from './OpenOrdersScreen';
import ClosedOrdersScreen from './ClosedOrdersScreen';
import OrderDetails from './OrderDetails';
import CustomersScreen from './CustomersScreen';
import CustomerDetailsScreen from './CustomerDetailsScreen';
import Navigation from './Navigation';

const CmApp: React.FC = () => {
  const view = useSelector(selectView);

  const htmlTitle =
    view.mode === 'open'
      ? 'Открытые заказы | Cafe Menagerie'
      : view.mode === 'closed'
      ? 'Закрытые заказы | Cafe Menagerie'
      : view.mode === 'order'
      ? `Заказ #${view.id}`
      : view.mode === 'customers'
      ? 'Клиенты'
      : view.mode === 'customer-details'
      ? `Клиент #${view.id}`
      : 'UNKNOWN';

  const title = 'Cafe Menagerie';

  const mode2screen = {
    open: OpenOrdersScreen,
    closed: ClosedOrdersScreen,
    order: OrderDetails,
    customers: CustomersScreen,
    'customer-details': CustomerDetailsScreen,
  };

  const Screen = mode2screen[view.mode];

  return (
    <Page title={htmlTitle} team>
      <Page.Title>{title}</Page.Title>
      <Page.Main>
        <Navigation />
        <Screen />
      </Page.Main>
    </Page>
  );
};

export default CmApp;
