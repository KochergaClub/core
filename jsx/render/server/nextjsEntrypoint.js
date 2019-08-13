const { parse } = require('url');

exports.nextjsEntrypoint = nextApp => async (req, res) => {
  const parsedUrl = parse(req.url, true);

  if (parsedUrl.pathname.startsWith('/blog')) {
    return nextApp.render(req, res, '/wagtail-any', parsedUrl.query);
  }

  // Trailing slash check happens _after_ wagtail routes, since wagtail routes usually require the trailing slash.
  if (parsedUrl.pathname.endsWith('/') && parsedUrl.pathname !== '/') {
    const newUrl = parsedUrl.pathname.slice(0, -1) + (parsedUrl.search || '');
    console.log(`detected trailing slash, redirecting to ${newUrl}`);
    res.redirect(302, newUrl);
    return;
  }

  return nextApp.getRequestHandler()(req, res, parsedUrl);
};
