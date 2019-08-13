import { AnyPageType } from './pages/types';

import { NextPageContext } from '~/common/types';

export interface AnyWagtailPageProps<T extends AnyPageType> {
  wagtailPage: T;
  // allows extra props???
}

export interface StaticProps<T extends AnyPageType> {
  wagtailPage: T;
}

//export interface StaticWagtailScreen<T extends AnyPageType> {
//  component: React.ComponentType<StaticProps<T>>;
//  getInitialData: undefined;
//}
//
//export type DynamicWagtailScreen<
//  T extends AnyPageType,
//  P extends AnyWagtailPageProps<T>
//> = AnyScreen<T, P>;
//
//export type WagtailScreen<
//  T extends AnyPageType,
//  P extends AnyWagtailPageProps<T>
//> = StaticWagtailScreen<T> | DynamicWagtailScreen<T, P>;
//
//export const staticScreen = <T extends AnyPageType>(
//  component: React.ComponentType<StaticProps<T>>
//): StaticWagtailScreen<T> => {
//  return {
//    component,
//    getInitialData: undefined,
//  };
//};
//
//export const dynamicScreen = <
//  T extends AnyPageType,
//  P extends AnyWagtailPageProps<T>
//>(
//  component: React.ComponentType<P>,
//  getInitialData: AnyInitialLoader<T, P>
//): DynamicWagtailScreen<T, P> => {
//  return {
//    component,
//    getInitialData,
//  };
//};

// copy-pasted from next-js types to patch getInitialProps context type
export type NextWagtailPageContext<P extends AnyPageType> = NextPageContext & {
  wagtailPage: P;
};
export type NextWagtailPage<P extends AnyPageType, E extends {} = {}> = {
  (props: { wagtailPage: P } & E): JSX.Element | null;
  getInitialProps?(ctx: NextWagtailPageContext<P>): Promise<E>;
};
