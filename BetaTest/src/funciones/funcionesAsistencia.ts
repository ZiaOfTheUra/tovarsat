import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'

// crearAsistencia(horaEntrada)
// - Obtener UID del usuario autenticado
// - Verificar que no existe asistencia previa hoy
// - Asignar hora salida segun turno (11:50am o 5:00pm)
// - Calcular horas trabajadas
// - verificar entrada tardia (menos de 3 horas trabajadas)
// - Guardar documento en 'asistencias'

export async function crearAsistencia(horaEntrada: Date): Promise<void> {
  // - Obtener UID del usuario autenticado
  const uid = auth().currentUser?.uid; const usuario = auth().currentUser
  if (!usuario) throw Error("Usuario No Autenticado")
  
  const hoy = new Date().toISOString().split('T')[0]
  //odio hacer regexes con toda mi alma, honestamente el hecho de que esto funciona me jode


  // - Verificar que no existe asistencia previa hoy
  const snapshot = await firestore()
    .collection('asistencias')
    .where('uid', '==', usuario.uid)
    .get()
  // honestamente la forma mas legible es haciendo esto, se agarra el snapshot de las asistencias
  // del usuario para luego hacer el formato de los docs con el isostring para verificar que no
  // haya asistencias del dia. Se necesita el toIsoString porque firestore guarda los documentos 
  // como UTC y new Date guarda el timestamp en horario local. Split T divide el timestamp
  // un timestam utc se ve como: 2024-07-06T01:48:00.000Z, y al partirlo en T lo divide en dos
  // como ["2024-07-06", "01:48:00.000Z"], [0] nos permite tomar la primera mitad y comparar con el documento
    
  console.log(snapshot)
  const hoyISO = new Date().toISOString().split('T')[0]
  const existeHoy = snapshot.docs.some(doc => {
    const fechaDoc = doc.data().fechaEntrada.toDate()
    console.log(fechaDoc, fechaDoc.toISOString().split('T')[0] === hoyISO)
    return fechaDoc.toISOString().split('T')[0] === hoyISO
  })

  if (existeHoy) throw new Error("Asistencia Previa Hoy")
  
  //  Asignar hora salida segun turno (11:50am o 5:00pm)
  const hora = horaEntrada.getHours()
  console.log(hora)
  let horaSalida = new Date()
  if (hora < 12){ 
    horaSalida.setHours(11,50, 0 ,0)
  } else {
    horaSalida.setHours(17, 0, 0 , 0)
  }
  // - Calcular horas trabajadas
  const horasTrabajadas = ((horaSalida.getTime() - horaEntrada.getTime()) / (1000 * 60 * 60))
  // - verificar entrada tardia (menos de 3 horas trabajadas)
  console.log(horasTrabajadas)
  const entradaTardia = horasTrabajadas < 3

  // - Guardar documento en 'asistencias'
  console.log({    uid: usuario.uid,
    fechaEntrada: horaEntrada,
    fechaSalida: horaSalida,
    horas: horasTrabajadas,
    entradaTardia: entradaTardia,
    metodoMarcaje: 'biometria'})
  await firestore()
  .collection('asistencias')
  .add({
    uid: usuario.uid,
    fechaEntrada: horaEntrada,
    fechaSalida: horaSalida,
    horas: horasTrabajadas,
    entradaTardia: entradaTardia,
    metodoMarcaje: 'biometria'
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

  let listaFiltrada: string[] = []

  let asistenciasSnapshot
  if (rol == "gerenciaLocal"){
    // buscando los usuarios
    const snapshot1 = await firestore()
    .collection('usuarios')
    .where('sede', '==', sedeRequest)
    .get()
    // llenamos la lista de uids
    listaFiltrada = snapshot1.docs.map(doc => doc.id)
    // comparamos. hay un ligero problema, esto solo admite un máx de 10 en la listaFiltrada
    // whatever, lo arreglamos despues
    asistenciasSnapshot = await firestore()
    .collection('asistencias')
    .where('uid', 'in', listaFiltrada)
    .get()

  } else {
    //de otra forma literalmente no necesitamos nada, solamente el uid del usuario
    asistenciasSnapshot = await firestore()
    .collection('asistencias')
    .where('uid', '==', uid)
    .get()
  }

  
  // ahora bien, para poder retornar bien las horas de asistencia tenemos que
  // formatear la hora. esto es debido a que - de nuevo, tenemos problemas
  // con las entradas y salidas en UTC en el firestore. no solo eso, sino que
  // timestamp es un poco ilegible.

  function formatFechaHora(fecha: Date): string {
    return fecha.toLocaleTimeString([], { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Formatear fechas con localización nativa

  return asistenciasSnapshot.docs.map(doc=>{
    const data = doc.data()
    return {
      id: doc.id,
      nombre: datosUsuario?.nombre || '',
      usuarioID: data.uid,
      // porque asi? porque me da paja implementar una funcion que lo mas seguro nada mas use acá. 
      // si despues resulta ser de que no, bueno.
      // como funciona? tomamos el dato de la coleccion data. lo convertimos a date,
      // sacamos las horas, lo convertimos a string, y luego hacemos un poquito de alteracion de string
      // porque por defecto el getMinutes y getHours regresa las 5 de la mañana con 5 minutos como las 
      // 5:5. no como las 05:05. Y se ve horrible pa.
      fechaEntrada: data.fechaEntrada.toDate().getHours().toString().padStart(2, '0') + ":" + 
      data.fechaEntrada.toDate().getMinutes().toString().padStart(2, '0'),
      fechaSalida: data.fechaSalida.toDate().getHours().toString().padStart(2, '0') + ":" + 
      data.fechaSalida.toDate().getMinutes().toString().padStart(2, '0'),
      horasTrabajadas: data.horas}
    }
  )
}


// Tipos
export interface AsistenciaLista {
  id: string
  nombre: string
  usuarioID: string
  fechaEntrada: string
  fechaSalida: string
  horasTrabajadas: number
}
