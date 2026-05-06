import { useState, useCallback } from 'react';
import { validateCredentials, saveSession, clearSession } from '../models/authModel.js';

export const useAuthController = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (u, p) => {
    setError('');
    const result = validateCredentials(u, p);
    if (!result.success) {
      setError(result.error);
      return false;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    saveSession(result.user);
    setUsername(result.user.displayName);
    setIsAuthenticated(true);
    setLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, username, error, loading, login, logout };
};