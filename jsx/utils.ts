export const getCSRFToken = () => {
  if (typeof document === 'undefined') {
    return ''; // server-side rendering doesn't support CSRF tokens (yet)
  }
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)csrftoken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
};
