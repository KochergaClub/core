import * as express from 'express';
import { NextServer } from 'next/dist/server/next';
import { parse } from 'url';

export default (nextApp: NextServer) => async (
  req: express.Request,
  res: express.Response
) => {
  const parsedUrl = parse(req.url, true);

  if (req.url.startsWith('/_next/')) {
    // necessary because we serve CSS from CDN, and sometimes Next.JS injects CSS with JS code.
    // So without this line we'd get "Not allowed to access cross-origin stylesheet" JS error on pages which load CSS dynamically.
    res.header('Access-Control-Allow-Origin', '*');
  }

  return nextApp.getRequestHandler()(req, res, parsedUrl);
};
