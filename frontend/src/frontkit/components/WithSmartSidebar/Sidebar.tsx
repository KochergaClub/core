import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';

import { SidebarStatus } from './types';

const MobileContainer: React.FC<{ status: SidebarStatus }> = ({
  status,
  children,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const handleOverlayClick = (e: React.SyntheticEvent) => {
    if (e.target === overlayRef.current) {
      status.toggle();
    }
  };
  return (
    <div
      className="h-full flex cursor-pointer bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      ref={overlayRef}
    >
      <div className="bg-gray-100 cursor-auto">{children}</div>
    </div>
  );
};

const DesktopContainer: React.FC = ({ children }) => (
  <div className="bg-gray-100 h-full border-r border-gray-300">{children}</div>
);

const ControlsContainer: React.FC = ({ children }) => (
  <div className="flex justify-center items-center h-8 cursor-pointer bg-gray-100 hover:bg-gray-200 text-primary-700 text-sm">
    {children}
  </div>
);

const SidebarWithControls: React.FC<{ status: SidebarStatus }> = ({
  status,
  children,
}) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>{children}</div>
      <div className="border-t border-gray-300" onClick={status.toggle}>
        <ControlsContainer>
          <div className="flex items-center">
            <BiChevronsLeft size={16} />
            <div>Скрыть</div>
          </div>
        </ControlsContainer>
      </div>
    </div>
  );
};

const FloatingControls: React.FC<{ status: SidebarStatus }> = ({ status }) => {
  return (
    <div
      className="fixed left-0 bottom-0 w-8 border-r border-t border-gray-300 z-10"
      onClick={status.toggle}
    >
      <ControlsContainer>
        <BiChevronsRight size={16} />
      </ControlsContainer>
    </div>
  );
};

interface Props {
  status: SidebarStatus;
  render: (status: SidebarStatus) => React.ReactNode;
}

export const Sidebar: React.FC<Props> = ({ status, render }) => {
  const withControls = (
    <SidebarWithControls status={status}>{render(status)}</SidebarWithControls>
  );

  if (status.isMobile === undefined) {
    return null; // still detecting screen width
  }

  return (
    <>
      {status.isMobile ? (
        <AnimatePresence initial={false} key="mobile">
          {status.visible && (
            <motion.div
              className="fixed w-full h-full z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MobileContainer status={status}>{withControls}</MobileContainer>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence initial={false} key="desktop">
          {status.visible && (
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
      {!status.visible && <FloatingControls status={status} key="controls" />}
    </>
  );
};
