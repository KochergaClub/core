import express from 'express';

import { matchPath, match as MatchObject } from 'react-router-dom';

import { routes } from '~/routes';

import { sendEntrypointHtml } from './render';

export const reactEntrypoint: express.RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    let selectedMatch: MatchObject | undefined;
    const selectedRoute = routes.find(route => {
      const match = matchPath(req.path, {
        path: route.path,
        exact: true,
      });
      if (match) {
        selectedMatch = match;
        return true;
      }
    });

    if (!selectedRoute || !selectedMatch) {
      next('route');
      return;
    }

    const { screen } = selectedRoute;
    let props = {};
    if (screen.getInitialData) {
      props = await screen.getInitialData(req.reactContext, {
        params: selectedMatch.params,
        query: req.query,
      });
    }

    sendEntrypointHtml(
      {
        type: 'react',
        props,
      },
      req,
      res
    );
  } catch (err) {
    next(err);
  }
};
