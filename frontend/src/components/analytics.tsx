const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const VK_RETARGETING_ID = process.env.NEXT_PUBLIC_VK_RETARGETING_ID;

declare global {
  interface Window {
    gtag: any;
    ym: any;
  }
}

export const GoogleAnalyticsScript = () => {
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
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
};

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

export const YandexMetrikaScript = () => {
  if (!YANDEX_METRIKA_ID) {
    return null;
  }

  // watch.js is legacy but it should be much faster
  const mode: 'watch' | 'tag' = 'watch';

  switch (mode) {
    case 'watch':
      return (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function (d, w, c) {
  (w[c] = w[c] || []).push(function() {
    try {
      w.yaCounter${YANDEX_METRIKA_ID} = new Ya.Metrika({
        id:${YANDEX_METRIKA_ID},
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      });
    } catch(e) { }
  });

  var n = d.getElementsByTagName("script")[0],
    s = d.createElement("script"),
    f = function () { n.parentNode.insertBefore(s, n); };
  s.type = "text/javascript";
  s.async = true;
  s.src = "https://mc.yandex.ru/metrika/watch.js";

  if (w.opera == "[object Opera]") {
    d.addEventListener("DOMContentLoaded", f, false);
  } else { f(); }
})(document, window, "yandex_metrika_callbacks");`,
            }}
          />
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        </>
      );
    //    case 'tag':
    //      return (
    //        <script
    //          dangerouslySetInnerHTML={{
    //            __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    //        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    //      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    //
    //      ym(${YANDEX_METRIKA_ID}, "init", {
    //        clickmap:true,
    //        trackLinks:true,
    //        accurateTrackBounce:true,
    //        webvisor:true
    //      });`,
    //          }}
    //        />
    //      );
    default:
      throw new Error(`unknown mode ${mode}`);
  }
};

export const VkRetargetingScript = () => {
  if (!VK_RETARGETING_ID) {
    return null;
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?162",t.onload=function(){VK.Retargeting.Init("${VK_RETARGETING_ID}"),VK.Retargeting.Hit()},document.head.appendChild(t)}();`,
        }}
      />
      <noscript>
        <img
          src={`https://vk.com/rtrg?p=${VK_RETARGETING_ID}`}
          style={{ position: 'fixed', left: -999 }}
          alt=""
        />
      </noscript>
    </>
  );
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const trackPageview = (url: string) => {
  // hack to get the correct page title (via https://stackoverflow.com/a/54675433)
  window.setTimeout(() => {
    if (GA_TRACKING_ID) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }

    if (YANDEX_METRIKA_ID) {
      window.ym(YANDEX_METRIKA_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      });
    }

    // no need to track FB Pixel - it supports SPA already (TODO - check if that's true)
  }, 0);
};

interface GTagEventParams {
  category?: string;
  label?: string;
  value?: number;
  non_interaction?: boolean;
}

export const trackEvent = (action: string, params?: GTagEventParams) => {
  const { category, label, value, non_interaction } = params || {
    category: undefined,
    label: undefined,
    value: undefined,
    non_interaction: false,
  };

  if (GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
      non_interaction,
    });
  }
};
