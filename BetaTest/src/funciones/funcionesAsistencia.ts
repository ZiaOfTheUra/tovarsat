import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'

// crearAsistencia(horaEntrada)
// - Obtener UID del usuario autenticado
// - Verificar que la entrada este dentro de la ventana laboral (8:00 - 17:00)
// - Asignar el turno segun la hora de entrada (corte a las 11:50)
// - Verificar que no existe asistencia del mismo turno hoy (max 2 por dia, uno por turno)
// - Asignar hora salida prevista: entrada + 5 horas, con tope a las 17:00
// - Calcular horas trabajadas
// - verificar tiempo incompleto (menos de 3 horas trabajadas)
// - Guardar documento en 'asistencias'

export async function crearAsistencia(horaEntrada: Date): Promise<void> {
  // - Obtener UID del usuario autenticado
  const uid = auth().currentUser?.uid; const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")
  
  const hoy = new Date().toISOString().split('T')[0]
  //odio hacer regexes con toda mi alma, honestamente el hecho de que esto funciona me jode

  // - Verificar que la entrada este dentro de la ventana laboral (8:00 - 17:00)
  // horario de la sede, tomamos la hora con minutos en decimal para comparar con limpias
  const hora = horaEntrada.getHours()
  const minutos = horaEntrada.getMinutes()
  const horaDecimal = hora + minutos / 60
  if (horaDecimal < 8 || horaDecimal >= 17) throw new Error("Fuera de horario laboral (8:00 - 17:00)")

  // - Asignar el turno segun la hora de entrada. El corte es a las 11:50 como ya existia,
  // 11:50 en decimal es 11 + 50/60, si la entrada es antes => turno manana, si no => tarde
  const corteManana = 11 + 50 / 60
  const turno = horaDecimal < corteManana ? 'manana' : 'tarde'
  console.log(turno)

  // - Verificar que no existe asistencia del mismo turno hoy
  // honestamente la forma mas legible es haciendo esto, se agarra el snapshot de las asistencias
  // del usuario para luego hacer el formato de los docs con el isostring para verificar que no
  // haya asistencias del dia y del turno. Se necesita el toIsoString porque firestore guarda
  // los documentos como UTC y new Date guarda el timestamp en horario local. Split T divide el
  // timestamp un timestam utc se ve como: 2024-07-06T01:48:00.000Z, y al partirlo en T lo divide
  // en dos como ["2024-07-06", "01:48:00.000Z"], [0] nos permite tomar la primera mitad y comparar
  // con el documento
  const snapshot = await firestore()
    .collection('asistencias')
    .where('uid', '==', usuario.uid)
    .get()

  console.log(snapshot)
  const hoyISO = new Date().toISOString().split('T')[0]
  const existeTurnoHoy = snapshot.docs.some(doc => {
    const fechaDoc = doc.data().fechaEntrada.toDate()
    console.log(fechaDoc, fechaDoc.toISOString().split('T')[0] === hoyISO && doc.data().turno === turno)
    return fechaDoc.toISOString().split('T')[0] === hoyISO && doc.data().turno === turno
  })

  if (existeTurnoHoy) throw new Error("Asistencia ya registrada para este turno hoy")
  
  // - Asignar hora salida prevista: la entrada mas 5 horas, con tope a las 17:00 del mismo dia.
  // copia de la hora de entrada para no mutar el parametro original
  const horaSalida = new Date(horaEntrada.getTime())
  horaSalida.setHours(horaSalida.getHours() + 5)
  const topeSalida = new Date(horaEntrada.getTime())
  topeSalida.setHours(17, 0, 0, 0)
  if (horaSalida > topeSalida) horaSalida.setTime(topeSalida.getTime())

  // - Calcular horas trabajadas
  const horasTrabajadas = ((horaSalida.getTime() - horaEntrada.getTime()) / (1000 * 60 * 60))
  // - verificar tiempo incompleto (menos de 3 horas trabajadas)
  console.log(horasTrabajadas)
  const tiempoIncompleto = horasTrabajadas < 3

  // - Guardar documento en 'asistencias'
  console.log({    uid: usuario.uid,
    turno: turno,
    fechaEntrada: horaEntrada,
    fechaSalida: horaSalida,
    fechaSalidaReal: null,
    tipoSalida: 'automatica',
    horas: horasTrabajadas,
    tiempoIncompleto: tiempoIncompleto,
    diasExonerado: false,
    metodoMarcaje: 'biometria',
    creadoEn: firestore.Timestamp.now()})
  await firestore()
  .collection('asistencias')
  .add({
    uid: usuario.uid,
    turno: turno,
    fechaEntrada: horaEntrada,
    fechaSalida: horaSalida,
    fechaSalidaReal: null,
    tipoSalida: 'automatica',
    horas: horasTrabajadas,
    tiempoIncompleto: tiempoIncompleto,
    diasExonerado: false,
    metodoMarcaje: 'biometria',
    creadoEn: firestore.Timestamp.now()
  })
}

