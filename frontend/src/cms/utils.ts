export const normalizeSsrPath = (path: string) => {
  // TODO - this is sloppy, this code assumes both that page could have `?ssr=1` param and /ssr prefix, because rewrite in nextjsEntrypoint is not perfect.
  return path.replace(/^\/ssr\/?/, '').replace(/\?.*/, '');
};
