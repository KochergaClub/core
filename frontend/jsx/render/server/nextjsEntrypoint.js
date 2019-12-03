const { parse } = require('url');

exports.default = nextApp => async (req, res) => {
  const parsedUrl = parse(req.url, true);
  return nextApp.getRequestHandler()(req, res, parsedUrl);
};
