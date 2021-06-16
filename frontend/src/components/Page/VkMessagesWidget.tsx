import { useEffect } from 'react';

declare global {
  interface Window {
    VK: any;
  }
}

export const VkMessagesWidget: React.FC = () => {
  const widgetId = process.env.NEXT_PUBLIC_VK_MESSAGES_WIDGET_ID;

  useEffect(() => {
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
  }, [widgetId]);

  if (!widgetId) {
    return null;
  }

  return (
    <>
      <script defer src="https://vk.com/js/api/openapi.js?158" />
      <div id="vk_community_messages" />
    </>
  );
};
