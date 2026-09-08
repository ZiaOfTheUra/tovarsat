# Firestore — Esquema actual

Estado actual de las colecciones de la base de datos, tal como las utilizan los archivos
de `src/funciones/`. Documento de referencia (snapshot tras la Fase 1 y la Fase 2:
inversión de roles en Almacén y rediseño de Asistencia con data limpia — sin migración).

Leyenda:
- Tipo `Timestamp` = `firestore.Timestamp` (UTC).
- Campos marcados ⚠️ = inconsistencias o bugs conocidos (detalle al final).

---

## Colección `usuarios`
Documentos con ID = UID del usuario en Firebase Auth.
Usada por: `funcionesRegistro.ts`, `funcionesEnvios.ts` (solo lectura), `funcionesAsistencia.ts` (solo lectura), `funcionesExportacion.ts` (solo lectura).

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | string | Nombre del usuario |
| `email` | string | Correo (mismo que Firebase Auth) |
| `rol` | string | `gerenciaLocal` \| `almacenista` \| `oficinista` |
| `sede` | string | ID del documento en la colección `sedes` |
| `activo` | boolean | `false` deshabilita al usuario en `verificarRolUsuario` |

---

## Colección `sedes`
ID automático.
Usada por: `funcionesRegistro.ts`, `funcionesInventario.ts`, `funcionesExportacion.ts` (solo lectura).

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | string | Nombre de la sede |
| `direccion` | string | Dirección de la sede |

> Nota: `email` y `telefono` aparecen en AppPlan.md como deseados, pero ninguna función los escribe ni lee hoy.

---

## Colección `modelos`
ID automático.
Usada por: `funcionesInventario.ts`, `funcionesExportacion.ts` (solo lectura), `funcionesEnvios.ts` (solo lectura).

| Campo | Tipo | Descripción |
|---|---|---|
| `codigoModelo` | string | Código único (unicidad verificada en app) |
| `nombreIdentificador` | string | Nombre único (unicidad verificada en app) |
| `marca` | string | Marca |
| `descripcion` | string | Descripción breve |
| `tecnologias` | string | Tecnologías relevantes |
| `creadoPor` | string | UID del usuario que lo creó |
| `creadoEn` | Timestamp | Server time al crear |
| `editadoPor` | string | UID del último editor (solo tras editar) |
| `editadoEn` | Timestamp | Server time al editar (solo tras editar) |

---

## Colección `inventario`
ID automático.
Usada por: `funcionesInventario.ts`, `funcionesEnvios.ts` (solo lectura/escritura al aprobar), `funcionesExportacion.ts` (solo lectura).

| Campo | Tipo | Descripción |
|---|---|---|
| `modeloId` | string | ID del documento en `modelos` |
| `sedeId` | string | ID del documento en `sedes` |
| `cantidad` | number | Cantidad de unidades |
| `disponible` | boolean | `true` si `cantidad > 0` |
| `creadoPor` | string | UID del creador |
| `creadoEn` | Timestamp | Server time al crear |
| `editadoPor` | string | UID del último editor (solo tras editar) |
| `editadoEn` | Timestamp | Server time al editar (solo tras editar) |

> Unicidad en app: no pueden existir dos docs con mismo `modeloId` + `sedeId` (verificado en `crearInventario`/`editarInventario`).

---

## Colección `movimientoInventario`
ID automático.
Usada por: `funcionesEnvios.ts`, `funcionesExportacion.ts` (solo lectura).

| Campo | Tipo | Descripción |
|---|---|---|
| `inventarioId` | string | ID del documento en `inventario` de la sede de origen |
| `cantidad` | number | Cantidad a transferir |
| `sedeOrigenId` | string | ID de sede origen |
| `sedeDestinoId` | string | ID de sede destino |
| `aprobado` | boolean | `false` al crear; `true`/`false` (aprobado/denegado) al procesar |
| `creadoPor` | string | UID de quien creó la petición |
| `creadoEn` | Timestamp | Server time al crear |
| `editadoPor` | string | UID de quien editó datos (solo tras editar) |
| `editadoEn` | Timestamp | Server time al editar (solo tras editar) |
| `aprobadoPor` | string | UID de quien aprobó/denegó (solo tras procesar) |
| `aprobadoEn` | Timestamp | Server time al procesar (solo tras procesar) |

> ⚠️ Bug conocido en `editarMovimientoAprobacion` (funcionesEnvios.ts): la búsqueda del inventario destino usa `where('modeloId', '==', movimiento.inventarioId)` — compara un `inventarioId` contra el campo `modeloId`. Pendiente de corrección (debatido, no asignado a una fase aún).

---

