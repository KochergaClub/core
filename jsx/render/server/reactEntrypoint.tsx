import express from 'express';

import { matchPath, match as MatchObject } from 'react-router-dom';

import { routes } from '~/core/routes';

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

    // We'd like a strict version of url or redirect to its strict version (trailing slash normalization).
    if (
      !matchPath(req.path, {
        path: selectedRoute.path,
        exact: true,
        strict: true,
      })
    ) {
      // Our match is not strict, let's look for strict route.
      let newPath;
      if (req.path.endsWith('/')) {
        newPath = req.path.slice(0, -1);
      } else {
        newPath = req.path + '/';
      }
      // Let's check if new path is strict, just to be sure that we don't create any infinite loops.
      if (
        matchPath(newPath, {
          path: selectedRoute.path,
          exact: true,
          strict: true,
        })
      ) {
        // Great, let's redirect!
        res.redirect(302, newPath);
        return;
      } else {
        throw new Error(`Tried to find strict path for ${req.path} but failed`);
      }
    }

    const { screen } = selectedRoute;
    let props = {};
    if (screen.getInitialData) {
      props = await screen.getInitialData(req.reduxStore, {
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
