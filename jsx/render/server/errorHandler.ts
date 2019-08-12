import express from 'express';

//import { APIError } from '~/common/api';
//import { selectUser } from '~/core/selectors';

//import { setupFallbackStore } from './globalContext';

const getSendError = (req: express.Request, res: express.Response) => {
  return (code: number) => {
    res.status(code);
    res.send('ERROR');
    //sendEntrypointHtml(
    //  {
    //    type: 'error',
    //    code,
    //  },
    //  req,
    //  res
    //);
  };
};

export const notFoundHandler: express.RequestHandler = (req, res, _) => {
  getSendError(req, res)(404);
};

export const errorHandler: express.ErrorRequestHandler = (err, req, res, _) => {
  console.error(err);

  //if (!req.reduxStore) {
  //  setupFallbackStore(req);
  //}

  //if (!req.reduxStore) {
  //  throw new Error(
  //    "Internal code error - setupFallbackStore didn't setup the store"
  //  );
  //}

  //const user = selectUser(req.reduxStore.getState());

  //if (err instanceof APIError && err.status === 403 && !user.is_authenticated) {
  //  const nextUrl = encodeURIComponent(req.url);
  //  res.redirect(302, `/login?next=${nextUrl}`);
  //  return;
  //}

  const sendError = getSendError(req, res);

  //if (
  //  err instanceof APIError &&
  //  (err.status === 404 || err.status === 403 || err.status === 400)
  //) {
  //  sendError(err.status);
  //  return;
  //}

  sendError(500);
};
