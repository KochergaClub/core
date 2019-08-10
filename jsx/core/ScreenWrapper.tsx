import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux';

import { RouteComponentProps } from 'react-router';

import { Screen } from '~/common/types';
import { parseQueryString } from '~/common/utils';

interface ScreenWrapperProps {
  screen: Screen<{}>;
  preloadedProps: any;
  routeProps: RouteComponentProps;
}

const ScreenWrapper = ({
  screen,
  routeProps,
  preloadedProps,
}: ScreenWrapperProps) => {
  const [hadTransitions, setHadTransitions] = useState(false);
  const [props, setProps] = useState(preloadedProps);
  const [loading, setLoading] = useState(false);

  const store = useStore();

  useEffect(() => {
    if (!hadTransitions) {
      setHadTransitions(true);
      return; // no data loading is needed on the first load
    }

    (async () => {
      if (!screen.getInitialData) {
        setProps({});
        return;
      }
      setLoading(true);
      const loadedProps = await screen.getInitialData(store, {
        params: routeProps.match.params,
        query: parseQueryString(routeProps.location.search),
      });
      setProps(loadedProps);
      setLoading(false);
    })();
  }, [routeProps.location]);

  if (loading) {
    // FIXME - return previous screen or spinner if transition is too slow
    return <div>&nbsp;</div>;
  }

  // on first render: preloadedProps
  // on location change: set "loading", call async, return spinner
  return <screen.component {...props} />;
};

export default ScreenWrapper;
