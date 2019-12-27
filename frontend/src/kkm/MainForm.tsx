import React from 'react';

import styled from 'styled-components';

import { Input, Column, Label } from '@kocherga/frontkit';

import Suggestions from './Suggestions';

import { Action, State } from './reducer';
import { SignMethodCalculation } from './kkmServer';

const FormSection = styled.section`
  width: 100%;
`;

const WideInput = styled(Input)`
  width: 100%;
`;

interface Props {
  state: State;
  dispatch: (a: Action) => void;
}

export default function MainForm({ dispatch, state }: Props) {
  return (
    <Column gutter={16}>
      <FormSection>
        <Label>Название:</Label>
        <WideInput
          type="text"
          onChange={e =>
            dispatch({ type: 'SET_TITLE', payload: e.currentTarget.value })
          }
          value={state.cheque.title}
        />
        <Suggestions
          values={[
            'Консультация',
            'Участие в воркшопе по прикладной рациональности',
          ]}
          current={state.cheque.title}
          setValue={value => dispatch({ type: 'SET_TITLE', payload: value })}
        />
      </FormSection>
      <FormSection>
        <Label>Сумма:</Label>
        <Input
          type="number"
          onChange={e =>
            dispatch({
              type: 'SET_AMOUNT',
              payload: parseInt(e.currentTarget.value),
            })
          }
          value={state.cheque.amount}
        />
        <Suggestions
          values={[2000, 12000, 30000, 36000]}
          current={state.cheque.amount}
          setValue={value => dispatch({ type: 'SET_AMOUNT', payload: value })}
        />
      </FormSection>
      <FormSection>
        <Label>
          <a href="http://www.consultant.ru/document/cons_doc_LAW_214339/731d2f8d127e3614422af34b4ac197612bd2f64d/">
            Тип чека
          </a>
          : {SignMethodCalculation[state.cheque.method]}
        </Label>
        <Suggestions
          values={[1, 2, 3, 4, 5, 6, 7]}
          current={state.cheque.method as number}
          setValue={value => dispatch({ type: 'SET_METHOD', payload: value })}
        />
      </FormSection>
      <FormSection>
        <Label>Пароль:</Label>
        <Input
          type="password"
          value={state.password}
          onChange={e =>
            dispatch({ type: 'SET_PASSWORD', payload: e.currentTarget.value })
          }
        />
      </FormSection>
      <FormSection>
        <Label>e-mail:</Label>
        <Input
          type="email"
          value={state.cheque.email}
          onChange={e =>
            dispatch({ type: 'SET_EMAIL', payload: e.currentTarget.value })
          }
        />
      </FormSection>
    </Column>
  );
}
