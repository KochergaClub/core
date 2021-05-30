import { useEffect, useState } from 'react';
import useResizeAware from 'react-resize-aware';
import styled from 'styled-components';

import { Sidebar } from './Sidebar';
import { SidebarControls } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Main = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const useIsMobile = () => {
  const [resizeListener, sizes] = useResizeAware();
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  const MAX_MOBILE_WIDTH = 640;
  useEffect(() => {
    if (sizes.width) {
      setIsMobile(sizes.width <= MAX_MOBILE_WIDTH);
    }
  }, [sizes.width]);

  return [isMobile, resizeListener];
};

interface Props {
  renderSidebar: (sidebar: SidebarControls) => React.ReactNode;
  renderContent: (sidebar: SidebarControls) => React.ReactNode;
}

export const WithSmartSidebar: React.FC<Props> = ({
  renderSidebar,
  renderContent,
}) => {
  const [isMobile, resizeListener] = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (isMobile === undefined) {
      // screen width not detected yet
      return;
    }
    if (isMobile && showSidebar) {
      setShowSidebar(false);
    } else if (!isMobile && !showSidebar) {
      setShowSidebar(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]); // this is not a bug with missing dep! we actually want to toggle sidebar on isMobile changes only

  const sidebar: SidebarControls = {
    toggle: () => {
      setShowSidebar(!showSidebar);
    },
    visible: showSidebar,
    isMobile,
  };

  return (
    <Container>
      {resizeListener}
      <Sidebar sidebar={sidebar} render={renderSidebar} />
      <Main>{renderContent(sidebar)}</Main>
    </Container>
  );
};
