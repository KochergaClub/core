import TelegramIcon from '../../icons/TelegramIcon';
import VkIcon from '../../icons/VkIcon';

export const SocialIcons = () => (
  <div className="flex space-x-2">
    <a className="block" href="https://vk.com/kocherga_club">
      <VkIcon />
    </a>
    <a className="block" href="https://t.me/kocherga_club">
      <TelegramIcon />
    </a>
  </div>
);
