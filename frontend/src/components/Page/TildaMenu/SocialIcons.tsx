import styled from 'styled-components';
import { Row } from '@kocherga/frontkit';

import VkIcon from './VkIcon';
import TelegramIcon from './TelegramIcon';

const NarrowA = styled.a`
  line-height: 0;
`;

const SocialIcons = () => (
  <Row gutter={10}>
    <NarrowA href="https://vk.com/kocherga_club">
      <VkIcon />
    </NarrowA>
    <NarrowA href="https://teleg.run/kocherga_club">
      <TelegramIcon />
    </NarrowA>
  </Row>
);

export default SocialIcons;
