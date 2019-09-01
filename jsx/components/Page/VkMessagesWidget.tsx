import * as React from 'react';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

declare global {
  interface Window {
    VK: any;
  }
}

const VkMessagesWidget: React.FC = () => {
  if (!publicRuntimeConfig.vkMessagesWidgetId) {
    return null;
  }

  React.useEffect(() => {
    window.VK.Widgets.CommunityMessages(
      'vk_community_messages',
      publicRuntimeConfig.vkMessagesWidgetId,
      {
        disableExpandChatSound: '1',
        tooltipButtonText: 'Есть вопрос?',
      }
    );
  }, []);
  return (
    <React.Fragment>
      <script src="https://vk.com/js/api/openapi.js?158" />
      <div id="vk_community_messages" />
    </React.Fragment>
  );
};

export default VkMessagesWidget;