// marcarSalida()
// - Obtener UID del usuario autenticado
// - Buscar la asistencia del turno abierto de hoy (tipoSalida 'automatica')
// - Recalcular horas y tiempoIncompleto con la hora real de salida
// - Cerrar el turno (tipoSalida 'manual' y fechaSalidaReal)
export async function marcarSalida(): Promise<void> {
  // - Obtener UID del usuario autenticado
  const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // - Verificar que haya un turno abierto hoy (tipoSalida 'automatica')
  // nada mas puede haber un turno abierto a la vez, ya que crearAsistencia solo crea si no
  // existe otro del mismo turno y esperar a marcar salida para abrir el siguiente
  const snapshot = await firestore()
    .collection('asistencias')
    .where('uid', '==', usuario.uid)
    .get()

  const hoyISO = new Date().toISOString().split('T')[0]
  const turnoAbierto = snapshot.docs.find(doc => {
    const fechaDoc = doc.data().fechaEntrada.toDate()
    return fechaDoc.toISOString().split('T')[0] === hoyISO && doc.data().tipoSalida === 'automatica'
  })

  if (!turnoAbierto) throw new Error("No hay turno abierto hoy para marcar salida")

  // - Calcular horas trabajadas con la hora real de salida marcada
  const data = turnoAbierto.data()
  const fechaSalidaReal = new Date()
  const horasTrabajadas = ((fechaSalidaReal.getTime() - data.fechaEntrada.toDate().getTime()) / (1000 * 60 * 60))
  const tiempoIncompleto = horasTrabajadas < 3

  console.log('marcando salida', {
    fechaSalidaReal: fechaSalidaReal,
    horas: horasTrabajadas,
    tiempoIncompleto: tiempoIncompleto})

  // - Cerrar el turno, se mantiene fechaSalida prevista como referencia del turno teorico
  await firestore()
  .collection('asistencias')
  .doc(turnoAbierto.id)
  .update({
    fechaSalidaReal: fechaSalidaReal,
    tipoSalida: 'manual',
    horas: horasTrabajadas,
    tiempoIncompleto: tiempoIncompleto,
  })
}
// verificarBiometrica()
// - Usar expo-local-authentication
// - Llamar authenticateAsync()
// - Retornar true o lanzar error

export async function verificarBiometrica(): Promise<boolean> {
  //significativamente mas sencillo, en realidad esto es utilizar las funciones predefinidas
  // de expo local auth.  authenticateAsync es la funcion por exelencia para react native.
  // tan pancho
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Verificar identidad para marcar asistencia',
    disableDeviceFallback: false,
    cancelLabel: 'Cancelar'
  })
  
  if (!result.success) {
    throw new Error('Autenticación biométrica fallida')
  }
  
  return true
}

// verAsistencias()
// - Obtener UID y datos del usuario (rol, sede)
// - Si rol === 'gerenciaLocal': query where sede == sedeDelGerente
// - Sino: query where usuarioID == UID
// - Procesar resultados y retornar lista

