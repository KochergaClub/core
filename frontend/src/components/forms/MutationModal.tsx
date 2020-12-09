import { GraphQLError } from 'graphql';
import { useCallback } from 'react';

import { TypedDocumentNode, useMutation } from '@apollo/client';

import { FormShapeModal, Props as FormShapeModalProps } from './FormShapeModal';
import { FormShape, ShapeToValues } from './types';

type CommonProps<S extends FormShape> = Omit<FormShapeModalProps<S>, 'post'> & {
  refetchQueries?: string[];
};

// Mutation variables should either match the given shape...
type SimpleProps<S extends FormShape, Variables> = CommonProps<S> & {
  mutation: TypedDocumentNode<
    unknown,
    // it's not enough to just use {input: ShapeToValues<S> } here, since it must be a subtype of Variables (mutation must accept any possible form values), not vice versa
    { input: ShapeToValues<S> } extends Variables ? Variables : never
  >;
  valuesToVariables?: undefined;
};

// ...or should be connected to shape type through valuesToVariables.
type PropsWithConversion<S extends FormShape, Variables> = CommonProps<S> & {
  // TODO - this is not very strict; valuesToVariables can return an object with unknown keys and it will pass typescript checks, unfortunately.
  mutation: TypedDocumentNode<unknown, Variables>;
  valuesToVariables: (v: ShapeToValues<S>) => Variables;
};

export type Props<S extends FormShape, Variables> =
  | SimpleProps<S, Variables>
  | PropsWithConversion<S, Variables>;

export function MutationModal<S extends FormShape, Variables>({
  mutation,
  valuesToVariables,
  refetchQueries,
  ...otherProps
}: Props<S, Variables>) {
  const [mutationCb] = useMutation(mutation, {
    refetchQueries,
    awaitRefetchQueries: true,
  });

  const cb = useCallback(
    async (values: ShapeToValues<S>) => {
      try {
        // Our SimpleProps + PropsWithConversion type is great for our component consumers, but it's terrible in implementation since typescript can't infer which type we're actually using.
        // Sorry, I couldn't figure out the better way.
        // What's worse is that we have to deal with the same issue in MutationModalButton and MutationModalAction.
        await (mutationCb as any)({
          variables: valuesToVariables
            ? valuesToVariables(values)
            : { input: values },
        });
        return; // mutation succeeded
      } catch (e) {
        const errors = e.graphQLErrors as GraphQLError[];

        const error = errors.length
          ? errors.map((e) => e.message || 'Неизвестная ошибка').join('. ')
          : String(e);

        return {
          close: false,
          error,
        };
      }
    },
    [valuesToVariables, mutationCb]
  );

  return <FormShapeModal post={cb} {...otherProps} />;
}
