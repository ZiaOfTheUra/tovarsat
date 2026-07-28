import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import * as serviceAuth from '@/services/auth'
import { doc, getDoc } from "firebase/firestore";
import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'
import { getColeccion, getDocumento } from '@/services/firestore'

// necesitamos los tipos para que typescript no se ponga a gritar cada que hacemos un elemento.funcion.

export type DatosModelo = {
  codigoModelo: string
  descripcion: string
  tecnologias: string
  marca: string
  nombreIdentificador: string
}
export type DatosInventario = {
  modeloId: string
  cantidad: number
  sedeId: string
}

/* 
Crear Modelo: 
    Entrada: Un codigo de modelo (string, unico), una descripción breve (string), una descripción de las tecnologías relevantes (string), una Marca, un nombre identificador (string)
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. Se verifica que no exista un numero de modelo igual, se pide autenticación biométrica.
    Proceso: Se recopila la información, se toma el UID del usuario que lo implementó, y se añade como usuario creador.
    Salida: Una entrada a la colección de Modelos en el Firestore.
*/ 

export async function guardarModelo(  datos: DatosModelo,  limpiarFormulario?: () => void): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol Almacenista
  const esAlmacenista = await serviceAuth.verificarRolUsuario('Almacenista')
  if (!esAlmacenista) throw Error("Permisos insuficientes")
  
  // Autenticación biométrica
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autenticación biométrica requerida',
    })
  if (!biometricAuth.success) {
      throw Error("Autenticación biométrica fallida")
    }
    
  // Verificar duplicados por código y nombre
  // resultado = objeto.funcion1().funcion2().funcion3()
  // resultado.funcion3.funcion4()
   // Autenticación biométrica
  

  const checkCodigo = await firestore()
    .collection('modelos')
    .where('codigoModelo', '==', datos.codigoModelo)
    .get()
  const checkNombre = await firestore()
    .collection('modelos')
    .where('nombreIdentificador', '==', datos.nombreIdentificador)
    .get()

  if (!checkCodigo.empty && !checkNombre.empty) {    throw Error("Ya existe ese Código y ese Nombre")}
  if (!checkCodigo.empty) {    throw Error("Ya existe ese Código")  }
  if (!checkNombre.empty) {    throw Error("Ya existe ese Nombre")  }

  // Crear modelo, rellenamos los datos para mandar con .add
  await firestore()
  .collection('modelos')
  .add({
    codigoModelo: datos.codigoModelo,
    nombreIdentificador: datos.nombreIdentificador,
    marca: datos.marca,
    descripcion: datos.descripcion,
    tecnologias: datos.tecnologias,
    creadoPor: usuario.uid,
    creadoEn: firestore.Timestamp.now(),
  })

  console.log("Modelo creado correctamente")

  // Limpiar formulario si se proporciona la función
  if (limpiarFormulario) {
    limpiarFormulario()
  }
}

/* 
Editar Modelo: 
    Entrada: Un ID de modelo, un codigo de modelo (string, unico), una descripción breve (string), una descripción de las tecnologías relevantes (string), una Marca, un nombre identificador (string)
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. Se verifica que no exista un numero de modelo igual (excluyendo el actual), se pide autenticación biométrica.
    Proceso: Se recopila la información, se toma el UID del usuario que lo editó, y se añade como usuario editor.
    Salida: Una entrada actualizada en la colección de Modelos en el Firestore.
*/ 

export async function editarModelo(
  modeloId: string,
  datos: DatosModelo,
): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol Almacenista
  const esAlmacenista = await serviceAuth.verificarRolUsuario('Almacenista')
  if (!esAlmacenista) throw Error("Permisos insuficientes")
  
  // Autenticación biométrica
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autenticación biométrica requerida',
    })
  if (!biometricAuth.success) {
      throw Error("Autenticación biométrica fallida")
    }  

  const checkCodigo = await firestore()
    .collection('modelos')
    .where('codigoModelo', '==', datos.codigoModelo)
    .get()
  const checkNombre = await firestore()
    .collection('modelos')
    .where('nombreIdentificador', '==', datos.nombreIdentificador)
    .get()

  // Filtramos para excluir el documento que estamos editando
  const codigoDuplicado = checkCodigo.docs.find(doc => doc.id !== modeloId)
  const nombreDuplicado = checkNombre.docs.find(doc => doc.id !== modeloId)

  if (codigoDuplicado && nombreDuplicado) {    throw Error("Ya existe ese Código y ese Nombre")}
  if (codigoDuplicado) {    throw Error("Ya existe ese Código")  }
  if (nombreDuplicado) {    throw Error("Ya existe ese Nombre")  }

  // Editar modelo, rellenamos los datos para mandar con .update
  await firestore()
  .collection('modelos')
  .doc(modeloId)
  .update({
    codigoModelo: datos.codigoModelo,
    nombreIdentificador: datos.nombreIdentificador,
    marca: datos.marca,
    descripcion: datos.descripcion,
    tecnologias: datos.tecnologias,
    editadoPor: usuario.uid,
    editadoEn: firestore.Timestamp.now(),
  })

  console.log("Modelo editado correctamente")
}

