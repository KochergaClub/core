import { useEffect, useState } from 'react';
import useResizeAware from 'react-resize-aware';

import { Sidebar } from './Sidebar';
import { SidebarStatus } from './types';

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
  renderSidebar: (status: SidebarStatus) => React.ReactNode;
  renderContent: (status: SidebarStatus) => React.ReactNode;
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
    // this is not a bug with missing dep! we actually want to toggle sidebar on isMobile changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const status: SidebarStatus = {
    toggle: () => {
      setShowSidebar(!showSidebar);
    },
    visible: showSidebar,
    isMobile,
  };

  return (
    <div className="flex h-full relative">
      {resizeListener}
      <Sidebar status={status} render={renderSidebar} />
      <div className="flex-1 overflow-auto relative">
        {renderContent(status)}
      </div>
    </div>
  );
};
