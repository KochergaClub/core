import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RatioTestimonial_CardFragment = (
  { __typename: 'RatioTestimonial' }
  & Pick<Types.RatioTestimonial, 'id' | 'author_name' | 'author_description' | 'text'>
  & { author_image?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, author_image_2x?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, product?: Types.Maybe<(
    { __typename: 'RatioTestimonialProduct' }
    & Pick<Types.RatioTestimonialProduct, 'title' | 'color' | 'link'>
  )> }
);

export type RatioTestimonialsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RatioTestimonialsQuery = (
  { __typename: 'Query' }
  & { result: (
    { __typename: 'RatioTestimonialConnection' }
    & { nodes: Array<(
      { __typename: 'RatioTestimonial' }
      & RatioTestimonial_CardFragment
    )> }
  ) }
);

export const RatioTestimonial_CardFragmentDoc: DocumentNode<RatioTestimonial_CardFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTestimonial_Card"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTestimonial"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"author_name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"author_description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"author_image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-60x60","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}},{"kind":"Field","alias":{"kind":"Name","value":"author_image_2x"},"name":{"kind":"Name","value":"author_image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-120x120","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"color"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"text"},"arguments":[],"directives":[]}]}}]};
export const RatioTestimonialsDocument: DocumentNode<RatioTestimonialsQuery, RatioTestimonialsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTestimonials" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "ratioTestimonials" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "IntValue", "value": "100" } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nodes" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTestimonial_Card" }, "directives": [] }] } }] } }] } }, ...RatioTestimonial_CardFragmentDoc.definitions] });
