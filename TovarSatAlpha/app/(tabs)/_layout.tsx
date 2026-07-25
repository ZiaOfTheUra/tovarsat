import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorSchemeSafe } from '@/hooks/use-color-scheme';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
  const colorScheme = useColorSchemeSafe();
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  const isAlmacenista = user?.rol === 'almacenista';
  const isTesoreriaGeneral = user?.rol === 'tesoreriaGeneral';
  const isGerenciaLocal = user?.rol === 'gerenciaLocal';
  const isOficinista = user?.rol === 'oficinista';

  const puedeInventario = isAlmacenista || isGerenciaLocal;
  const puedeTesoreria = isTesoreriaGeneral || isGerenciaLocal;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login' as any);
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: '/index' as any,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="asistencia"
        options={{
          title: 'Asistencia',
          href: '/asistencia' as any,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checkmark.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="registraras/importar-asistencia"
        options={{
          title: 'R. Asistencia',
          href: (isGerenciaLocal ? '/registraras/importar-asistencia' : null) as any,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.badge.plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tesoreria"
        options={{
          title: 'Tesorería',
          href: (isGerenciaLocal ? '/tesoreria' : null) as any,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="dollarsign.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tesoreria-admin"
        options={{
          title: 'Tesorería',
          href: (isTesoreriaGeneral ? '/tesoreria-admin' : null) as any,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="dollarsign.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventario"
        options={{
          title: 'Inventario',
          href: (isGerenciaLocal ? '/inventario' : null) as any,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="archivebox.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventario-admin"
        options={{
          title: 'Inventario',
          href: (isAlmacenista ? '/inventario-admin' : null) as any,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="archivebox.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mas"
        options={{
          title: 'Más',
          href: '/mas' as any,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="ellipsis.circle.fill" color={color} />,
        }}
      />
      
    </Tabs>
  );
}