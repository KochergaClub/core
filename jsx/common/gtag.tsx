import React from 'react';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const GA_TRACKING_ID = publicRuntimeConfig.googleAnalyticsId;

declare global {
  interface Window {
    gtag: any;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  // hack to get the correct page title (via https://stackoverflow.com/a/54675433)
  window.setTimeout(() => {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }, 0);
};

export const ScriptTags = () => (
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
