const { parse } = require('url');

// const Server = require('next-server').default;

//export const nextjsEntrypoint = (nextApp: ReturnType<typeof Server>) => async (
//  req: express.Request,
//  res: express.Response,
//  _: express.NextFunction
exports.nextjsEntrypoint = nextApp => async (req, res) => {
  const parsedUrl = parse(req.url, true);

  return nextApp.getRequestHandler()(req, res, parsedUrl);
};
