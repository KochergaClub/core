import React from 'react';

import { Row } from '@kocherga/frontkit';

import VkIcon from './VkIcon';
import FbIcon from './FbIcon';

const SocialIcons = () => (
  <Row gutter={10}>
    <a href="https://www.facebook.com/kocherga.club/">
      <FbIcon />
    </a>
    <a href="http://vk.com/kocherga_club">
      <VkIcon />
    </a>
  </Row>
);

export default SocialIcons;