## Colección `asistencias`
ID automático.
Usada por: `funcionesAsistencia.ts`, `funcionesExportacion.ts` (solo lectura).

**Schema ACTUAL (tras Fase 2):** un documento **por turno marcado** (máx. 2 por usuario/día: uno `manana`, uno `tarde`). Data limpia, sin migración.

| Campo | Tipo | Descripción |
|---|---|---|
| `uid` | string | UID del usuario |
| `turno` | string | `'manana'` \| `'tarde'`. Corte a las 11:50 (entrada con hora < 11:50 = manana) |
| `fechaEntrada` | Timestamp | Hora de entrada marcada |
| `fechaSalida` | Timestamp | Salida **prevista** automática: `min(fechaEntrada + 5h, 17:00 del mismo día)`. Se mantiene como referencia aunque se marque salida real |
| `fechaSalidaReal` | Timestamp \| null | Hora real de salida marcada. `null` si el turno sigue abierto |
| `tipoSalida` | string | `'automatica'` (turno abierto) \| `'manual'` (turno cerrado al marcar salida) |
| `horas` | number | Horas trabajadas del turno. Al crear: contra la salida prevista. Al marcar salida: recalculadas contra `fechaSalidaReal` |
| `tiempoIncompleto` | boolean | `true` si `horas < 3` (por turno). Reemplaza al antiguo `entradaTardia` |
| `diasExonerado` | boolean | Reservado para Fase 3. Siempre `false` al crear |
| `metodoMarcaje` | string | Siempre `'biometria'` |
| `creadoEn` | Timestamp | Server time al crear |

**Reglas en el código:**
1. Entrada permitida solo entre 8:00 y 17:00 (se rechaza fuera de ventana).
2. Máximo 2 documentos por uid y día (uno por turno; se valida `uid + fecha + turno`).
3. Corte de turno: 11:50 (`turno` manana si hora < 11:50).
4. `marcarSalida()` opera solo sobre el doc de hoy con `tipoSalida == 'automatica'`; cierra el turno y recalcula `horas` y `tiempoIncompleto`.

> Nota: se corrigieron bugs en `verAsistencias` — ahora resuelve el nombre real por UID (mapa de nombres) y particiona la query `where('uid','in',...)` en grupos de 10 para sortear el límite de Firestore.

> ✅ `funcionesExportacion.ts` ya se actualizó al schema nuevo (Fase 4): `exportarAsistencias()` exporta **todo el histórico**, con alcance por rol (GerenciaLocal = toda su sede; cualquier otro rol = solo su asistencia personal). Columnas: Nombre, Email, Turno, Fecha, Hora Entrada, Hora Salida (real si existe, si no prevista), Tipo Salida, Horas, Tiempo Incompleto, Metodo Marcaje.

---

## Colección `diasExonerados`
ID automático.
Usada por: `funcionesExonerados.ts`.

**Schema (Fase 3):** días exonerados de asistencia con justificativo. Gerencia Local exonera a **terceros** (de su sede).

| Campo | Tipo | Descripción |
|---|---|---|
| `uidUsuario` | string | UID del empleado exonerado |
| `fecha` | string | Día exonerado en formato `YYYY-MM-DD` (día calendario, coincide con `toISOString().split('T')[0]`) |
| `motivo` | string | Razón del permiso (ej. reposo médico) |
| `justificativoNombre` | string | Nombre del archivo de justificativo seleccionado (vacío si no adjuntó) |
| `justificativoMimeType` | string | Tipo MIME del archivo adjunto |
| `justificativoTamanio` | number | Tamaño en bytes del archivo adjunto |
| `justificativoUri` | string | URI local del archivo capturado con `expo-document-picker` |
| `creadoPor` | string | UID del Gerente Local que registró la exoneración |
| `creadoEn` | Timestamp | Server time al crear |

> ⚠️ Pendiente (mejora futura): `justificativoUri` guarda la URI **local** del archivo seleccionado, no una URL accesible. Para subir el documento real a un bucket se debe instalar `@react-native-firebase/storage` (módulo nativo, requiere rebuild del dev client) y guardar la URL del bucket. `expo-document-picker` ya está instalado y configurado en `app.json`.

## Colecciones previstas (no existen aún)

| Colección | Fase | Propósito |
|---|---|---|
| _(ninguna pendiente)_ | — | — |

## Decisiones de alcance ya cerradas

- Gerencia Local **exonera a terceros** (Fase 3).
- Exportación de asistencia: **todo el histórico** (Fase 4).
- Corte de turno: **11:50** (como existe hoy).
- Máx. 2 registros de asistencia por día (uno por turno); entradas solo entre 8:00 y 17:00; salida automática = entrada + 5h con tope 17:00.
