import { hot } from 'react-hot-loader/root';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { Switch, Route } from 'react-router';

import { Store } from '~/redux/store';

import { routes, errorPages } from './routes';
import wagtailScreen from '~/wagtail/any';

import { RenderContext } from '~/render/types';

import ScreenWrapper from './ScreenWrapper';

interface Props {
  store: Store;

  // TODO - move page props to redux store entirely
  renderContext: RenderContext;
}

const Entrypoint = function(props: Props) {
  let insides;

  const pageInfo = props.renderContext.page;
  switch (pageInfo.type) {
    case 'wagtail':
      // TODO - keep react-router for wagtail pages too somehow, to support client-side navigation for wagtail pages.
      // (this will require a significant refactoring)
      const WagtailPageComponent = wagtailScreen.component;
      insides = <WagtailPageComponent {...pageInfo.props} />;
      break;
    case 'react':
      insides = (
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact
              render={routeProps => (
                <ScreenWrapper
                  screen={route.screen}
                  preloadedProps={pageInfo.props}
                  routeProps={routeProps}
                />
              )}
            />
          ))}
        </Switch>
      );
      break;
    case 'error':
      const Component = errorPages[pageInfo.code] || errorPages[500];
      insides = <Component />;
      break;
  }

  if (!insides) {
    throw new Error('Assertion failed: insides is not set');
  }

  return <ReduxProvider store={props.store}>{insides}</ReduxProvider>;
};

const HotEntrypoint = hot(Entrypoint);

export default HotEntrypoint;
