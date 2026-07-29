import { useState, useEffect } from 'react'
import { ScrollView, View, Text, Pressable, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { TarjetaEstadistica } from '@/components/TarjetaEstadistica'
import { ElementoActividad } from '@/components/ElementoActividad'
import { cerrarSesion } from '@/services/auth'
import * as serviceAuth from '@/services/auth'
import { getColeccion } from '@/services/firestore'
import { obtenerMovimientos } from '@/funciones/funcionesEnvios'
import { obtenerInventarioCompleto } from '@/funciones/funcionesInventario'
import { exportarInventarioCompleto, exportarInventarioPorSede, exportarInventarioPorMarca, exportarUsuarios, exportarAsistencias, exportarEnvios } from '@/funciones/funcionesExportacion'

export default function DashboardScreen() {
  const theme = useTheme()
  const router = useRouter()
  const [esAlmacenista, setEsAlmacenista] = useState(false)
  const [esGerencia, setEsGerencia] = useState(false)
  const [cargando, setCargando] = useState('')

  // Estados para las infocards
  const [asistenciasHoy, setAsistenciasHoy] = useState(0)
  const [enviosPorAprobar, setEnviosPorAprobar] = useState(0)
  const [nuevosItemsHoy, setNuevosItemsHoy] = useState(0)
  const [itemsAgotados, setItemsAgotados] = useState(0)

  // Funcion auxiliar para extraer la fecha (string YYYY-MM-DD) de un Timestamp o string
  const extraerFecha = (fecha: any): string => {
    if (!fecha) return ''
    if (fecha.toDate && typeof fecha.toDate === 'function') {
      return fecha.toDate().toISOString().split('T')[0]
    }
    const d = new Date(fecha)
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0]
  }

  // Verificar roles y cargar datos al montar
  useEffect(() => {
    (async () => {
      const [almacenista, gerencia] = await Promise.all([
        serviceAuth.verificarRolUsuario('almacenista'),
        serviceAuth.verificarRolUsuario('gerenciaLocal'),
      ])
      setEsAlmacenista(almacenista)
      setEsGerencia(gerencia)

      // Cargar datos para las infocards
      try {
        const hoy = new Date().toISOString().split('T')[0]

        // Asistencias de hoy (usando getColeccion directamente, no hay funcion existente)
        const asistencias = await getColeccion('asistencias')
        const asistenciasHoyCount = asistencias.filter((a: any) => {
          const fecha = extraerFecha(a.fechaEntrada)
          return fecha === hoy
        }).length
        setAsistenciasHoy(asistenciasHoyCount)

        // Envios por aprobar (reutilizando obtenerMovimientos de funcionesEnvios.ts)
        // Logica de estados:
        // - aprobado === true -> aprobado (no contar)
        // - aprobado === false y aprobadoPor existe -> denegado/cancelado (no contar)
        // - aprobado === false y NO tiene aprobadoPor -> pendiente (contar)
        const movimientos = await obtenerMovimientos()
        const enviosPendientes = movimientos.filter((m: any) => m.aprobado === false && !m.aprobadoPor).length
        setEnviosPorAprobar(enviosPendientes)

        // Inventario completo (reutilizando obtenerInventarioCompleto de funcionesInventario.ts)
        const inventario = await obtenerInventarioCompleto()

        // Items agotados
        const agotados = inventario.filter((item: any) => item.cantidad === 0).length
        setItemsAgotados(agotados)

        // Nuevos items hoy
        const nuevosHoy = inventario.filter((item: any) => {
          const fecha = extraerFecha(item.creadoEn)
          return fecha === hoy
        }).length
        setNuevosItemsHoy(nuevosHoy)
      } catch (e) {
        console.error('[dashboard] error al cargar datos:', e)
      }
    })()
  }, [])

  const handleExportar = async (nombreExportacion: string, fn: () => Promise<void>) => {
    setCargando(nombreExportacion)
    try {
      await fn()
      Alert.alert('Éxito', 'Archivo exportado correctamente')
    } catch (e: any) {
      Alert.alert('Error', e.message)
    } finally {
      setCargando('')
    }
  }

  const handleLogout = async () => {
    try {
      await cerrarSesion()
      router.replace('/login')
    } catch (e: any) {
      Alert.alert('Error', e.message)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />

      <ScrollView
        contentContainerStyle={screenStyles.contenidoDesplazamiento}
        showsVerticalScrollIndicator={false}
      >
        <View style={screenStyles.seccionEncabezado}>
          <Text style={[screenStyles.saludo, { color: theme.onSurface }]}>Inicio</Text>
        </View>

        <View style={{ gap: 16 }}>
          {/* Asistencias de hoy + exportaciones relevantes */}
          <View style={{ gap: 8 }}>
            <TarjetaEstadistica
              title="Asistencias de hoy."
              value={asistenciasHoy}
              trend=""
              icon="📝"
              fullWidth
              color="primary"
            />
            {esGerencia && (
              <View style={screenStyles.accionesRapidas}>
                <Pressable
                  style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
                  onPress={() => handleExportar('asistencias', exportarAsistencias)}
                  disabled={!!cargando}
                >
                  <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                    {cargando === 'asistencias' ? 'Exportando...' : 'Exportar Asistencias'}
                  </Text>
                </Pressable>
                <Pressable
                  style={[screenStyles.botonAccion, { backgroundColor: theme.secondary }]}
                  onPress={() => handleExportar('usuarios', exportarUsuarios)}
                  disabled={!!cargando}
                >
                  <Text style={[screenStyles.etiquetaAccion, { color: theme.onSecondary }]}>
                    {cargando === 'usuarios' ? 'Exportando...' : 'Exportar Usuarios'}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Envios por aprobar + exportacion relevante */}
          <View style={{ gap: 8 }}>
            <TarjetaEstadistica
              title="Envios por aprobar."
              value={enviosPorAprobar}
              icon="🚚"
              fullWidth
              color="secondary"
            />
            {esGerencia && (
              <View style={screenStyles.accionesRapidas}>
                <Pressable
                  style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
                  onPress={() => handleExportar('envios', exportarEnvios)}
                  disabled={!!cargando}
                >
                  <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                    {cargando === 'envios' ? 'Exportando...' : 'Exportar Envíos'}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Nuevos items hoy + exportaciones de inventario */}
          <View style={{ gap: 8 }}>
            <TarjetaEstadistica
              title="Nuevos items hoy."
              value={nuevosItemsHoy}
              icon="📦"
              fullWidth
              color="primary"
            />
            {esAlmacenista && (
              <View style={screenStyles.accionesRapidas}>
                <Pressable
                  style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
                  onPress={() => handleExportar('completo', exportarInventarioCompleto)}
                  disabled={!!cargando}
                >
                  <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                    {cargando === 'completo' ? 'Exportando...' : 'Exportar Completo'}
                  </Text>
                </Pressable>
                <Pressable
                  style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
                  onPress={() => handleExportar('porSede', exportarInventarioPorSede)}
                  disabled={!!cargando}
                >
                  <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                    {cargando === 'porSede' ? 'Exportando...' : 'Exportar por Sede'}
                  </Text>
                </Pressable>
                <Pressable
                  style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]}
                  onPress={() => handleExportar('porMarca', exportarInventarioPorMarca)}
                  disabled={!!cargando}
                >
                  <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>
                    {cargando === 'porMarca' ? 'Exportando...' : 'Exportar por Marca'}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Items agotados (sin exportacion adicional) */}
          <TarjetaEstadistica
            title="Items agotados."
            value={itemsAgotados}
            icon="⚠️"
            fullWidth
            color="error"
          />

          {/* Boton de logout */}
          <View style={{ marginTop: 24, alignItems: 'center' }}>
            <Pressable
              style={[screenStyles.botonAccion, { backgroundColor: theme.error, width: '100%' }]}
              onPress={handleLogout}
            >
              <Text style={[screenStyles.etiquetaAccion, { color: theme.onError }]}>
                Cerrar Sesión
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}