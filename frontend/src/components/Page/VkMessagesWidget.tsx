import React from 'react';

import getConfig from 'next/config';

declare global {
  interface Window {
    VK: any;
  }
}

const VkMessagesWidget: React.FC = () => {
  const widgetId = getConfig().publicRuntimeConfig.vkMessagesWidgetId;

  React.useEffect(() => {
    if (!widgetId) {
      return;
    }
    if (!window.VK) {
      console.error('window.VK is not loaded for some reason');
      return;
    }
    window.VK.Widgets.CommunityMessages('vk_community_messages', widgetId, {
      disableExpandChatSound: 1,
      disableButtonTooltip: 1,
      tooltipButtonText: 'Есть вопрос?',
    });
  }, []);

  if (!widgetId) {
    return null;
  }

  return (
    <React.Fragment>
      <script src="https://vk.com/js/api/openapi.js?158" />
      <div id="vk_community_messages" />
    </React.Fragment>
  );
};

export default VkMessagesWidget;
