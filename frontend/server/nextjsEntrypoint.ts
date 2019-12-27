import * as express from 'express';
import { parse } from 'url';

import Server from 'next/dist/next-server/server/next-server';

export default (nextApp: Server) => async (
  req: express.Request,
  res: express.Response
) => {
  const parsedUrl = parse(req.url, true);
  return nextApp.getRequestHandler()(req, res, parsedUrl);
};
