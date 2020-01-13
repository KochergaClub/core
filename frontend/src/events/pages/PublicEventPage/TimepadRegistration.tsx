import { useEffect } from 'react';

import { IS_SERVER } from '~/common/utils';

import { CommonProps } from './types';

const TimepadRegistration: React.FC<CommonProps> = ({ event }) => {
  useEffect(() => {
    if (IS_SERVER) {
      return;
    }

    const timepadAnnouncement = event.announcements.timepad;

    if (!timepadAnnouncement) {
      return;
    }
    const timepadLink = timepadAnnouncement.link;
    const match = timepadLink.match(/event\/(\d+)/);
    if (!match) {
      return;
    }

    const timepadEventId = match[1];

    const el = document.getElementById('timepad-registration-widget');
    if (!el) {
      return;
    }
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    const script = document.createElement('script');
    script.setAttribute(
      'src',
      'https://timepad.ru/js/tpwf/loader/min/loader.js'
    );
    script.setAttribute('data-timepad-customized', '18379');
    script.setAttribute('data-twf2s-event--id', timepadEventId);
    script.setAttribute('data-timepad-widget-v2', 'event_register');
    el.appendChild(script);
  });

  return (
    <div>
      <div id="timepad-registration-widget" />
    </div>
  );
};

export default TimepadRegistration;
