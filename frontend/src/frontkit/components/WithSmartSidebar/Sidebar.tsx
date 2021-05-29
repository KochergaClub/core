import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import styled from 'styled-components';

import * as colors from '../../colors';
import * as fonts from '../../fonts';
import { Row } from '../../layout/Row';
import { SidebarControls } from './types';

const DesktopContainer = styled.div`
  background-color: ${colors.grey[100]};
  height: 100%;
  border-right: 1px solid ${colors.grey[300]};
`;

const MobileContainerInner = styled(DesktopContainer)`
  border: none;
  cursor: auto;
`;

const MobileOverlay = styled.div`
  width: 100%;
  height: 100%;
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
  color: ${colors.primary[700]};
  font-size: ${fonts.sizes.SM};

  &:hover {
    background-color: ${colors.grey[200]};
  }
`;

const BottomControlsContainer = styled(CommonControlsContainer)`
  border-top: 1px solid ${colors.grey[300]};
`;

const BottomControls: React.FC<{ sidebar: SidebarControls }> = ({
  sidebar,
}) => {
  return (
    <BottomControlsContainer onClick={sidebar.toggle}>
      <Row vCentered gutter={0}>
        <BiChevronsLeft size={16} />
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

interface CornerProps {
  corner: 'left' | 'right';
}

const FloatingControlsContainer = styled(CommonControlsContainer)<CornerProps>`
  position: fixed;
  bottom: 0;
  ${(props) => (props.corner === 'right' ? 'right: -32px;' : 'left: 0;')}
  width: 32px;
  border-right: 1px solid ${colors.grey[300]};
  border-top: 1px solid ${colors.grey[300]};
  z-index: 1;
  background-color: ${colors.grey[100]};
`;

const FloatingControls: React.FC<
  { sidebar: SidebarControls } & CornerProps
> = ({ sidebar, corner }) => {
  return (
    <FloatingControlsContainer onClick={sidebar.toggle} corner={corner}>
      <BiChevronsRight size={16} />
    </FloatingControlsContainer>
  );
};

interface Props {
  sidebar: SidebarControls;
  render: (sidebar: SidebarControls) => React.ReactNode;
}

export const Sidebar: React.FC<Props> = ({ sidebar, render }) => {
  const withControls = (
    <SidebarWithControls sidebar={sidebar}>
      {render(sidebar)}
    </SidebarWithControls>
  );

  if (sidebar.isMobile === undefined) {
    return null; // still detecting screen width
  }

  return (
    <>
      {sidebar.isMobile ? (
        <AnimatePresence initial={false} key="mobile">
          {sidebar.visible && (
            <motion.div
              style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MobileContainer sidebar={sidebar}>
                {withControls}
              </MobileContainer>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence initial={false} key="desktop">
          {sidebar.visible && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
            >
              <DesktopContainer>{withControls}</DesktopContainer>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {!sidebar.visible && (
        <FloatingControls sidebar={sidebar} corner="left" key="controls" />
      )}
    </>
  );
};
