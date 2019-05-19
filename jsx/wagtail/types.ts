import { AnyPageType } from './pages/types';

import { AnyScreen, AnyInitialLoader } from '../common/types';

interface AnyWagtailPageProps<T extends AnyPageType> {
  wagtailPage: T;
  // allows extra props???
}

export interface StaticProps<T extends AnyPageType> {
  wagtailPage: T;
}

export interface StaticWagtailScreen<T extends AnyPageType> {
  component: React.ComponentType<StaticProps<T>>;
  getInitialData: undefined;
}

export type DynamicWagtailScreen<T extends AnyPageType> = AnyScreen<
  T,
  AnyWagtailPageProps<T>
>;

export type WagtailScreen<T extends AnyPageType> =
  | StaticWagtailScreen<T>
  | DynamicWagtailScreen<T>;

export const staticScreen = <T extends AnyPageType>(
  component: React.ComponentType<StaticProps<T>>
): StaticWagtailScreen<T> => {
  return {
    component,
    getInitialData: undefined,
  };
};

export const dynamicScreen = <
  T extends AnyPageType,
  P extends AnyWagtailPageProps<T>
>(
  component: React.ComponentType<P>,
  getInitialData: AnyInitialLoader<T, P>
): DynamicWagtailScreen<T> => {
  return {
    component,
    getInitialData,
  };
};
