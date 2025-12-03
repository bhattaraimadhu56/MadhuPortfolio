import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook to scroll the window to the top whenever the route changes.
 */
export const useScrollToTop = () => {
  // useLocation returns the current path and a setter function
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to the top of the page smoothly on every location change
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]); // Re-run effect whenever the location changes
};