export async function verAsistencias(): Promise<AsistenciaLista[]> {
  // - Obtener UID y datos del usuario (rol, sede)
  // primero hay que obtener la uid, obviamente
  const uid = auth().currentUser?.uid; const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")

  // luego podemos tomar la colección específica del usuario
  const usuarioDoc = await firestore()
  .collection('usuarios')
  .doc(uid)
  .get()
  
  // ahora llega la parte dificil. queremos que el gerente sea capaz de ver
  // todas las asistencias de su sede verdad? esto implica que tenemos que
  // primero tomar todos los usuarios de la sede mediante una search
  // en la tabla de usuarios en todos los que sean de la misma sede.
  // y necesitamos una lista de sus uids.
  const datosUsuario = usuarioDoc.data()
  const rol = datosUsuario?.rol 
  const sedeRequest = datosUsuario?.sede

  let asistenciasSnapshot
  // mapa de uid -> nombre para poner el nombre real de cada usuario en cada fila
  let mapaNombres: Record<string, string> = {}

  if (rol == "gerenciaLocal"){
    // buscando los usuarios
    const snapshot1 = await firestore()
    .collection('usuarios')
    .where('sede', '==', sedeRequest)
    .get()
    // llenamos la lista de uids y el mapa de nombres
    const listaFiltrada = snapshot1.docs.map(doc => doc.id)
    snapshot1.docs.forEach(doc => {
      mapaNombres[doc.id] = doc.data().nombre || ''
    })
    // comparamos. firestore solo admite un max de 10 uids por query 'in', asi que partimos
    // la lista en grupos de 10 y juntamos todos los resultados
    const asistenciasDocs: any[] = []
    for (let i = 0; i < listaFiltrada.length; i += 10) {
      const grupo = listaFiltrada.slice(i, i + 10)
      const snap = await firestore()
      .collection('asistencias')
      .where('uid', 'in', grupo)
      .get()
      asistenciasDocs.push(...snap.docs)
    }
    asistenciasSnapshot = { docs: asistenciasDocs }

  } else {
    //de otra forma literalmente no necesitamos nada, solamente el uid del usuario
    mapaNombres[usuario.uid] = datosUsuario?.nombre || ''
    asistenciasSnapshot = await firestore()
    .collection('asistencias')
    .where('uid', '==', uid)
    .get()
  }

  
  // ahora bien, para poder retornar bien las horas de asistencia tenemos que
  // formatear la hora. esto es debido a que - de nuevo, tenemos problemas
  // con las entradas y salidas en UTC en el firestore. no solo eso, sino que
  // timestamp es un poco ilegible.

  // pequeña utilidad para formatear la hora con doble digito, reutilizada para entrada,
  // salida prevista y salida real. porque por defecto el getMinutes y getHours regresa
  // las 5 de la mañana con 5 minutos como las 5:5. no como las 05:05. Y se ve horrible pa.
  function formatHora(fecha: Date): string {
    return fecha.getHours().toString().padStart(2, '0') + ":" + 
      fecha.getMinutes().toString().padStart(2, '0')
  }

  // Formatear fechas con localización nativa

  return asistenciasSnapshot.docs.map(doc=>{
    const data = doc.data()
    // en la vista mostramos la salida real si el usuario ya la marco, si no la prevista
    const fechaSalidaFinal = data.fechaSalidaReal
      ? data.fechaSalidaReal.toDate()
      : data.fechaSalida.toDate()
    return {
      id: doc.id,
      // usamos el mapa de nombres para el nombre real del usuario de cada fila
      nombre: mapaNombres[data.uid] || '',
      usuarioID: data.uid,
      turno: data.turno || '',
      fechaEntrada: formatHora(data.fechaEntrada.toDate()),
      fechaSalida: formatHora(fechaSalidaFinal),
      tipoSalida: data.tipoSalida || 'automatica',
      horasTrabajadas: data.horas || 0}
    }
  )
}


// Tipos
export interface AsistenciaLista {
  id: string
  nombre: string
  usuarioID: string
  turno: string
  fechaEntrada: string
  fechaSalida: string
  tipoSalida: string
  horasTrabajadas: number
}