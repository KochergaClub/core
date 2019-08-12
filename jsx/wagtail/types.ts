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

export type DynamicWagtailScreen<
  T extends AnyPageType,
  P extends AnyWagtailPageProps<T>
> = AnyScreen<T, P>;

export type WagtailScreen<
  T extends AnyPageType,
  P extends AnyWagtailPageProps<T>
> = StaticWagtailScreen<T> | DynamicWagtailScreen<T, P>;

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
): DynamicWagtailScreen<T, P> => {
  return {
    component,
    getInitialData,
  };
};
