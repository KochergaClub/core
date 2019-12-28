import { useCallback, useReducer } from 'react';
import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';

import { Page, PaddedBlock } from '~/components';

import MainForm from '../components/MainForm';
import MainModal from '../components/MainModal';

import { Button, Column } from '@kocherga/frontkit';

import { SignMethodCalculation } from '../kkmServer';

import { reducer, isChequeValid } from '../reducer';

interface Props {}

const KkmPage = ({}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    cheque: {
      email: '',
      title: '',
      amount: 0,
      method: SignMethodCalculation.PrePayment100,
    },
    modalOpen: false,
  });

  const click = useCallback(() => {
    dispatch({ type: 'START_CONFIRMATION' });
  }, []);

  return (
    <Page title="Электронные чеки" team>
      <Page.Title>Электронные чеки</Page.Title>
      <Page.Main>
        <PaddedBlock>
          <Column stretch>
            <MainForm dispatch={dispatch} state={state} />
            <Button onClick={click} disabled={!isChequeValid(state)} size="big">
              Пробить
            </Button>
          </Column>
          {state.modalOpen && <MainModal dispatch={dispatch} state={state} />}
          {state.outcome && (
            <section>
              <h2>Результат</h2>
              <pre>{JSON.stringify(state.outcome.result, null, 2)}</pre>
              <h2>Ошибка</h2>
              <pre>{JSON.stringify(state.outcome.error, null, 2)}</pre>
            </section>
          )}
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(KkmPage));
