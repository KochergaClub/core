import React, { useCallback, useReducer } from 'react';

import { Screen } from '~/common/types';
import Page from '~/components/Page';

import MainForm from './MainForm';
import MainModal from './MainModal';

import { Button } from '@kocherga/frontkit';

import { SignMethodCalculation } from './kkmServer';

import { reducer, isChequeValid } from './reducer';

interface Props {}

const KkmPage = ({  }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    password: '',
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
        <MainForm dispatch={dispatch} state={state} />
        {state.modalOpen && <MainModal dispatch={dispatch} state={state} />}
        <Button onClick={click} disabled={!isChequeValid(state)} kind="danger">
          Пробить
        </Button>
        {state.outcome && (
          <section>
            <h2>Результат</h2>
            <pre>{JSON.stringify(state.outcome.result, null, 2)}</pre>
            <h2>Ошибка</h2>
            <pre>{JSON.stringify(state.outcome.error, null, 2)}</pre>
          </section>
        )}
      </Page.Main>
    </Page>
  );
};

const screen: Screen<Props> = {
  component: KkmPage,
};
export default screen;
