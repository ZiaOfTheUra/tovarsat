import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import * as serviceAuth from '@/services/auth'
import { getColeccion, getDocumento } from '@/services/firestore'

// ─── TIPOS ──────────────────────────────────────────────────

export type DatosMovimiento = {
  inventarioId: string
  cantidad: number
  sedeOrigenId: string
  sedeDestinoId: string
  aprobado: boolean
}

export type DatosMovimientoConAprobacion = DatosMovimiento & {
  aprobadoPor?: string
  aprobadoEn?: any
}

/* 
Crear Movimiento de Inventario:
    Entrada: Un ID de inventario, una cantidad, una sede de origen, una sede de destino.
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. La biometría la verifica el componente.
    Proceso: Se registra el movimiento con aprobado: false. La aprobación corresponde a Gerencia Local.
    Salida: Una entrada a la colección de movimientoInventario en el Firestore.
*/
export async function crearMovimientoInventario(datos: DatosMovimiento): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol Almacenista (registra la petición de movimiento)
  const esAlmacenista = await serviceAuth.verificarRolUsuario('almacenista')
  if (!esAlmacenista) throw Error("Permisos insuficientes")

  // Registrar el movimiento en la coleccion (aprobado: false por defecto)
  await firestore().collection('movimientoInventario').add({
    inventarioId: datos.inventarioId,
    cantidad: datos.cantidad,
    sedeOrigenId: datos.sedeOrigenId,
    sedeDestinoId: datos.sedeDestinoId,
    aprobado: false,
    creadoPor: usuario.uid,
    creadoEn: firestore.Timestamp.now(),
  })

  console.log("Movimiento de inventario creado correctamente")
}

/* 
Editar Movimiento (solo datos, no aprobacion):
    Entrada: Un ID de movimiento, los datos editables.
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. La biometría la verifica el componente.
    Proceso: Se actualizan los datos del movimiento sin tocar el campo aprobado.
    Salida: Entrada actualizada en movimientoInventario.
*/
export async function editarMovimientoDatos(
  movimientoId: string,
  datos: DatosMovimiento,
): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol Almacenista (edita la petición mientras no esté procesada)
  const esAlmacenista = await serviceAuth.verificarRolUsuario('almacenista')
  if (!esAlmacenista) throw Error("Permisos insuficientes")

  // Editar solo los datos, no se cambia aprobado
  await firestore()
    .collection('movimientoInventario')
    .doc(movimientoId)
    .update({
      inventarioId: datos.inventarioId,
      cantidad: datos.cantidad,
      sedeOrigenId: datos.sedeOrigenId,
      sedeDestinoId: datos.sedeDestinoId,
      editadoPor: usuario.uid,
      editadoEn: firestore.Timestamp.now(),
    })

  console.log("Movimiento editado correctamente")
}

