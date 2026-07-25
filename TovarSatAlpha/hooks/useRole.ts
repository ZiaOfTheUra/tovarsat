import { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ROLES } from '@/config';
import type { Rol } from '@/types';

// Hook para verificar si el usuario tiene roles permitidos
// Uso:
//   const { hasRole, isAdmin } = useRole('tesoreriaGeneral');
export function useRole(allowedRoles: Rol | Rol[]) {
  const { user, isLoading } = useAuth();

  return useMemo(() => {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    const hasRole = user ? roles.includes(user.rol) : false;

    // Admin: Tesorería General o Gerencia Local (tienen acceso de escritura a tesorería)
    const isAdmin = user
      ? user.rol === ROLES.TESORERIA_GENERAL || user.rol === ROLES.GERENCIA_LOCAL
      : false;

    return { hasRole, isAdmin, isLoading };
  }, [user, isLoading, allowedRoles]);
}