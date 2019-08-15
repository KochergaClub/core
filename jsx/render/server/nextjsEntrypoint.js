const { parse } = require('url');

exports.default = nextApp => async (req, res) => {
  const parsedUrl = parse(req.url, true);

  // Trailing slash check happens _after_ wagtail routes, since wagtail routes usually require the trailing slash.
  // TODO - check that this doesn't interfere with any native nextjs routes.
  if (parsedUrl.pathname.endsWith('/') && parsedUrl.pathname !== '/') {
    const newUrl = parsedUrl.pathname.slice(0, -1) + (parsedUrl.search || '');
    console.log(`detected trailing slash, redirecting to ${newUrl}`);
    res.redirect(302, newUrl);
    return;
  }

  return nextApp.getRequestHandler()(req, res, parsedUrl);
};