/* 
Aprobar Movimiento (solo aprobacion, GerenciaLocal):
    Entrada: Un ID de movimiento, booleano de aprobacion.
    Seguridad: Se verifica que el usuario sea user.rol==gerenciaLocal. La biometría la verifica el componente.
    Proceso: Al aprobar, se ejecuta la transferencia real de stock entre sedes.
    Salida: Movimiento actualizado con aprobado, aprobadoPor, aprobadoEn.
*/
export async function editarMovimientoAprobacion(
  movimientoId: string,
  aprobado: boolean,
): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol GerenciaLocal (aprueba o deniega las peticiones del Almacenista)
  const esGerenciaLocal = await serviceAuth.verificarRolUsuario('gerenciaLocal')
  if (!esGerenciaLocal) throw Error("Permisos insuficientes")

  // Obtener el movimiento actual
  const movimientoDoc = await firestore()
    .collection('movimientoInventario')
    .doc(movimientoId)
    .get()

  if (!movimientoDoc.exists) {
    throw Error("Movimiento no encontrado")
  }

  const movimiento = movimientoDoc.data() as DatosMovimiento

  if (aprobado) {
    // Transferir stock: descontar de origen, sumar a destino
    // Obtener inventario de origen
    const invOrigenSnapshot = await firestore()
      .collection('inventario')
      .where('modeloId', '==', movimiento.inventarioId)
      .where('sedeId', '==', movimiento.sedeOrigenId)
      .get()

    if (invOrigenSnapshot.empty) {
      throw Error("No hay inventario disponible en la sede de origen")
    }

    const invOrigenDoc = invOrigenSnapshot.docs[0]
    const invOrigen = invOrigenDoc.data()
    const nuevaCantidadOrigen = invOrigen.cantidad - movimiento.cantidad

    if (nuevaCantidadOrigen < 0) {
      throw Error("Stock insuficiente en la sede de origen")
    }

    // Descontar de origen
    await firestore()
      .collection('inventario')
      .doc(invOrigenDoc.id)
      .update({
        cantidad: nuevaCantidadOrigen,
        disponible: nuevaCantidadOrigen > 0,
      })

    // Verificar si ya existe inventario del mismo modelo en sede destino
    const invDestinoSnapshot = await firestore()
      .collection('inventario')
      .where('modeloId', '==', movimiento.inventarioId)
      .where('sedeId', '==', movimiento.sedeDestinoId)
      .get()

    if (!invDestinoSnapshot.empty) {
      // Ya existe → sumar cantidad
      const invDestinoDoc = invDestinoSnapshot.docs[0]
      const invDestino = invDestinoDoc.data()
      await firestore()
        .collection('inventario')
        .doc(invDestinoDoc.id)
        .update({
          cantidad: invDestino.cantidad + movimiento.cantidad,
          disponible: true,
        })
    } else {
      // No existe → crear nuevo
      await firestore().collection('inventario').add({
        modeloId: movimiento.inventarioId,
        cantidad: movimiento.cantidad,
        sedeId: movimiento.sedeDestinoId,
        disponible: true,
        creadoPor: usuario.uid,
        creadoEn: firestore.Timestamp.now(),
      })
    }
  }

  // Actualizar el movimiento con la aprobacion
  await firestore()
    .collection('movimientoInventario')
    .doc(movimientoId)
    .update({
      aprobado: aprobado,
      aprobadoPor: usuario.uid,
      aprobadoEn: firestore.Timestamp.now(),
    })

  console.log(aprobado ? "Movimiento aprobado correctamente" : "Movimiento rechazado")
}

/* 
Obtener todos los movimientos con datos enriquecidos.
*/
export async function obtenerMovimientos(): Promise<any[]> {
  const movimientos = await getColeccion('movimientoInventario')

  const movimientosEnriquecidos = await Promise.all(
    movimientos.map(async (item: any) => {
      // El inventario tiene modeloId, necesitamos obtenerlo
      const [inventario, sedeOrigen, sedeDestino] = await Promise.all([
        item.inventarioId ? getDocumento('inventario', item.inventarioId) : null,
        item.sedeOrigenId ? getDocumento('sedes', item.sedeOrigenId) : null,
        item.sedeDestinoId ? getDocumento('sedes', item.sedeDestinoId) : null,
      ])

      // Obtener modelo a partir del inventario
      const modelo = inventario?.modeloId ? await getDocumento('modelos', inventario.modeloId) : null

      const enriquecido = {
        ...item,
        modelo: modelo ? modelo.nombreIdentificador : 'Sin modelo',
        modeloMarca: modelo ? modelo.marca : 'Sin marca',
        modeloCodigo: modelo ? modelo.codigoModelo : 'Sin código',
        sedeOrigen: sedeOrigen ? sedeOrigen.nombre : 'Sin sede',
        sedeDestino: sedeDestino ? sedeDestino.nombre : 'Sin sede',
        estadoAprobacion: item.aprobado 
          ? 'Aprobado' 
          : item.aprobadoPor 
            ? 'Denegado' 
            : 'Sin Procesar',
      }
      return enriquecido
    })
  )

  return movimientosEnriquecidos
}