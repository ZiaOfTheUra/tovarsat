import { useContext } from 'react';
import { AuthContext, type AuthContextValue } from '@/providers/AuthProvider';

/**
 * Hook to access authentication state and actions.
 * Must be used within an AuthProvider.
 *
 * @returns {AuthContextValue} { user, isAuthenticated, isLoading, error, login, logout }
 *
 * @example
 * ```tsx
 * const { user, isAuthenticated, isLoading, login, logout } = useAuth();
 *
 * if (isLoading) return <Splash />;
 * if (!isAuthenticated) return <LoginScreen />;
 * return <Dashboard user={user} />;
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}