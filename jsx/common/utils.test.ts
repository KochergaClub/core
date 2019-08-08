import { parseQueryString } from './utils';

it('parse empty query string', () => {
  expect(parseQueryString('')).toStrictEqual({});
});

it('parse single-key query string', () => {
  expect(parseQueryString('foo=5')).toStrictEqual({ foo: '5' });
});

it('parse normal query string', () => {
  expect(parseQueryString('foo=5&bar=6')).toStrictEqual({ foo: '5', bar: '6' });
});

it('parse query string with duplicate keys', () => {
  expect(parseQueryString('foo=5&bar=6&bar=7')).toStrictEqual({
    foo: '5',
    bar: '7',
  });
});

it('parse query string with escaped characters', () => {
  expect(parseQueryString('foo=first+second%20third')).toStrictEqual({
    foo: 'first second third',
  });
});