/* 
Crear Inventario: 
    Entrada: Una cantidad de equipamento, una sede (elegida de la base de datos).
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. Se pide autenticación biométrica. Se Verifica que no exista un inventario del item en la sede anteriormente.
    Proceso: El usuario debe elegir de la lista de Modelos preexistentes para añadir al sistema. Luego, se toma el UID del usuario que está implementando, y se añade como usuario creador. Si inventario >0, se checkea un booleano de disponible como true. Falso si ==0. 
    Salida: Una entrada a la colección de Inventario en el Firestore.
*/
export async function crearInventario(datos: DatosInventario): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol Almacenista
  const esAlmacenista = await serviceAuth.verificarRolUsuario('Almacenista')
  if (!esAlmacenista) throw Error("Permisos insuficientes")

  // Autenticación biométrica
  const biometricAuth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Autenticación biométrica requerida',
  })
  if (!biometricAuth.success) {
    throw Error("Autenticación biométrica fallida")
  }

  // Verificar que no exista inventario del mismo modelo en la misma sede
  const inventarioExistente = await firestore()
    .collection('inventario')
    .where('modeloId', '==', datos.modeloId)
    .where('sedeId', '==', datos.sedeId)
    .get()

  if (!inventarioExistente.empty) {
    throw Error("Ya existe inventario de este modelo en esta sede")
  }

  // Crear entrada en la colección de inventario
  await firestore().collection('inventario').add({
    modeloId: datos.modeloId,
    cantidad: datos.cantidad,
    sedeId: datos.sedeId,
    disponible: datos.cantidad > 0,
    creadoPor: usuario.uid,
    creadoEn: firestore.Timestamp.now(),
  })

  console.log("Inventario creado")
}

/* 
Editar Inventario: 
    Entrada: Un ID de inventario, una cantidad de equipamento, una sede (elegida de la base de datos).
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. Se pide autenticación biométrica. Se Verifica que no exista un inventario del item en la sede anteriormente (excluyendo el actual).
    Proceso: El usuario debe elegir de la lista de Modelos preexistentes para añadir al sistema. Luego, se toma el UID del usuario que está editando, y se añade como usuario editor. Si inventario >0, se checkea un booleano de disponible como true. Falso si ==0. 
    Salida: Una entrada actualizada en la colección de Inventario en el Firestore.
*/
export async function editarInventario(
  inventarioId: string,
  datos: DatosInventario,
): Promise<void> {
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // Seguridad: verificar rol Almacenista
  const esAlmacenista = await serviceAuth.verificarRolUsuario('Almacenista')
  if (!esAlmacenista) throw Error("Permisos insuficientes")

  // Autenticación biométrica
  const biometricAuth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Autenticación biométrica requerida',
  })
  if (!biometricAuth.success) {
    throw Error("Autenticación biométrica fallida")
  }

  // Verificar que no exista inventario del mismo modelo en la misma sede, excluyendo el actual
  const inventarioExistente = await firestore()
    .collection('inventario')
    .where('modeloId', '==', datos.modeloId)
    .where('sedeId', '==', datos.sedeId)
    .get()

  // Filtramos para excluir el documento que estamos editando
  const duplicado = inventarioExistente.docs.find(doc => doc.id !== inventarioId)

  if (duplicado) {
    throw Error("Ya existe inventario de este modelo en esta sede")
  }

  // Editar entrada en la colección de inventario (.update en vez de .add)
  await firestore().collection('inventario').doc(inventarioId).update({
    modeloId: datos.modeloId,
    cantidad: datos.cantidad,
    sedeId: datos.sedeId,
    disponible: datos.cantidad > 0,
    editadoPor: usuario.uid,
    editadoEn: firestore.Timestamp.now(),
  })

  console.log("Inventario editado correctamente")
}

export async function obtenerModelos(): Promise<{ label: string; value: string }[]> {
  const snapshot = await firestore().collection('modelos').get()
  return snapshot.docs.map((doc) => ({
    label: `${doc.data().nombreIdentificador} (${doc.data().codigoModelo})`,
    value: doc.id,
  }))
}

export async function obtenerSedes(): Promise<{ label: string; value: string }[]> {
  const snapshot = await firestore().collection('sedes').get()
  return snapshot.docs.map((doc) => ({
    label: `${doc.data().nombre} - ${doc.data().direccion}`,
    value: doc.id,
  }))
}

export async function exportarInventario(
  tipoExportacion: 'porModelo' | 'porCantidad' | 'stockBajo',
  cantidadMinima?: number,
): Promise<Record<string, any>> {
  // 🖊️ Implementar aquí
  throw new Error('No implementado')
}

// obtener la lista completa, para la pantalla y el display, la idea es tomar la sede y todos los datos del modelo y foraneas
export async function obtenerInventarioCompleto(): Promise<any[]> {
  const inventario = await getColeccion('inventario')
  console.log('objeto json desde firestore:', JSON.stringify(inventario, null, 2))
  
  // Enriquecer cada item con datos del modelo y sede
  const inventarioEnriquecido = await Promise.all(
    inventario.map(async (item: any) => {
      const [modelo, sede] = await Promise.all([
        //para cada item en el inbentario que obtenemos, tomamos el modeloid con el que viene
        //y buscamos en la coleccion de modelos en base al modeloid para obtener todos los datos relevantes
        item.modeloId ? getDocumento('modelos', item.modeloId) : null,
        //exactamente igual para las sedes, podemos obtener la sede relevante con su ID (mas que todo para tomar el nombre)
        item.sedeId ? getDocumento('sedes', item.sedeId) : null,
      ])
      //aca es donde juntamos todo en un diccionario
      const enriquecido = {
        ...item,
        modelo: modelo ? modelo.nombreIdentificador : 'Sin modelo',
        marca: modelo ? modelo.marca : 'Sin marca',
        codigoModelo: modelo ? modelo.codigoModelo : 'Sin código',
        sede: sede ? sede.nombre : 'Sin sede',
      }
      //el stringify convierte una lista de datos json a una string enorme con todo 
      console.log('logging:', JSON.stringify(enriquecido, null, 2))
      return enriquecido
    })
  )

  console.log('inventario logging', inventarioEnriquecido.length, 'items')
  return inventarioEnriquecido
}
