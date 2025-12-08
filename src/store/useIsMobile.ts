import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 1180) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkForDevice = () => window.innerWidth < breakpoint;
    setIsMobile(checkForDevice);

    const handlePageResized = () => {
      setIsMobile(checkForDevice());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handlePageResized);
      window.addEventListener('orientationchange', handlePageResized);
      window.addEventListener('load', handlePageResized);
      window.addEventListener('reload', handlePageResized);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handlePageResized);
        window.removeEventListener('orientationchange', handlePageResized);
        window.removeEventListener('load', handlePageResized);
        window.removeEventListener('reload', handlePageResized);
      }
    };
  }, []);

  return {
    isMobile,
  };
};
