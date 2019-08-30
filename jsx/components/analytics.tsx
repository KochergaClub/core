import React from 'react';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const FB_PIXEL_ID = publicRuntimeConfig.facebookPixelId;
export const GA_TRACKING_ID = publicRuntimeConfig.googleAnalyticsId;

declare global {
  interface Window {
    gtag: any;
  }
}

export const FacebookPixelScript = () => {
  if (!FB_PIXEL_ID) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${FB_PIXEL_ID}');
  fbq('track', 'PageView');`,
      }}
    />
  );
};

export const GoogleAnalyticsScript = () => (
  <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_TRACKING_ID}');`,
      }}
    />
  </>
);

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const gaPageview = (url: string) => {
  // hack to get the correct page title (via https://stackoverflow.com/a/54675433)
  window.setTimeout(() => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }, 0);
};
