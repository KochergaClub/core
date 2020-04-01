export { withApollo } from './client';
export { withStaff } from './withStaff';

import { NextApolloPage as ImportedNextApolloPage } from './types';
export type NextApolloPage<P = {}, IP = P> = ImportedNextApolloPage<P, IP>;
