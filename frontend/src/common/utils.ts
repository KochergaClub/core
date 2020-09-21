import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FragmentDefinitionNode } from 'graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export const IS_SERVER = typeof window === 'undefined';

// Note that if we get locations in multiple timezones we could load the location timezone from the server.
export const timezone = 'Europe/Moscow';

export const formatDate = (date: Date, formatStr: string) =>
  format(date, formatStr, { locale: ru });

export const parseQueryString = (
  queryString: string
): { [k: string]: string } => {
  const params = new URLSearchParams(queryString);

  const result: { [k: string]: string } = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

export const buildQueryString = (params: { [s: string]: string | boolean }) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map((k) => esc(k) + '=' + esc(params[k] as string))
    .join('&');
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const staticUrl = (path: string) => {
  const staticPrefix = process.env.NEXT_PUBLIC_STATIC_S3_BUCKET
    ? `https://${process.env.NEXT_PUBLIC_STATIC_S3_BUCKET}.s3.amazonaws.com/static/`
    : '/static/';
  return staticPrefix + path;
};

// via https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

export const withFragments = <Operation, Variables>(
  document: DocumentNode<Operation, Variables>,
  fragments: DocumentNode<unknown, unknown>[]
): DocumentNode<Operation, Variables> => {
  const definitions = [
    ...document.definitions,
    ...fragments.map((f) => f.definitions).flat(),
  ];
  return {
    ...document,
    definitions,
  };
};
