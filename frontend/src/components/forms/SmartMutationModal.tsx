import { useCallback } from 'react';

import { TypedDocumentNode } from '@apollo/client';

import { FormShapeModal, Props as FormShapeModalProps } from './FormShapeModal';
import { SmartMutationResult, useFormModalSmartMutation } from './hooks';
import { FormShape, ShapeToValues } from './types';

type CommonProps<S extends FormShape> = Omit<FormShapeModalProps<S>, 'post'> & {
  refetchQueries?: string[];
  expectedTypename: string;
};

// Mutation variables should either match the given shape...
type SimpleProps<S extends FormShape, Variables> = CommonProps<S> & {
  mutation: TypedDocumentNode<
    SmartMutationResult,
    // it's not enough to just use {input: ShapeToValues<S> } here, since it must be a subtype of Variables (mutation must accept any possible form values), not vice versa
    { input: ShapeToValues<S> } extends Variables ? Variables : never
  >;
  valuesToVariables?: undefined;
};

// ...or should be connected to shape type through valuesToVariables.
type PropsWithConversion<S extends FormShape, Variables> = CommonProps<S> & {
  // TODO - this is not very strict; valuesToVariables can return an object with unknown keys and it will pass typescript checks, unfortunately.
  mutation: TypedDocumentNode<SmartMutationResult, Variables>;
  valuesToVariables: (v: ShapeToValues<S>) => Variables;
};

export type Props<S extends FormShape, Variables> =
  | SimpleProps<S, Variables>
  | PropsWithConversion<S, Variables>;

export function SmartMutationModal<S extends FormShape, Variables>({
  mutation,
  valuesToVariables,
  refetchQueries,
  expectedTypename,
  ...otherProps
}: Props<S, Variables>) {
  const mutationCb = useFormModalSmartMutation(mutation, {
    refetchQueries,
    expectedTypename,
  });

  const cb = useCallback(
    async (values: ShapeToValues<S>) => {
      // Our SimpleProps + PropsWithConversion type is great for our component consumers, but it's terrible in implementation since typescript can't infer which type we're actually using.
      // Sorry, I couldn't figure out the better way than passing `any` here.
      // What's worse is that we have to deal with the same issue in MutationModalButton and MutationModalAction.
      return await mutationCb({
        variables: (valuesToVariables
          ? valuesToVariables(values)
          : { input: values }) as any,
      });
    },
    [valuesToVariables, mutationCb]
  );

  return <FormShapeModal post={cb} {...otherProps} />;
}
