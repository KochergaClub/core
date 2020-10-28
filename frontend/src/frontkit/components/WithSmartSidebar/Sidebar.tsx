import { useRef } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import styled from 'styled-components';

import { grey } from '../../colors';
import { Row } from '../../layout/Row';
import { SidebarControls } from './types';

const DesktopContainer = styled.div`
  background-color: ${grey[100]};
  height: 100%;
  border-right: 1px solid ${grey[300]};
`;

const MobileContainerInner = styled(DesktopContainer)`
  border: none;
  cursor: auto;
`;

const MobileOverlay = styled.div`
  // cover entire container
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;

  // MobileSidebarInner needs to be positioned identically to Sidebar inside Container
  display: flex;
  flex-direction: row;

  cursor: pointer;
  background-color: rgba(0, 0, 0, 50%);
`;

const MobileContainer: React.FC<{ sidebar: SidebarControls }> = ({
  sidebar,
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target === overlayRef.current) {
      sidebar.toggle();
    }
  };
  return (
    <MobileOverlay onClick={handleOverlayClick} ref={overlayRef}>
      <MobileContainerInner>{children}</MobileContainerInner>
    </MobileOverlay>
  );
};

const CommonControlsContainer = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${grey[200]};
  }
`;

const BottomControlsContainer = styled(CommonControlsContainer)`
  border-top: 1px solid ${grey[300]};
`;

const BottomControls: React.FC<{ sidebar: SidebarControls }> = ({
  sidebar,
}) => {
  return (
    <BottomControlsContainer onClick={sidebar.toggle}>
      <Row vCentered gutter={0}>
        <BiChevronsLeft size={24} />
        <div>Скрыть</div>
      </Row>
    </BottomControlsContainer>
  );
};

const SidebarWithControls: React.FC<{ sidebar: SidebarControls }> = ({
  sidebar,
  children,
}) => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>{children}</div>
      <BottomControls sidebar={sidebar} />
    </div>
  );
};

const FloatingControlsContainer = styled(CommonControlsContainer)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 32px;
  border-right: 1px solid ${grey[300]};
  border-top: 1px solid ${grey[300]};
  z-index: 1;
`;

const FloatingControls: React.FC<{ sidebar: SidebarControls }> = ({
  sidebar,
}) => {
  return (
    <FloatingControlsContainer onClick={sidebar.toggle}>
      <BiChevronsRight size={24} />
    </FloatingControlsContainer>
  );
};

interface Props {
  sidebar: SidebarControls;
  render: (sidebar: SidebarControls) => React.ReactNode;
}

export const Sidebar: React.FC<Props> = ({ sidebar, render }) => {
  if (!sidebar.visible) {
    return <FloatingControls sidebar={sidebar} />; // TODO - return fixed control button
  }

  const withControls = (
    <SidebarWithControls sidebar={sidebar}>
      {render(sidebar)}
    </SidebarWithControls>
  );

  if (sidebar.isMobile) {
    return <MobileContainer sidebar={sidebar}>{withControls}</MobileContainer>;
  } else {
    return <DesktopContainer>{withControls}</DesktopContainer>;
  }
};
