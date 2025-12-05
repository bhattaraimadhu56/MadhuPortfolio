import { useState, useEffect, useCallback } from 'react';

/**
 * Admin Mode Hook
 * Manages the admin mode state and provides authentication
 * 
 * Features:
 * - Secret key combination (Ctrl+Shift+E) to toggle admin mode
 * - Password protection
 * - Persistent state across page reloads (sessionStorage)
 */

const ADMIN_PASSWORD = 'madhuadmin2025';
const SECRET_KEY_COMBO = { ctrl: true, shift: true, key: 'e' };

export interface AdminModeState {
  isAdminMode: boolean;
  isAuthenticated: boolean;
  showPasswordPrompt: boolean;
}

export const useAdminMode = () => {
  const [adminState, setAdminState] = useState<AdminModeState>(() => {
    // Check if admin mode was previously authenticated in this session
    const savedAuth = sessionStorage.getItem('adminAuthenticated');
    return {
      isAdminMode: savedAuth === 'true',
      isAuthenticated: savedAuth === 'true',
      showPasswordPrompt: false,
    };
  });

  // Handle secret key combination
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { ctrlKey, shiftKey, key } = event;
    
    if (
      ctrlKey === SECRET_KEY_COMBO.ctrl &&
      shiftKey === SECRET_KEY_COMBO.shift &&
      key.toLowerCase() === SECRET_KEY_COMBO.key
    ) {
      event.preventDefault();
      
      // If already authenticated, toggle off
      if (adminState.isAuthenticated) {
        setAdminState({
          isAdminMode: false,
          isAuthenticated: false,
          showPasswordPrompt: false,
        });
        sessionStorage.removeItem('adminAuthenticated');
      } else {
        // Show password prompt
        setAdminState(prev => ({
          ...prev,
          showPasswordPrompt: true,
        }));
      }
    }
  }, [adminState.isAuthenticated]);

  // Attach keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Authenticate with password
  const authenticate = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setAdminState({
        isAdminMode: true,
        isAuthenticated: true,
        showPasswordPrompt: false,
      });
      sessionStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  }, []);

  // Close password prompt
  const closePasswordPrompt = useCallback(() => {
    setAdminState(prev => ({
      ...prev,
      showPasswordPrompt: false,
    }));
  }, []);

  // Logout from admin mode
  const logout = useCallback(() => {
    setAdminState({
      isAdminMode: false,
      isAuthenticated: false,
      showPasswordPrompt: false,
    });
    sessionStorage.removeItem('adminAuthenticated');
  }, []);

  return {
    ...adminState,
    authenticate,
    closePasswordPrompt,
    logout,
  };
};
