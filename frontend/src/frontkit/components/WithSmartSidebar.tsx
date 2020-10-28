import { useEffect, useRef, useState } from 'react';
import useResizeAware from 'react-resize-aware';
import styled from 'styled-components';

import { grey } from '../colors';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Sidebar = styled.div`
  background-color: ${grey[100]};
  align-self: stretch;
  border-right: 1px solid ${grey[300]};
`;

const MobileSidebarInner = styled(Sidebar)`
  border: none;
  cursor: auto;
`;

const MobileOverlay = styled.div`
  // cover entire container
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;

  // MobileSidebarInner needs to be position identically to Sidebar inside Container
  display: flex;
  flex-direction: row;

  cursor: pointer;
  background-color: rgba(0, 0, 0, 70%);
`;

const MobileSidebar: React.FC<{ close: () => void }> = ({
  close,
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target === overlayRef.current) {
      close();
    }
  };
  return (
    <MobileOverlay onClick={handleOverlayClick} ref={overlayRef}>
      <MobileSidebarInner>{children}</MobileSidebarInner>
    </MobileOverlay>
  );
};

const Main = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
  transform: translateZ(
    0
  ); // allows fixed elements relative to main, e.g. sidebar toggle; see e.g. https://stackoverflow.com/a/47495309 for details
`;

interface SidebarControls {
  toggle: () => void;
  visible: boolean;
  isMobile: boolean;
}

interface Props {
  renderSidebar: (sidebar: SidebarControls) => React.ReactNode;
  renderContent: (sidebar: SidebarControls) => React.ReactNode;
}

const useIsMobile = () => {
  const [resizeListener, sizes] = useResizeAware();
  const [isMobile, setIsMobile] = useState(false);

  const MAX_MOBILE_WIDTH = 640;
  useEffect(() => {
    setIsMobile(sizes.width <= MAX_MOBILE_WIDTH);
  }, [sizes.width]);

  return [isMobile, resizeListener];
};

export const WithSmartSidebar: React.FC<Props> = ({
  renderSidebar,
  renderContent,
}) => {
  const [isMobile, resizeListener] = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (isMobile && showSidebar) {
      setShowSidebar(false);
    } else if (!isMobile && !showSidebar) {
      setShowSidebar(true);
    }
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
      {showSidebar ? (
        isMobile ? (
          <MobileSidebar close={sidebar.toggle}>
            {renderSidebar(sidebar)}
          </MobileSidebar>
        ) : (
          <Sidebar>{renderSidebar(sidebar)}</Sidebar>
        )
      ) : null}
      <Main>{renderContent(sidebar)}</Main>
    </Container>
  );
};
