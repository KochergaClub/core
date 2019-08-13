import express from 'express';

export const errorHandler: express.ErrorRequestHandler = (err, req, res, _) => {
  console.error(err);

  // const sendError = getSendError(req, res);

  //if (
  //  err instanceof APIError &&
  //  (err.status === 404 || err.status === 403 || err.status === 400)
  //) {
  //  sendError(err.status);
  //  return;
  //}
};
