import { StyleSheet, ViewStyle, TextStyle } from 'react-native'

// ── Sombras reutilizables ──────────────────────────────
const sombraBaja = { width: 0, height: 2 } as const
const sombraMedia = { width: 0, height: 4 } as const
const sombraCero = { width: 0, height: 0 } as const

export const sombraTarjeta: ViewStyle = {
  shadowOffset: sombraBaja, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2,
}
export const sombraBoton: ViewStyle = {
  shadowOffset: sombraBaja, shadowOpacity: 0.12, shadowRadius: 8, elevation: 10,
}
export const sombraLogin: ViewStyle = {
  shadowOffset: sombraMedia, shadowOpacity: 0.25, shadowRadius: 16, elevation: 8,
}
export const sombraLogo: ViewStyle = {
  shadowOffset: sombraCero, shadowOpacity: 0.4, shadowRadius: 20, elevation: 8,
}

// ── Tipografía reutilizable ────────────────────────────
export const texto14Negrita: TextStyle = { fontSize: 14, fontWeight: '600', lineHeight: 20 }
export const texto12Mayus: TextStyle = { fontSize: 12, fontWeight: '400', lineHeight: 16, letterSpacing: 0.05 }
export const icono18Negrita: TextStyle = { fontSize: 18, fontWeight: '600' }
export const icono20: TextStyle = { fontSize: 20 }
export const texto16Negrita: TextStyle = { fontSize: 16, fontWeight: '600', lineHeight: 22 }

// ── Layout reutilizable ────────────────────────────────
export const filaCentrada: ViewStyle = {
  flexDirection: 'row', alignItems: 'center',
}
export const filaCentradaEntre: ViewStyle = {
  flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
}
export const filaCentradaCentro: ViewStyle = {
  flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
}
export const botonBase: ViewStyle = {
  ...filaCentrada, gap: 8, minHeight: 44, borderRadius: 12,
}

export const screenStyles = StyleSheet.create({
  // === COMPARTIDOS ===
  contenidoDesplazamiento: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 24,
  },
  seccionEncabezado: {
    gap: 4,
    marginBottom: 8,
  },
  saludo: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.01,
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 20,
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 8,
  },

  // === PANEL PRINCIPAL ===
  seccionEstadisticas: {
    gap: 12,
  },
  cuadriculaEstadisticas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  accionesRapidas: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  botonAccion: {
    ...botonBase,
    paddingHorizontal: 16,
    paddingVertical: 10,
    ...sombraBoton,
  },
  iconoAccion: { ...icono18Negrita },
  etiquetaAccion: { ...texto14Negrita },
  botonAccionSecundario: {
    ...botonBase,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    ...sombraTarjeta,
  },
  etiquetaAccionSecundaria: { ...texto14Negrita },
  seccionActividad: {
    gap: 16,
  },
  encabezadoActividad: { ...filaCentradaEntre },
  verTodo: { ...texto14Negrita },
  listaActividad: {
    flexDirection: 'column',
    gap: 12,
  },

  // === REGISTRO ===
  contenedorProgreso: {
    width: '100%',
  },
  barraProgreso: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  rellenoProgreso: {
    height: '100%',
    borderRadius: 2,
  },
  contenedorFormulario: {
    borderRadius: 12,
    padding: 16,
    gap: 0,
    ...sombraTarjeta,
  },
  contenedorSeleccion: {
    marginBottom: 16,
  },
  etiquetaSeleccion: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 8,
  },
  activadorSeleccion: {
    ...filaCentradaEntre,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
  },
  textoSeleccion: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  iconoSeleccion: { ...icono18Negrita },
  botonEnviar: {
    ...filaCentradaCentro,
    gap: 8,
    minHeight: 44,
    borderRadius: 12,
    ...sombraBoton,
  },
  textoBotonEnviar: { ...texto14Negrita },
  iconoBotonEnviar: { ...icono18Negrita },

  // === INICIO DE SESIÓN ===
  contenedorLogin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  contenedorFormularioLogin: {
    width: '100%',
    maxWidth: 440,
    gap: 24,
    zIndex: 10,
  },
  encabezadoLogin: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  contenedorLogoLogin: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...sombraLogo,
  },
  iconoLogoLogin: { ...icono20 },
  tituloLogin: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
    letterSpacing: -0.02,
    marginBottom: 4,
  },
  subtituloLogin: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  panelCristal: {
    borderRadius: 12,
    padding: 24,
    gap: 16,
    ...sombraLogin,
  },
  grupoCampo: {
    flexDirection: 'column',
    gap: 4,
  },
  etiquetaCampo: {
    ...texto12Mayus,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  contenedorCampo: {
    ...filaCentrada,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 48,
  },
  iconoCampo: {
    position: 'absolute',
    left: 16,
    ...icono20,
  },
  campoTexto: {
    flex: 1,
    height: 48,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    borderRadius: 8,
  },
  encabezadoContrasena: {
    ...filaCentradaEntre,
    paddingHorizontal: 4,
  },
  olvidarContrasena: { ...texto12Mayus },
  alternarContrasena: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  botonBrillo: {
    ...filaCentradaCentro,
    gap: 8,
    minHeight: 64,
    borderRadius: 8,
    marginTop: 16,
    ...sombraLogin,
  },
  textoBotonBrillo: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
  },
  divisor: {
    ...filaCentrada,
    gap: 16,
    paddingVertical: 8,
  },
  lineaDivisor: {
    height: 1,
    flex: 1,
  },
  textoDivisor: { ...texto12Mayus },
  cuadriculaSocial: {
    flexDirection: 'row',
    gap: 16,
  },
  botonSocial: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    ...filaCentradaCentro,
    gap: 8,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  iconoBotonSocial: { ...icono20 },
  pieLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  enlacePie: { ...texto12Mayus },

  // === ASISTENCIAS ===
  tarjetaAsistencia: {
    ...filaCentradaEntre,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    minHeight: 64,
  },
  nombreColaborador: { ...texto16Negrita },
  detalleAsistencia: {
    fontSize: 13,
    lineHeight: 18,
  },
  horasTrabajadas: {
    fontSize: 12,
    lineHeight: 16,
  },
  estadoAsistencia: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  textoEstado: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },

  // === MODAL ===
  contenedorModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  contenedorModalInterno: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  inputModal: {
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 24,
  },
  inputModalMultiline: {
    minHeight: 80,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  botonCancelar: {
    ...filaCentradaCentro,
    gap: 8,
    minHeight: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    ...sombraTarjeta,
  },
  botonConfirmar: {
    ...filaCentradaCentro,
    gap: 8,
    minHeight: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    ...sombraBoton,
  },
})

// ── Helpers para modales con tema ──────────────────────
export const estilosModal = {
  superposicion: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 24,
  },
  tarjeta: {
    maxWidth: 440,
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  grupoCampo: {
    flexDirection: 'column' as const,
    gap: 8,
  },
  etiquetaCampoModal: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
  filaBotones: {
    flexDirection: 'row' as const,
    gap: 12,
    marginTop: 8,
  },
}
