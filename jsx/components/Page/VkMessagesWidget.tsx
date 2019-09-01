import React from 'react';

import getConfig from 'next/config';

declare global {
  interface Window {
    VK: any;
  }
}

const VkMessagesWidget: React.FC = () => {
  if (!getConfig().vkMessagesWidgetId) {
    return null;
  }

  React.useEffect(() => {
    window.VK.Widgets.CommunityMessages(
      'vk_community_messages',
      getConfig().vkMessagesWidgetId,
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
