// Copy-pasted from next-redux-wrapper with Next.JS 9 types.
// (fixes via https://github.com/zeit/next.js/blob/master/UPGRADING.md#migrating-from-v8-to-v9)
import React from 'react';
import { Store } from 'redux';
import { NextPageContext } from 'next';
import { AppContext } from 'next/app';
declare const _default: (
  makeStore: MakeStore,
  config?: Config
) => (
  App: any
) => {
  new (props: any, context: any): {
    store: Store<any, import('redux').AnyAction>;
    render(): JSX.Element;
    context: any;
    setState<K extends never>(
      state:
        | {}
        | ((
            prevState: Readonly<{}>,
            props: Readonly<WrappedAppProps>
          ) => {} | Pick<{}, K>)
        | Pick<{}, K>,
      callback?: () => void
    ): void;
    forceUpdate(callBack?: () => void): void;
    readonly props: Readonly<WrappedAppProps> &
      Readonly<{
        children?: React.ReactNode;
      }>;
    state: Readonly<{}>;
    refs: {
      [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(
      nextProps: Readonly<WrappedAppProps>,
      nextState: Readonly<{}>,
      nextContext: any
    ): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(
      prevProps: Readonly<WrappedAppProps>,
      prevState: Readonly<{}>
    ): any;
    componentDidUpdate?(
      prevProps: Readonly<WrappedAppProps>,
      prevState: Readonly<{}>,
      snapshot?: any
    ): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(
      nextProps: Readonly<WrappedAppProps>,
      nextContext: any
    ): void;
    UNSAFE_componentWillReceiveProps?(
      nextProps: Readonly<WrappedAppProps>,
      nextContext: any
    ): void;
    componentWillUpdate?(
      nextProps: Readonly<WrappedAppProps>,
      nextState: Readonly<{}>,
      nextContext: any
    ): void;
    UNSAFE_componentWillUpdate?(
      nextProps: Readonly<WrappedAppProps>,
      nextState: Readonly<{}>,
      nextContext: any
    ): void;
  };
  displayName: string;
  getInitialProps: (
    appCtx: NextJSAppContext
  ) => Promise<{
    isServer: boolean;
    initialState: any;
    initialProps: {};
  }>;
  contextType?: React.Context<any>;
};
export default _default;
export interface Config {
  serializeState?: (any: any) => any;
  deserializeState?: (any: any) => any;
  storeKey?: string;
  debug?: boolean;
  overrideIsServer?: boolean;
}
export interface NextJSContext extends NextPageContext {
  store: Store;
  isServer: boolean;
}
export interface NextJSAppContext extends AppContext {
  ctx: NextJSContext;
}
export interface MakeStoreOptions extends Config, NextJSContext {
  isServer: boolean;
}
export declare type MakeStore = (
  initialState: any,
  options: MakeStoreOptions
) => Store;
export interface InitStoreOptions {
  initialState?: any;
  ctx?: NextJSContext;
}
export interface WrappedAppProps {
  initialProps: any;
  initialState: any;
  isServer: boolean;
}
export interface AppProps {
  store: Store;
}