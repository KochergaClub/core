const { parse } = require('url');

exports.default = async (req, res, next) => {
  const parsedUrl = parse(req.url, true);

  // TODO - check that this doesn't interfere with any native nextjs routes.
  if (parsedUrl.pathname.endsWith('/') && parsedUrl.pathname !== '/') {
    const newUrl = parsedUrl.pathname.slice(0, -1) + (parsedUrl.search || '');
    console.log(`detected trailing slash, redirecting to ${newUrl}`);
    res.redirect(302, newUrl);
    return;
  }
  next();
};
