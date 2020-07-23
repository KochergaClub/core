// In the past these types included extra redux props.
export type { NextPage, NextPageContext } from 'next';

export interface User {
  is_authenticated: boolean;
  permissions: string[];
  is_staff?: boolean;
  email?: string;
}

export interface Route {
  href: string;
  as: string;
}
