import React, { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { loginWithEmail, logout as authLogout, onAuthChanged } from '@/services/auth';
import { fetchById } from '@/services/firestore';
import { COLLECTIONS } from '@/config';
import type { Usuario, AuthState, Sede } from '@/types';

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    console.log('[AuthProvider] Registrando listener de onAuthStateChanged');
    const unsubscribe = onAuthChanged(async (authUser) => {
      console.log('[AuthProvider] onAuthStateChanged disparado. authUser=', authUser ? authUser.uid : null);

      if (!authUser) {
        console.log('[AuthProvider] No hay usuario autenticado, limpiando estado');
        setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
        return;
      }

      try {
        // Obtener el documento completo de Usuario desde Firestore usando el uid de Auth
        console.log('[AuthProvider] Buscando documento en Firestore:', COLLECTIONS.USUARIOS, authUser.uid);
        const usuarioDoc = await fetchById<Usuario>(COLLECTIONS.USUARIOS, authUser.uid!);
        console.log('[AuthProvider] Documento encontrado:', usuarioDoc ? 'SÍ' : 'NO', 'activo=', usuarioDoc?.activo);

        if (!usuarioDoc || !usuarioDoc.activo) {
          // Usuario autenticado pero no existe en Firestore, o está desactivado
          console.log('[AuthProvider] Usuario no existe o está inactivo en Firestore - llamando logout');
          await authLogout();
          setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
          return;
        }

        // Resolver el nombre de la sede si el usuario tiene una sede ID
        let sedeNombre: string | undefined;
        if (usuarioDoc.sede) {
          console.log('[AuthProvider] Buscando sede:', COLLECTIONS.SEDES, usuarioDoc.sede);
          const sedeDoc = await fetchById<Sede>(COLLECTIONS.SEDES, usuarioDoc.sede);
          sedeNombre = sedeDoc?.nombre || usuarioDoc.sede;
          console.log('[AuthProvider] Sede resuelta:', sedeNombre);
        }

        // Firestore devuelve 'id' como doc ID, pero la app usa 'uid'
        const usuarioMapeado = { ...usuarioDoc, uid: usuarioDoc.id, sedeNombre };
        console.log('[AuthProvider] usuarioMapeado:', JSON.stringify(usuarioMapeado));
        setState({ user: usuarioMapeado, isAuthenticated: true, isLoading: false, error: null });
      } catch (err) {
        console.error('[AuthProvider] Error fetching user doc:', err);
        setState({ user: null, isAuthenticated: false, isLoading: false, error: 'Error de conexión' });
      }
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    console.log('[AuthProvider] login() llamado con email=', email);
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await loginWithEmail(email, password);
      console.log('[AuthProvider] loginWithEmail exitoso. Esperando onAuthStateChanged...');
      // El listener de estado de auth se encarga del resto (obtiene doc de Firestore, actualiza estado)
    } catch (err: any) {
      console.log('[AuthProvider] loginWithEmail falló:', err.code, err.message);
      const message =
        err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
          ? 'Credenciales inválidas'
          : err.code === 'auth/invalid-email'
            ? 'Correo electrónico inválido'
            : 'Error al iniciar sesión';
      setState({ user: null, isAuthenticated: false, isLoading: false, error: message });
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    console.log('[AuthProvider] logout() llamado');
    await authLogout();
    setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}