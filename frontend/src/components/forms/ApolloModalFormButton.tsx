import { GraphQLError } from 'graphql';
import { useCallback } from 'react';

import { FetchResult } from '@apollo/client';

import { FormShapeModalButton, Props as FormShapeModalButtonProps } from './FormShapeModalButton';
import { FormShape, ShapeToValues } from './types';

type SimpleProps<S extends FormShape> = Omit<
  FormShapeModalButtonProps<S>,
  'post'
> & {
  mutation: (options: {
    variables: { input: ShapeToValues<S> };
  }) => Promise<FetchResult<unknown>>;
  valuesToVariables?: undefined;
};

type PropsWithConversion<S extends FormShape, Variables> = Omit<
  FormShapeModalButtonProps<S>,
  'post'
> & {
  mutation: (options: {
    variables: Variables;
  }) => Promise<FetchResult<unknown>>;
  valuesToVariables: (v: ShapeToValues<S>) => Variables;
};

type Props<S extends FormShape, Variables> =
  | SimpleProps<S>
  | PropsWithConversion<S, Variables>;

export default function ApolloModalFormButton<
  S extends FormShape,
  Variables = { input: ShapeToValues<S> }
>({ mutation, valuesToVariables, ...otherProps }: Props<S, Variables>) {
  const cb = useCallback(
    async (values: ShapeToValues<S>) => {
      try {
        if (valuesToVariables) {
          // PropsWithConversion
          await (mutation as PropsWithConversion<S, Variables>['mutation'])({
            variables: valuesToVariables(values),
          });
        } else {
          // SimpleProps
          await (mutation as SimpleProps<S>['mutation'])({
            variables: { input: values },
          });
        }
        return;
      } catch (e) {
        const errors = e.graphQLErrors as GraphQLError[];

        const error = errors.length
          ? errors
              .map(
                (e) =>
                  e.message +
                  ': ' +
                  JSON.stringify(
                    e.extensions?.response?.body || 'unknown reason'
                  )
              )
              .join('. ')
          : String(e);

        return {
          close: false,
          error,
        };
      }
    },
    [valuesToVariables, mutation]
  );

  return <FormShapeModalButton post={cb} {...otherProps} />;
}
