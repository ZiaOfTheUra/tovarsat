# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListarSedes*](#listarsedes)
  - [*ListarUsuarios*](#listarusuarios)
  - [*ListarMisAsistencias*](#listarmisasistencias)
  - [*ObtenerUsuarioPorId*](#obtenerusuarioporid)
  - [*ListarTiposEquipo*](#listartiposequipo)
  - [*ListarEquiposInventario*](#listarequiposinventario)
  - [*ObtenerEquipoPorId*](#obtenerequipoporid)
  - [*ListarEnviosEquipo*](#listarenviosequipo)
  - [*ObtenerEnvioPorId*](#obtenerenvioporid)
  - [*ListarCompaniasContratistas*](#listarcompaniascontratistas)
  - [*ListarCuadrillasPorContratista*](#listarcuadrillasporcontratista)
  - [*ListarEquipamentosPrestados*](#listarequipamentosprestados)
  - [*ListarMovimientosTesoreria*](#listarmovimientostesoreria)
  - [*ObtenerMovimientoPorId*](#obtenermovimientoporid)
  - [*ListarFondos*](#listarfondos)
  - [*ObtenerFondoPorSede*](#obtenerfondoporsede)
- [**Mutations**](#mutations)
  - [*CrearUsuario*](#crearusuario)
  - [*ActualizarMiPerfil*](#actualizarmiperfil)
  - [*EliminarUsuario*](#eliminarusuario)
  - [*CrearSede*](#crearsede)
  - [*ActualizarSede*](#actualizarsede)
  - [*EliminarSede*](#eliminarsede)
  - [*CrearTipoEquipo*](#creartipoequipo)
  - [*ActualizarTipoEquipo*](#actualizartipoequipo)
  - [*EliminarTipoEquipo*](#eliminartipoequipo)
  - [*CrearEquipoInventario*](#crearequipoinventario)
  - [*ActualizarEquipoInventario*](#actualizarequipoinventario)
  - [*EliminarEquipoInventario*](#eliminarequipoinventario)
  - [*CrearEnvioEquipo*](#crearenvioequipo)
  - [*RecepcionarEnvio*](#recepcionarenvio)
  - [*EliminarEnvioEquipo*](#eliminarenvioequipo)
  - [*RegistrarAsistencia*](#registrarasistencia)
  - [*RegistrarEntradaManana*](#registrarentradamanana)
  - [*ActualizarAsistencia*](#actualizarasistencia)
  - [*EliminarAsistencia*](#eliminarasistencia)
  - [*CrearCompaniaContratista*](#crearcompaniacontratista)
  - [*ActualizarCompaniaContratista*](#actualizarcompaniacontratista)
  - [*EliminarCompaniaContratista*](#eliminarcompaniacontratista)
  - [*CrearCuadrilla*](#crearcuadrilla)
  - [*ActualizarCuadrilla*](#actualizarcuadrilla)
  - [*EliminarCuadrilla*](#eliminarcuadrilla)
  - [*CrearEquipamento*](#crearequipamento)
  - [*ActualizarEquipamento*](#actualizarequipamento)
  - [*EliminarEquipamento*](#eliminarequipamento)
  - [*PrestarEquipamento*](#prestarequipamento)
  - [*DevolverEquipamento*](#devolverequipamento)
  - [*EliminarEquipamentoPrestado*](#eliminarequipamentoprestado)
  - [*CrearMovimientoTesoreria*](#crearmovimientotesoreria)
  - [*AprobarMovimientoTesoreria*](#aprobarmovimientotesoreria)
  - [*AnularMovimientoTesoreria*](#anularmovimientotesoreria)
  - [*EliminarMovimientoTesoreria*](#eliminarmovimientotesoreria)
  - [*CrearFondo*](#crearfondo)
  - [*ActualizarFondo*](#actualizarfondo)
  - [*EliminarFondo*](#eliminarfondo)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListarSedes
You can execute the `ListarSedes` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarSedes(options?: ExecuteQueryOptions): QueryPromise<ListarSedesData, undefined>;

interface ListarSedesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarSedesData, undefined>;
}
export const listarSedesRef: ListarSedesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarSedes(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarSedesData, undefined>;

interface ListarSedesRef {
  ...
  (dc: DataConnect): QueryRef<ListarSedesData, undefined>;
}
export const listarSedesRef: ListarSedesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarSedesRef:
```typescript
const name = listarSedesRef.operationName;
console.log(name);
```

### Variables
The `ListarSedes` query has no variables.
### Return Type
Recall that executing the `ListarSedes` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarSedesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarSedesData {
  sedes: ({
    id: UUIDString;
    nombre: string;
    direccion: string;
    telefono?: string | null;
    contacto?: string | null;
  } & Sede_Key)[];
}
```
### Using `ListarSedes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarSedes } from '@dataconnect/generated';


// Call the `listarSedes()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarSedes();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarSedes(dataConnect);

console.log(data.sedes);

// Or, you can use the `Promise` API.
listarSedes().then((response) => {
  const data = response.data;
  console.log(data.sedes);
});
```

### Using `ListarSedes`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarSedesRef } from '@dataconnect/generated';


// Call the `listarSedesRef()` function to get a reference to the query.
const ref = listarSedesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarSedesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sedes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sedes);
});
```

## ListarUsuarios
You can execute the `ListarUsuarios` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarUsuarios(options?: ExecuteQueryOptions): QueryPromise<ListarUsuariosData, undefined>;

interface ListarUsuariosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarUsuariosData, undefined>;
}
export const listarUsuariosRef: ListarUsuariosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarUsuarios(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarUsuariosData, undefined>;

interface ListarUsuariosRef {
  ...
  (dc: DataConnect): QueryRef<ListarUsuariosData, undefined>;
}
export const listarUsuariosRef: ListarUsuariosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarUsuariosRef:
```typescript
const name = listarUsuariosRef.operationName;
console.log(name);
```

### Variables
The `ListarUsuarios` query has no variables.
### Return Type
Recall that executing the `ListarUsuarios` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarUsuariosData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarUsuariosData {
  usuarios: ({
    id: UUIDString;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: DateString;
    cargo: string;
    nivelAdministrativo: string;
    hashBiometrico: string;
    permisosDB?: string | null;
    email: string;
    rol: string;
    activo: boolean;
    sede?: {
      id: UUIDString;
      nombre: string;
    } & Sede_Key;
  } & Usuario_Key)[];
}
```
### Using `ListarUsuarios`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarUsuarios } from '@dataconnect/generated';


// Call the `listarUsuarios()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarUsuarios();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarUsuarios(dataConnect);

console.log(data.usuarios);

// Or, you can use the `Promise` API.
listarUsuarios().then((response) => {
  const data = response.data;
  console.log(data.usuarios);
});
```

### Using `ListarUsuarios`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarUsuariosRef } from '@dataconnect/generated';


// Call the `listarUsuariosRef()` function to get a reference to the query.
const ref = listarUsuariosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarUsuariosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.usuarios);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.usuarios);
});
```

## ListarMisAsistencias
You can execute the `ListarMisAsistencias` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarMisAsistencias(options?: ExecuteQueryOptions): QueryPromise<ListarMisAsistenciasData, undefined>;

interface ListarMisAsistenciasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarMisAsistenciasData, undefined>;
}
export const listarMisAsistenciasRef: ListarMisAsistenciasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarMisAsistencias(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarMisAsistenciasData, undefined>;

interface ListarMisAsistenciasRef {
  ...
  (dc: DataConnect): QueryRef<ListarMisAsistenciasData, undefined>;
}
export const listarMisAsistenciasRef: ListarMisAsistenciasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarMisAsistenciasRef:
```typescript
const name = listarMisAsistenciasRef.operationName;
console.log(name);
```

### Variables
The `ListarMisAsistencias` query has no variables.
### Return Type
Recall that executing the `ListarMisAsistencias` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarMisAsistenciasData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarMisAsistenciasData {
  usuario?: {
    id: UUIDString;
    nombre: string;
    apellido: string;
    cedula: string;
    cargo: string;
    asistencias: ({
      fecha: DateString;
      horaEntradaManana: TimestampString;
      horaSalidaManana: TimestampString;
      horaEntradaTarde?: TimestampString | null;
      horaSalidaTarde?: TimestampString | null;
    })[];
  } & Usuario_Key;
}
```
### Using `ListarMisAsistencias`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarMisAsistencias } from '@dataconnect/generated';


// Call the `listarMisAsistencias()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarMisAsistencias();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarMisAsistencias(dataConnect);

console.log(data.usuario);

// Or, you can use the `Promise` API.
listarMisAsistencias().then((response) => {
  const data = response.data;
  console.log(data.usuario);
});
```

### Using `ListarMisAsistencias`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarMisAsistenciasRef } from '@dataconnect/generated';


// Call the `listarMisAsistenciasRef()` function to get a reference to the query.
const ref = listarMisAsistenciasRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarMisAsistenciasRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.usuario);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario);
});
```

## ObtenerUsuarioPorId
You can execute the `ObtenerUsuarioPorId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
obtenerUsuarioPorId(vars: ObtenerUsuarioPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;

interface ObtenerUsuarioPorIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerUsuarioPorIdVariables): QueryRef<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;
}
export const obtenerUsuarioPorIdRef: ObtenerUsuarioPorIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
obtenerUsuarioPorId(dc: DataConnect, vars: ObtenerUsuarioPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;

interface ObtenerUsuarioPorIdRef {
  ...
  (dc: DataConnect, vars: ObtenerUsuarioPorIdVariables): QueryRef<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;
}
export const obtenerUsuarioPorIdRef: ObtenerUsuarioPorIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the obtenerUsuarioPorIdRef:
```typescript
const name = obtenerUsuarioPorIdRef.operationName;
console.log(name);
```

### Variables
The `ObtenerUsuarioPorId` query requires an argument of type `ObtenerUsuarioPorIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ObtenerUsuarioPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `ObtenerUsuarioPorId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ObtenerUsuarioPorIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ObtenerUsuarioPorIdData {
  usuario?: {
    id: UUIDString;
    nombre: string;
    apellido: string;
    cedula: string;
    fechaNacimiento: DateString;
    cargo: string;
    nivelAdministrativo: string;
    hashBiometrico: string;
    permisosDB?: string | null;
    email: string;
    rol: string;
    activo: boolean;
    sede?: {
      id: UUIDString;
      nombre: string;
      direccion: string;
    } & Sede_Key;
    asistencias: ({
      fecha: DateString;
      horaEntradaManana: TimestampString;
      horaSalidaManana: TimestampString;
      horaEntradaTarde?: TimestampString | null;
      horaSalidaTarde?: TimestampString | null;
    })[];
  } & Usuario_Key;
}
```
### Using `ObtenerUsuarioPorId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, obtenerUsuarioPorId, ObtenerUsuarioPorIdVariables } from '@dataconnect/generated';

// The `ObtenerUsuarioPorId` query requires an argument of type `ObtenerUsuarioPorIdVariables`:
const obtenerUsuarioPorIdVars: ObtenerUsuarioPorIdVariables = {
  id: ..., 
};

// Call the `obtenerUsuarioPorId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await obtenerUsuarioPorId(obtenerUsuarioPorIdVars);
// Variables can be defined inline as well.
const { data } = await obtenerUsuarioPorId({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await obtenerUsuarioPorId(dataConnect, obtenerUsuarioPorIdVars);

console.log(data.usuario);

// Or, you can use the `Promise` API.
obtenerUsuarioPorId(obtenerUsuarioPorIdVars).then((response) => {
  const data = response.data;
  console.log(data.usuario);
});
```

### Using `ObtenerUsuarioPorId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, obtenerUsuarioPorIdRef, ObtenerUsuarioPorIdVariables } from '@dataconnect/generated';

// The `ObtenerUsuarioPorId` query requires an argument of type `ObtenerUsuarioPorIdVariables`:
const obtenerUsuarioPorIdVars: ObtenerUsuarioPorIdVariables = {
  id: ..., 
};

// Call the `obtenerUsuarioPorIdRef()` function to get a reference to the query.
const ref = obtenerUsuarioPorIdRef(obtenerUsuarioPorIdVars);
// Variables can be defined inline as well.
const ref = obtenerUsuarioPorIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = obtenerUsuarioPorIdRef(dataConnect, obtenerUsuarioPorIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.usuario);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario);
});
```

## ListarTiposEquipo
You can execute the `ListarTiposEquipo` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarTiposEquipo(options?: ExecuteQueryOptions): QueryPromise<ListarTiposEquipoData, undefined>;

interface ListarTiposEquipoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarTiposEquipoData, undefined>;
}
export const listarTiposEquipoRef: ListarTiposEquipoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarTiposEquipo(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarTiposEquipoData, undefined>;

interface ListarTiposEquipoRef {
  ...
  (dc: DataConnect): QueryRef<ListarTiposEquipoData, undefined>;
}
export const listarTiposEquipoRef: ListarTiposEquipoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarTiposEquipoRef:
```typescript
const name = listarTiposEquipoRef.operationName;
console.log(name);
```

### Variables
The `ListarTiposEquipo` query has no variables.
### Return Type
Recall that executing the `ListarTiposEquipo` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarTiposEquipoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarTiposEquipoData {
  tipoEquipos: ({
    id: UUIDString;
    nombreTipo: string;
    descripcion?: string | null;
    modelo: string;
    anchoBanda?: string | null;
    canales?: number | null;
    tecnologiaRelevante?: string | null;
  } & TipoEquipo_Key)[];
}
```
### Using `ListarTiposEquipo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarTiposEquipo } from '@dataconnect/generated';


// Call the `listarTiposEquipo()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarTiposEquipo();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarTiposEquipo(dataConnect);

console.log(data.tipoEquipos);

// Or, you can use the `Promise` API.
listarTiposEquipo().then((response) => {
  const data = response.data;
  console.log(data.tipoEquipos);
});
```

### Using `ListarTiposEquipo`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarTiposEquipoRef } from '@dataconnect/generated';


// Call the `listarTiposEquipoRef()` function to get a reference to the query.
const ref = listarTiposEquipoRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarTiposEquipoRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tipoEquipos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tipoEquipos);
});
```

## ListarEquiposInventario
You can execute the `ListarEquiposInventario` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarEquiposInventario(options?: ExecuteQueryOptions): QueryPromise<ListarEquiposInventarioData, undefined>;

interface ListarEquiposInventarioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarEquiposInventarioData, undefined>;
}
export const listarEquiposInventarioRef: ListarEquiposInventarioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarEquiposInventario(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarEquiposInventarioData, undefined>;

interface ListarEquiposInventarioRef {
  ...
  (dc: DataConnect): QueryRef<ListarEquiposInventarioData, undefined>;
}
export const listarEquiposInventarioRef: ListarEquiposInventarioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarEquiposInventarioRef:
```typescript
const name = listarEquiposInventarioRef.operationName;
console.log(name);
```

### Variables
The `ListarEquiposInventario` query has no variables.
### Return Type
Recall that executing the `ListarEquiposInventario` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarEquiposInventarioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarEquiposInventarioData {
  equipoInventarios: ({
    id: UUIDString;
    modelo: string;
    nombreDescriptivo: string;
    valor: number;
    cantidadDisponible: number;
    serial: string;
    estado: string;
    tipoEquipo?: {
      nombreTipo: string;
      modelo: string;
      tecnologiaRelevante?: string | null;
    };
    ubicacion?: {
      nombre: string;
      direccion: string;
    };
  } & EquipoInventario_Key)[];
}
```
### Using `ListarEquiposInventario`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarEquiposInventario } from '@dataconnect/generated';


// Call the `listarEquiposInventario()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarEquiposInventario();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarEquiposInventario(dataConnect);

console.log(data.equipoInventarios);

// Or, you can use the `Promise` API.
listarEquiposInventario().then((response) => {
  const data = response.data;
  console.log(data.equipoInventarios);
});
```

### Using `ListarEquiposInventario`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarEquiposInventarioRef } from '@dataconnect/generated';


// Call the `listarEquiposInventarioRef()` function to get a reference to the query.
const ref = listarEquiposInventarioRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarEquiposInventarioRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.equipoInventarios);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.equipoInventarios);
});
```

## ObtenerEquipoPorId
You can execute the `ObtenerEquipoPorId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
obtenerEquipoPorId(vars: ObtenerEquipoPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;

interface ObtenerEquipoPorIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerEquipoPorIdVariables): QueryRef<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;
}
export const obtenerEquipoPorIdRef: ObtenerEquipoPorIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
obtenerEquipoPorId(dc: DataConnect, vars: ObtenerEquipoPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;

interface ObtenerEquipoPorIdRef {
  ...
  (dc: DataConnect, vars: ObtenerEquipoPorIdVariables): QueryRef<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;
}
export const obtenerEquipoPorIdRef: ObtenerEquipoPorIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the obtenerEquipoPorIdRef:
```typescript
const name = obtenerEquipoPorIdRef.operationName;
console.log(name);
```

### Variables
The `ObtenerEquipoPorId` query requires an argument of type `ObtenerEquipoPorIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ObtenerEquipoPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `ObtenerEquipoPorId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ObtenerEquipoPorIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ObtenerEquipoPorIdData {
  equipoInventario?: {
    id: UUIDString;
    modelo: string;
    nombreDescriptivo: string;
    valor: number;
    cantidadDisponible: number;
    serial: string;
    estado: string;
    tipoEquipo?: {
      nombreTipo: string;
      descripcion?: string | null;
      modelo: string;
      anchoBanda?: string | null;
      canales?: number | null;
      tecnologiaRelevante?: string | null;
    };
    ubicacion?: {
      nombre: string;
      direccion: string;
      telefono?: string | null;
    };
  } & EquipoInventario_Key;
}
```
### Using `ObtenerEquipoPorId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, obtenerEquipoPorId, ObtenerEquipoPorIdVariables } from '@dataconnect/generated';

// The `ObtenerEquipoPorId` query requires an argument of type `ObtenerEquipoPorIdVariables`:
const obtenerEquipoPorIdVars: ObtenerEquipoPorIdVariables = {
  id: ..., 
};

// Call the `obtenerEquipoPorId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await obtenerEquipoPorId(obtenerEquipoPorIdVars);
// Variables can be defined inline as well.
const { data } = await obtenerEquipoPorId({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await obtenerEquipoPorId(dataConnect, obtenerEquipoPorIdVars);

console.log(data.equipoInventario);

// Or, you can use the `Promise` API.
obtenerEquipoPorId(obtenerEquipoPorIdVars).then((response) => {
  const data = response.data;
  console.log(data.equipoInventario);
});
```

### Using `ObtenerEquipoPorId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, obtenerEquipoPorIdRef, ObtenerEquipoPorIdVariables } from '@dataconnect/generated';

// The `ObtenerEquipoPorId` query requires an argument of type `ObtenerEquipoPorIdVariables`:
const obtenerEquipoPorIdVars: ObtenerEquipoPorIdVariables = {
  id: ..., 
};

// Call the `obtenerEquipoPorIdRef()` function to get a reference to the query.
const ref = obtenerEquipoPorIdRef(obtenerEquipoPorIdVars);
// Variables can be defined inline as well.
const ref = obtenerEquipoPorIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = obtenerEquipoPorIdRef(dataConnect, obtenerEquipoPorIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.equipoInventario);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.equipoInventario);
});
```

## ListarEnviosEquipo
You can execute the `ListarEnviosEquipo` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarEnviosEquipo(options?: ExecuteQueryOptions): QueryPromise<ListarEnviosEquipoData, undefined>;

interface ListarEnviosEquipoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarEnviosEquipoData, undefined>;
}
export const listarEnviosEquipoRef: ListarEnviosEquipoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarEnviosEquipo(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarEnviosEquipoData, undefined>;

interface ListarEnviosEquipoRef {
  ...
  (dc: DataConnect): QueryRef<ListarEnviosEquipoData, undefined>;
}
export const listarEnviosEquipoRef: ListarEnviosEquipoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarEnviosEquipoRef:
```typescript
const name = listarEnviosEquipoRef.operationName;
console.log(name);
```

### Variables
The `ListarEnviosEquipo` query has no variables.
### Return Type
Recall that executing the `ListarEnviosEquipo` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarEnviosEquipoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarEnviosEquipoData {
  envioEquipos: ({
    id: UUIDString;
    tipoEnvio: string;
    fechaEnvio: DateString;
    descripcionGeneral?: string | null;
    fechaRecepcion?: DateString | null;
    encargado?: {
      nombre: string;
      apellido: string;
      cargo: string;
    };
    receptor?: {
      nombre: string;
      apellido: string;
      cargo: string;
    };
    origen?: {
      nombre: string;
      direccion: string;
    };
    destino?: {
      nombre: string;
      direccion: string;
    };
  } & EnvioEquipo_Key)[];
}
```
### Using `ListarEnviosEquipo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarEnviosEquipo } from '@dataconnect/generated';


// Call the `listarEnviosEquipo()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarEnviosEquipo();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarEnviosEquipo(dataConnect);

console.log(data.envioEquipos);

// Or, you can use the `Promise` API.
listarEnviosEquipo().then((response) => {
  const data = response.data;
  console.log(data.envioEquipos);
});
```

### Using `ListarEnviosEquipo`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarEnviosEquipoRef } from '@dataconnect/generated';


// Call the `listarEnviosEquipoRef()` function to get a reference to the query.
const ref = listarEnviosEquipoRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarEnviosEquipoRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.envioEquipos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.envioEquipos);
});
```

## ObtenerEnvioPorId
You can execute the `ObtenerEnvioPorId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
obtenerEnvioPorId(vars: ObtenerEnvioPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;

interface ObtenerEnvioPorIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerEnvioPorIdVariables): QueryRef<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;
}
export const obtenerEnvioPorIdRef: ObtenerEnvioPorIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
obtenerEnvioPorId(dc: DataConnect, vars: ObtenerEnvioPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;

interface ObtenerEnvioPorIdRef {
  ...
  (dc: DataConnect, vars: ObtenerEnvioPorIdVariables): QueryRef<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;
}
export const obtenerEnvioPorIdRef: ObtenerEnvioPorIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the obtenerEnvioPorIdRef:
```typescript
const name = obtenerEnvioPorIdRef.operationName;
console.log(name);
```

### Variables
The `ObtenerEnvioPorId` query requires an argument of type `ObtenerEnvioPorIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ObtenerEnvioPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `ObtenerEnvioPorId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ObtenerEnvioPorIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ObtenerEnvioPorIdData {
  envioEquipo?: {
    id: UUIDString;
    tipoEnvio: string;
    fechaEnvio: DateString;
    descripcionGeneral?: string | null;
    fechaRecepcion?: DateString | null;
    encargado?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      cedula: string;
      cargo: string;
    } & Usuario_Key;
    receptor?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      cedula: string;
      cargo: string;
    } & Usuario_Key;
    origen?: {
      id: UUIDString;
      nombre: string;
      direccion: string;
      telefono?: string | null;
    } & Sede_Key;
    destino?: {
      id: UUIDString;
      nombre: string;
      direccion: string;
      telefono?: string | null;
    } & Sede_Key;
  } & EnvioEquipo_Key;
}
```
### Using `ObtenerEnvioPorId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, obtenerEnvioPorId, ObtenerEnvioPorIdVariables } from '@dataconnect/generated';

// The `ObtenerEnvioPorId` query requires an argument of type `ObtenerEnvioPorIdVariables`:
const obtenerEnvioPorIdVars: ObtenerEnvioPorIdVariables = {
  id: ..., 
};

// Call the `obtenerEnvioPorId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await obtenerEnvioPorId(obtenerEnvioPorIdVars);
// Variables can be defined inline as well.
const { data } = await obtenerEnvioPorId({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await obtenerEnvioPorId(dataConnect, obtenerEnvioPorIdVars);

console.log(data.envioEquipo);

// Or, you can use the `Promise` API.
obtenerEnvioPorId(obtenerEnvioPorIdVars).then((response) => {
  const data = response.data;
  console.log(data.envioEquipo);
});
```

### Using `ObtenerEnvioPorId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, obtenerEnvioPorIdRef, ObtenerEnvioPorIdVariables } from '@dataconnect/generated';

// The `ObtenerEnvioPorId` query requires an argument of type `ObtenerEnvioPorIdVariables`:
const obtenerEnvioPorIdVars: ObtenerEnvioPorIdVariables = {
  id: ..., 
};

// Call the `obtenerEnvioPorIdRef()` function to get a reference to the query.
const ref = obtenerEnvioPorIdRef(obtenerEnvioPorIdVars);
// Variables can be defined inline as well.
const ref = obtenerEnvioPorIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = obtenerEnvioPorIdRef(dataConnect, obtenerEnvioPorIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.envioEquipo);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.envioEquipo);
});
```

## ListarCompaniasContratistas
You can execute the `ListarCompaniasContratistas` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarCompaniasContratistas(options?: ExecuteQueryOptions): QueryPromise<ListarCompaniasContratistasData, undefined>;

interface ListarCompaniasContratistasRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarCompaniasContratistasData, undefined>;
}
export const listarCompaniasContratistasRef: ListarCompaniasContratistasRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarCompaniasContratistas(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarCompaniasContratistasData, undefined>;

interface ListarCompaniasContratistasRef {
  ...
  (dc: DataConnect): QueryRef<ListarCompaniasContratistasData, undefined>;
}
export const listarCompaniasContratistasRef: ListarCompaniasContratistasRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarCompaniasContratistasRef:
```typescript
const name = listarCompaniasContratistasRef.operationName;
console.log(name);
```

### Variables
The `ListarCompaniasContratistas` query has no variables.
### Return Type
Recall that executing the `ListarCompaniasContratistas` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarCompaniasContratistasData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarCompaniasContratistasData {
  companiaContratistas: ({
    id: UUIDString;
    nombre: string;
    rif?: string | null;
    telefonoContacto?: string | null;
  } & CompaniaContratista_Key)[];
}
```
### Using `ListarCompaniasContratistas`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarCompaniasContratistas } from '@dataconnect/generated';


// Call the `listarCompaniasContratistas()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarCompaniasContratistas();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarCompaniasContratistas(dataConnect);

console.log(data.companiaContratistas);

// Or, you can use the `Promise` API.
listarCompaniasContratistas().then((response) => {
  const data = response.data;
  console.log(data.companiaContratistas);
});
```

### Using `ListarCompaniasContratistas`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarCompaniasContratistasRef } from '@dataconnect/generated';


// Call the `listarCompaniasContratistasRef()` function to get a reference to the query.
const ref = listarCompaniasContratistasRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarCompaniasContratistasRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.companiaContratistas);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.companiaContratistas);
});
```

## ListarCuadrillasPorContratista
You can execute the `ListarCuadrillasPorContratista` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarCuadrillasPorContratista(vars: ListarCuadrillasPorContratistaVariables, options?: ExecuteQueryOptions): QueryPromise<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;

interface ListarCuadrillasPorContratistaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListarCuadrillasPorContratistaVariables): QueryRef<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;
}
export const listarCuadrillasPorContratistaRef: ListarCuadrillasPorContratistaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarCuadrillasPorContratista(dc: DataConnect, vars: ListarCuadrillasPorContratistaVariables, options?: ExecuteQueryOptions): QueryPromise<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;

interface ListarCuadrillasPorContratistaRef {
  ...
  (dc: DataConnect, vars: ListarCuadrillasPorContratistaVariables): QueryRef<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;
}
export const listarCuadrillasPorContratistaRef: ListarCuadrillasPorContratistaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarCuadrillasPorContratistaRef:
```typescript
const name = listarCuadrillasPorContratistaRef.operationName;
console.log(name);
```

### Variables
The `ListarCuadrillasPorContratista` query requires an argument of type `ListarCuadrillasPorContratistaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListarCuadrillasPorContratistaVariables {
  companiaId: UUIDString;
}
```
### Return Type
Recall that executing the `ListarCuadrillasPorContratista` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarCuadrillasPorContratistaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarCuadrillasPorContratistaData {
  companiaContratista?: {
    id: UUIDString;
    nombre: string;
    cuadrillas: ({
      id: UUIDString;
      nombreIdentificador: string;
      tamanoAproximado?: number | null;
    } & Cuadrilla_Key)[];
  } & CompaniaContratista_Key;
}
```
### Using `ListarCuadrillasPorContratista`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarCuadrillasPorContratista, ListarCuadrillasPorContratistaVariables } from '@dataconnect/generated';

// The `ListarCuadrillasPorContratista` query requires an argument of type `ListarCuadrillasPorContratistaVariables`:
const listarCuadrillasPorContratistaVars: ListarCuadrillasPorContratistaVariables = {
  companiaId: ..., 
};

// Call the `listarCuadrillasPorContratista()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarCuadrillasPorContratista(listarCuadrillasPorContratistaVars);
// Variables can be defined inline as well.
const { data } = await listarCuadrillasPorContratista({ companiaId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarCuadrillasPorContratista(dataConnect, listarCuadrillasPorContratistaVars);

console.log(data.companiaContratista);

// Or, you can use the `Promise` API.
listarCuadrillasPorContratista(listarCuadrillasPorContratistaVars).then((response) => {
  const data = response.data;
  console.log(data.companiaContratista);
});
```

### Using `ListarCuadrillasPorContratista`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarCuadrillasPorContratistaRef, ListarCuadrillasPorContratistaVariables } from '@dataconnect/generated';

// The `ListarCuadrillasPorContratista` query requires an argument of type `ListarCuadrillasPorContratistaVariables`:
const listarCuadrillasPorContratistaVars: ListarCuadrillasPorContratistaVariables = {
  companiaId: ..., 
};

// Call the `listarCuadrillasPorContratistaRef()` function to get a reference to the query.
const ref = listarCuadrillasPorContratistaRef(listarCuadrillasPorContratistaVars);
// Variables can be defined inline as well.
const ref = listarCuadrillasPorContratistaRef({ companiaId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarCuadrillasPorContratistaRef(dataConnect, listarCuadrillasPorContratistaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.companiaContratista);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.companiaContratista);
});
```

## ListarEquipamentosPrestados
You can execute the `ListarEquipamentosPrestados` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarEquipamentosPrestados(options?: ExecuteQueryOptions): QueryPromise<ListarEquipamentosPrestadosData, undefined>;

interface ListarEquipamentosPrestadosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarEquipamentosPrestadosData, undefined>;
}
export const listarEquipamentosPrestadosRef: ListarEquipamentosPrestadosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarEquipamentosPrestados(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarEquipamentosPrestadosData, undefined>;

interface ListarEquipamentosPrestadosRef {
  ...
  (dc: DataConnect): QueryRef<ListarEquipamentosPrestadosData, undefined>;
}
export const listarEquipamentosPrestadosRef: ListarEquipamentosPrestadosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarEquipamentosPrestadosRef:
```typescript
const name = listarEquipamentosPrestadosRef.operationName;
console.log(name);
```

### Variables
The `ListarEquipamentosPrestados` query has no variables.
### Return Type
Recall that executing the `ListarEquipamentosPrestados` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarEquipamentosPrestadosData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarEquipamentosPrestadosData {
  equipamentoPrestados: ({
    id: UUIDString;
    fechaInicio: DateString;
    fechaDevolucion?: DateString | null;
    compania?: {
      nombre: string;
      rif?: string | null;
      telefonoContacto?: string | null;
    };
    equipamento?: {
      nombre: string;
      descripcion?: string | null;
      modelo?: string | null;
    };
  } & EquipamentoPrestado_Key)[];
}
```
### Using `ListarEquipamentosPrestados`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarEquipamentosPrestados } from '@dataconnect/generated';


// Call the `listarEquipamentosPrestados()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarEquipamentosPrestados();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarEquipamentosPrestados(dataConnect);

console.log(data.equipamentoPrestados);

// Or, you can use the `Promise` API.
listarEquipamentosPrestados().then((response) => {
  const data = response.data;
  console.log(data.equipamentoPrestados);
});
```

### Using `ListarEquipamentosPrestados`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarEquipamentosPrestadosRef } from '@dataconnect/generated';


// Call the `listarEquipamentosPrestadosRef()` function to get a reference to the query.
const ref = listarEquipamentosPrestadosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarEquipamentosPrestadosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.equipamentoPrestados);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.equipamentoPrestados);
});
```

## ListarMovimientosTesoreria
You can execute the `ListarMovimientosTesoreria` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarMovimientosTesoreria(options?: ExecuteQueryOptions): QueryPromise<ListarMovimientosTesoreriaData, undefined>;

interface ListarMovimientosTesoreriaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarMovimientosTesoreriaData, undefined>;
}
export const listarMovimientosTesoreriaRef: ListarMovimientosTesoreriaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarMovimientosTesoreria(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarMovimientosTesoreriaData, undefined>;

interface ListarMovimientosTesoreriaRef {
  ...
  (dc: DataConnect): QueryRef<ListarMovimientosTesoreriaData, undefined>;
}
export const listarMovimientosTesoreriaRef: ListarMovimientosTesoreriaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarMovimientosTesoreriaRef:
```typescript
const name = listarMovimientosTesoreriaRef.operationName;
console.log(name);
```

### Variables
The `ListarMovimientosTesoreria` query has no variables.
### Return Type
Recall that executing the `ListarMovimientosTesoreria` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarMovimientosTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarMovimientosTesoreriaData {
  movimientoTesorerias: ({
    id: UUIDString;
    tipo: string;
    monto: number;
    moneda: string;
    tasaBCV: number;
    fechaTasa: DateString;
    concepto: string;
    estado: string;
    creadoEn: TimestampString;
    aprobadoEn?: TimestampString | null;
    sede?: {
      id: UUIDString;
      nombre: string;
    } & Sede_Key;
    creador?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      email: string;
      rol: string;
    } & Usuario_Key;
    aprobador?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      email: string;
      rol: string;
    } & Usuario_Key;
    avioRefId?: UUIDString | null;
    anulaAId?: UUIDString | null;
  } & MovimientoTesoreria_Key)[];
}
```
### Using `ListarMovimientosTesoreria`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarMovimientosTesoreria } from '@dataconnect/generated';


// Call the `listarMovimientosTesoreria()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarMovimientosTesoreria();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarMovimientosTesoreria(dataConnect);

console.log(data.movimientoTesorerias);

// Or, you can use the `Promise` API.
listarMovimientosTesoreria().then((response) => {
  const data = response.data;
  console.log(data.movimientoTesorerias);
});
```

### Using `ListarMovimientosTesoreria`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarMovimientosTesoreriaRef } from '@dataconnect/generated';


// Call the `listarMovimientosTesoreriaRef()` function to get a reference to the query.
const ref = listarMovimientosTesoreriaRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarMovimientosTesoreriaRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.movimientoTesorerias);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesorerias);
});
```

## ObtenerMovimientoPorId
You can execute the `ObtenerMovimientoPorId` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
obtenerMovimientoPorId(vars: ObtenerMovimientoPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;

interface ObtenerMovimientoPorIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerMovimientoPorIdVariables): QueryRef<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;
}
export const obtenerMovimientoPorIdRef: ObtenerMovimientoPorIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
obtenerMovimientoPorId(dc: DataConnect, vars: ObtenerMovimientoPorIdVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;

interface ObtenerMovimientoPorIdRef {
  ...
  (dc: DataConnect, vars: ObtenerMovimientoPorIdVariables): QueryRef<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;
}
export const obtenerMovimientoPorIdRef: ObtenerMovimientoPorIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the obtenerMovimientoPorIdRef:
```typescript
const name = obtenerMovimientoPorIdRef.operationName;
console.log(name);
```

### Variables
The `ObtenerMovimientoPorId` query requires an argument of type `ObtenerMovimientoPorIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ObtenerMovimientoPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `ObtenerMovimientoPorId` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ObtenerMovimientoPorIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ObtenerMovimientoPorIdData {
  movimientoTesoreria?: {
    id: UUIDString;
    tipo: string;
    monto: number;
    moneda: string;
    tasaBCV: number;
    fechaTasa: DateString;
    concepto: string;
    estado: string;
    creadoEn: TimestampString;
    aprobadoEn?: TimestampString | null;
    sede?: {
      id: UUIDString;
      nombre: string;
      direccion: string;
    } & Sede_Key;
    creador?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      email: string;
      rol: string;
    } & Usuario_Key;
    aprobador?: {
      id: UUIDString;
      nombre: string;
      apellido: string;
      email: string;
      rol: string;
    } & Usuario_Key;
    avioRefId?: UUIDString | null;
    anulaAId?: UUIDString | null;
  } & MovimientoTesoreria_Key;
}
```
### Using `ObtenerMovimientoPorId`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, obtenerMovimientoPorId, ObtenerMovimientoPorIdVariables } from '@dataconnect/generated';

// The `ObtenerMovimientoPorId` query requires an argument of type `ObtenerMovimientoPorIdVariables`:
const obtenerMovimientoPorIdVars: ObtenerMovimientoPorIdVariables = {
  id: ..., 
};

// Call the `obtenerMovimientoPorId()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await obtenerMovimientoPorId(obtenerMovimientoPorIdVars);
// Variables can be defined inline as well.
const { data } = await obtenerMovimientoPorId({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await obtenerMovimientoPorId(dataConnect, obtenerMovimientoPorIdVars);

console.log(data.movimientoTesoreria);

// Or, you can use the `Promise` API.
obtenerMovimientoPorId(obtenerMovimientoPorIdVars).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria);
});
```

### Using `ObtenerMovimientoPorId`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, obtenerMovimientoPorIdRef, ObtenerMovimientoPorIdVariables } from '@dataconnect/generated';

// The `ObtenerMovimientoPorId` query requires an argument of type `ObtenerMovimientoPorIdVariables`:
const obtenerMovimientoPorIdVars: ObtenerMovimientoPorIdVariables = {
  id: ..., 
};

// Call the `obtenerMovimientoPorIdRef()` function to get a reference to the query.
const ref = obtenerMovimientoPorIdRef(obtenerMovimientoPorIdVars);
// Variables can be defined inline as well.
const ref = obtenerMovimientoPorIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = obtenerMovimientoPorIdRef(dataConnect, obtenerMovimientoPorIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.movimientoTesoreria);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria);
});
```

## ListarFondos
You can execute the `ListarFondos` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listarFondos(options?: ExecuteQueryOptions): QueryPromise<ListarFondosData, undefined>;

interface ListarFondosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListarFondosData, undefined>;
}
export const listarFondosRef: ListarFondosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listarFondos(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListarFondosData, undefined>;

interface ListarFondosRef {
  ...
  (dc: DataConnect): QueryRef<ListarFondosData, undefined>;
}
export const listarFondosRef: ListarFondosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listarFondosRef:
```typescript
const name = listarFondosRef.operationName;
console.log(name);
```

### Variables
The `ListarFondos` query has no variables.
### Return Type
Recall that executing the `ListarFondos` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListarFondosData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListarFondosData {
  fondos: ({
    sede: {
      id: UUIDString;
      nombre: string;
    } & Sede_Key;
    saldo: number;
    moneda: string;
    ultimaActualizacion: TimestampString;
  })[];
}
```
### Using `ListarFondos`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listarFondos } from '@dataconnect/generated';


// Call the `listarFondos()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listarFondos();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listarFondos(dataConnect);

console.log(data.fondos);

// Or, you can use the `Promise` API.
listarFondos().then((response) => {
  const data = response.data;
  console.log(data.fondos);
});
```

### Using `ListarFondos`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listarFondosRef } from '@dataconnect/generated';


// Call the `listarFondosRef()` function to get a reference to the query.
const ref = listarFondosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listarFondosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.fondos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.fondos);
});
```

## ObtenerFondoPorSede
You can execute the `ObtenerFondoPorSede` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
obtenerFondoPorSede(vars: ObtenerFondoPorSedeVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;

interface ObtenerFondoPorSedeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ObtenerFondoPorSedeVariables): QueryRef<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;
}
export const obtenerFondoPorSedeRef: ObtenerFondoPorSedeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
obtenerFondoPorSede(dc: DataConnect, vars: ObtenerFondoPorSedeVariables, options?: ExecuteQueryOptions): QueryPromise<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;

interface ObtenerFondoPorSedeRef {
  ...
  (dc: DataConnect, vars: ObtenerFondoPorSedeVariables): QueryRef<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;
}
export const obtenerFondoPorSedeRef: ObtenerFondoPorSedeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the obtenerFondoPorSedeRef:
```typescript
const name = obtenerFondoPorSedeRef.operationName;
console.log(name);
```

### Variables
The `ObtenerFondoPorSede` query requires an argument of type `ObtenerFondoPorSedeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ObtenerFondoPorSedeVariables {
  sedeId: UUIDString;
}
```
### Return Type
Recall that executing the `ObtenerFondoPorSede` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ObtenerFondoPorSedeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ObtenerFondoPorSedeData {
  sede?: {
    id: UUIDString;
    nombre: string;
    fondo: ({
      id: UUIDString;
      saldo: number;
      moneda: string;
      ultimaActualizacion: TimestampString;
    } & Fondo_Key)[];
  } & Sede_Key;
}
```
### Using `ObtenerFondoPorSede`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, obtenerFondoPorSede, ObtenerFondoPorSedeVariables } from '@dataconnect/generated';

// The `ObtenerFondoPorSede` query requires an argument of type `ObtenerFondoPorSedeVariables`:
const obtenerFondoPorSedeVars: ObtenerFondoPorSedeVariables = {
  sedeId: ..., 
};

// Call the `obtenerFondoPorSede()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await obtenerFondoPorSede(obtenerFondoPorSedeVars);
// Variables can be defined inline as well.
const { data } = await obtenerFondoPorSede({ sedeId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await obtenerFondoPorSede(dataConnect, obtenerFondoPorSedeVars);

console.log(data.sede);

// Or, you can use the `Promise` API.
obtenerFondoPorSede(obtenerFondoPorSedeVars).then((response) => {
  const data = response.data;
  console.log(data.sede);
});
```

### Using `ObtenerFondoPorSede`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, obtenerFondoPorSedeRef, ObtenerFondoPorSedeVariables } from '@dataconnect/generated';

// The `ObtenerFondoPorSede` query requires an argument of type `ObtenerFondoPorSedeVariables`:
const obtenerFondoPorSedeVars: ObtenerFondoPorSedeVariables = {
  sedeId: ..., 
};

// Call the `obtenerFondoPorSedeRef()` function to get a reference to the query.
const ref = obtenerFondoPorSedeRef(obtenerFondoPorSedeVars);
// Variables can be defined inline as well.
const ref = obtenerFondoPorSedeRef({ sedeId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = obtenerFondoPorSedeRef(dataConnect, obtenerFondoPorSedeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sede);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sede);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CrearUsuario
You can execute the `CrearUsuario` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearUsuario(vars: CrearUsuarioVariables): MutationPromise<CrearUsuarioData, CrearUsuarioVariables>;

interface CrearUsuarioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearUsuarioVariables): MutationRef<CrearUsuarioData, CrearUsuarioVariables>;
}
export const crearUsuarioRef: CrearUsuarioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearUsuario(dc: DataConnect, vars: CrearUsuarioVariables): MutationPromise<CrearUsuarioData, CrearUsuarioVariables>;

interface CrearUsuarioRef {
  ...
  (dc: DataConnect, vars: CrearUsuarioVariables): MutationRef<CrearUsuarioData, CrearUsuarioVariables>;
}
export const crearUsuarioRef: CrearUsuarioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearUsuarioRef:
```typescript
const name = crearUsuarioRef.operationName;
console.log(name);
```

### Variables
The `CrearUsuario` mutation requires an argument of type `CrearUsuarioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearUsuarioVariables {
  nombre: string;
  apellido: string;
  cedula: string;
  fechaNacimiento: DateString;
  cargo: string;
  nivelAdministrativo: string;
  hashBiometrico: string;
  permisosDB?: string | null;
  email: string;
  rol: string;
  sedeId: UUIDString;
  activo: boolean;
}
```
### Return Type
Recall that executing the `CrearUsuario` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearUsuarioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearUsuarioData {
  usuario_insert: Usuario_Key;
}
```
### Using `CrearUsuario`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearUsuario, CrearUsuarioVariables } from '@dataconnect/generated';

// The `CrearUsuario` mutation requires an argument of type `CrearUsuarioVariables`:
const crearUsuarioVars: CrearUsuarioVariables = {
  nombre: ..., 
  apellido: ..., 
  cedula: ..., 
  fechaNacimiento: ..., 
  cargo: ..., 
  nivelAdministrativo: ..., 
  hashBiometrico: ..., 
  permisosDB: ..., // optional
  email: ..., 
  rol: ..., 
  sedeId: ..., 
  activo: ..., 
};

// Call the `crearUsuario()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearUsuario(crearUsuarioVars);
// Variables can be defined inline as well.
const { data } = await crearUsuario({ nombre: ..., apellido: ..., cedula: ..., fechaNacimiento: ..., cargo: ..., nivelAdministrativo: ..., hashBiometrico: ..., permisosDB: ..., email: ..., rol: ..., sedeId: ..., activo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearUsuario(dataConnect, crearUsuarioVars);

console.log(data.usuario_insert);

// Or, you can use the `Promise` API.
crearUsuario(crearUsuarioVars).then((response) => {
  const data = response.data;
  console.log(data.usuario_insert);
});
```

### Using `CrearUsuario`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearUsuarioRef, CrearUsuarioVariables } from '@dataconnect/generated';

// The `CrearUsuario` mutation requires an argument of type `CrearUsuarioVariables`:
const crearUsuarioVars: CrearUsuarioVariables = {
  nombre: ..., 
  apellido: ..., 
  cedula: ..., 
  fechaNacimiento: ..., 
  cargo: ..., 
  nivelAdministrativo: ..., 
  hashBiometrico: ..., 
  permisosDB: ..., // optional
  email: ..., 
  rol: ..., 
  sedeId: ..., 
  activo: ..., 
};

// Call the `crearUsuarioRef()` function to get a reference to the mutation.
const ref = crearUsuarioRef(crearUsuarioVars);
// Variables can be defined inline as well.
const ref = crearUsuarioRef({ nombre: ..., apellido: ..., cedula: ..., fechaNacimiento: ..., cargo: ..., nivelAdministrativo: ..., hashBiometrico: ..., permisosDB: ..., email: ..., rol: ..., sedeId: ..., activo: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearUsuarioRef(dataConnect, crearUsuarioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.usuario_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario_insert);
});
```

## ActualizarMiPerfil
You can execute the `ActualizarMiPerfil` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarMiPerfil(vars: ActualizarMiPerfilVariables): MutationPromise<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;

interface ActualizarMiPerfilRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarMiPerfilVariables): MutationRef<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;
}
export const actualizarMiPerfilRef: ActualizarMiPerfilRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarMiPerfil(dc: DataConnect, vars: ActualizarMiPerfilVariables): MutationPromise<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;

interface ActualizarMiPerfilRef {
  ...
  (dc: DataConnect, vars: ActualizarMiPerfilVariables): MutationRef<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;
}
export const actualizarMiPerfilRef: ActualizarMiPerfilRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarMiPerfilRef:
```typescript
const name = actualizarMiPerfilRef.operationName;
console.log(name);
```

### Variables
The `ActualizarMiPerfil` mutation requires an argument of type `ActualizarMiPerfilVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarMiPerfilVariables {
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
}
```
### Return Type
Recall that executing the `ActualizarMiPerfil` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarMiPerfilData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarMiPerfilData {
  usuario_update?: Usuario_Key | null;
}
```
### Using `ActualizarMiPerfil`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarMiPerfil, ActualizarMiPerfilVariables } from '@dataconnect/generated';

// The `ActualizarMiPerfil` mutation requires an argument of type `ActualizarMiPerfilVariables`:
const actualizarMiPerfilVars: ActualizarMiPerfilVariables = {
  nombre: ..., 
  apellido: ..., 
  cedula: ..., 
  email: ..., 
};

// Call the `actualizarMiPerfil()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarMiPerfil(actualizarMiPerfilVars);
// Variables can be defined inline as well.
const { data } = await actualizarMiPerfil({ nombre: ..., apellido: ..., cedula: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarMiPerfil(dataConnect, actualizarMiPerfilVars);

console.log(data.usuario_update);

// Or, you can use the `Promise` API.
actualizarMiPerfil(actualizarMiPerfilVars).then((response) => {
  const data = response.data;
  console.log(data.usuario_update);
});
```

### Using `ActualizarMiPerfil`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarMiPerfilRef, ActualizarMiPerfilVariables } from '@dataconnect/generated';

// The `ActualizarMiPerfil` mutation requires an argument of type `ActualizarMiPerfilVariables`:
const actualizarMiPerfilVars: ActualizarMiPerfilVariables = {
  nombre: ..., 
  apellido: ..., 
  cedula: ..., 
  email: ..., 
};

// Call the `actualizarMiPerfilRef()` function to get a reference to the mutation.
const ref = actualizarMiPerfilRef(actualizarMiPerfilVars);
// Variables can be defined inline as well.
const ref = actualizarMiPerfilRef({ nombre: ..., apellido: ..., cedula: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarMiPerfilRef(dataConnect, actualizarMiPerfilVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.usuario_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario_update);
});
```

## EliminarUsuario
You can execute the `EliminarUsuario` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarUsuario(vars: EliminarUsuarioVariables): MutationPromise<EliminarUsuarioData, EliminarUsuarioVariables>;

interface EliminarUsuarioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarUsuarioVariables): MutationRef<EliminarUsuarioData, EliminarUsuarioVariables>;
}
export const eliminarUsuarioRef: EliminarUsuarioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarUsuario(dc: DataConnect, vars: EliminarUsuarioVariables): MutationPromise<EliminarUsuarioData, EliminarUsuarioVariables>;

interface EliminarUsuarioRef {
  ...
  (dc: DataConnect, vars: EliminarUsuarioVariables): MutationRef<EliminarUsuarioData, EliminarUsuarioVariables>;
}
export const eliminarUsuarioRef: EliminarUsuarioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarUsuarioRef:
```typescript
const name = eliminarUsuarioRef.operationName;
console.log(name);
```

### Variables
The `EliminarUsuario` mutation requires an argument of type `EliminarUsuarioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarUsuarioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarUsuario` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarUsuarioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarUsuarioData {
  usuario_delete?: Usuario_Key | null;
}
```
### Using `EliminarUsuario`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarUsuario, EliminarUsuarioVariables } from '@dataconnect/generated';

// The `EliminarUsuario` mutation requires an argument of type `EliminarUsuarioVariables`:
const eliminarUsuarioVars: EliminarUsuarioVariables = {
  id: ..., 
};

// Call the `eliminarUsuario()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarUsuario(eliminarUsuarioVars);
// Variables can be defined inline as well.
const { data } = await eliminarUsuario({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarUsuario(dataConnect, eliminarUsuarioVars);

console.log(data.usuario_delete);

// Or, you can use the `Promise` API.
eliminarUsuario(eliminarUsuarioVars).then((response) => {
  const data = response.data;
  console.log(data.usuario_delete);
});
```

### Using `EliminarUsuario`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarUsuarioRef, EliminarUsuarioVariables } from '@dataconnect/generated';

// The `EliminarUsuario` mutation requires an argument of type `EliminarUsuarioVariables`:
const eliminarUsuarioVars: EliminarUsuarioVariables = {
  id: ..., 
};

// Call the `eliminarUsuarioRef()` function to get a reference to the mutation.
const ref = eliminarUsuarioRef(eliminarUsuarioVars);
// Variables can be defined inline as well.
const ref = eliminarUsuarioRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarUsuarioRef(dataConnect, eliminarUsuarioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.usuario_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.usuario_delete);
});
```

## CrearSede
You can execute the `CrearSede` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearSede(vars: CrearSedeVariables): MutationPromise<CrearSedeData, CrearSedeVariables>;

interface CrearSedeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearSedeVariables): MutationRef<CrearSedeData, CrearSedeVariables>;
}
export const crearSedeRef: CrearSedeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearSede(dc: DataConnect, vars: CrearSedeVariables): MutationPromise<CrearSedeData, CrearSedeVariables>;

interface CrearSedeRef {
  ...
  (dc: DataConnect, vars: CrearSedeVariables): MutationRef<CrearSedeData, CrearSedeVariables>;
}
export const crearSedeRef: CrearSedeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearSedeRef:
```typescript
const name = crearSedeRef.operationName;
console.log(name);
```

### Variables
The `CrearSede` mutation requires an argument of type `CrearSedeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearSedeVariables {
  nombre: string;
  direccion: string;
  telefono?: string | null;
  contacto?: string | null;
}
```
### Return Type
Recall that executing the `CrearSede` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearSedeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearSedeData {
  sede_insert: Sede_Key;
}
```
### Using `CrearSede`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearSede, CrearSedeVariables } from '@dataconnect/generated';

// The `CrearSede` mutation requires an argument of type `CrearSedeVariables`:
const crearSedeVars: CrearSedeVariables = {
  nombre: ..., 
  direccion: ..., 
  telefono: ..., // optional
  contacto: ..., // optional
};

// Call the `crearSede()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearSede(crearSedeVars);
// Variables can be defined inline as well.
const { data } = await crearSede({ nombre: ..., direccion: ..., telefono: ..., contacto: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearSede(dataConnect, crearSedeVars);

console.log(data.sede_insert);

// Or, you can use the `Promise` API.
crearSede(crearSedeVars).then((response) => {
  const data = response.data;
  console.log(data.sede_insert);
});
```

### Using `CrearSede`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearSedeRef, CrearSedeVariables } from '@dataconnect/generated';

// The `CrearSede` mutation requires an argument of type `CrearSedeVariables`:
const crearSedeVars: CrearSedeVariables = {
  nombre: ..., 
  direccion: ..., 
  telefono: ..., // optional
  contacto: ..., // optional
};

// Call the `crearSedeRef()` function to get a reference to the mutation.
const ref = crearSedeRef(crearSedeVars);
// Variables can be defined inline as well.
const ref = crearSedeRef({ nombre: ..., direccion: ..., telefono: ..., contacto: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearSedeRef(dataConnect, crearSedeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sede_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sede_insert);
});
```

## ActualizarSede
You can execute the `ActualizarSede` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarSede(vars: ActualizarSedeVariables): MutationPromise<ActualizarSedeData, ActualizarSedeVariables>;

interface ActualizarSedeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarSedeVariables): MutationRef<ActualizarSedeData, ActualizarSedeVariables>;
}
export const actualizarSedeRef: ActualizarSedeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarSede(dc: DataConnect, vars: ActualizarSedeVariables): MutationPromise<ActualizarSedeData, ActualizarSedeVariables>;

interface ActualizarSedeRef {
  ...
  (dc: DataConnect, vars: ActualizarSedeVariables): MutationRef<ActualizarSedeData, ActualizarSedeVariables>;
}
export const actualizarSedeRef: ActualizarSedeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarSedeRef:
```typescript
const name = actualizarSedeRef.operationName;
console.log(name);
```

### Variables
The `ActualizarSede` mutation requires an argument of type `ActualizarSedeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarSedeVariables {
  id: UUIDString;
  nombre: string;
  direccion: string;
  telefono?: string | null;
  contacto?: string | null;
}
```
### Return Type
Recall that executing the `ActualizarSede` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarSedeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarSedeData {
  sede_update?: Sede_Key | null;
}
```
### Using `ActualizarSede`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarSede, ActualizarSedeVariables } from '@dataconnect/generated';

// The `ActualizarSede` mutation requires an argument of type `ActualizarSedeVariables`:
const actualizarSedeVars: ActualizarSedeVariables = {
  id: ..., 
  nombre: ..., 
  direccion: ..., 
  telefono: ..., // optional
  contacto: ..., // optional
};

// Call the `actualizarSede()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarSede(actualizarSedeVars);
// Variables can be defined inline as well.
const { data } = await actualizarSede({ id: ..., nombre: ..., direccion: ..., telefono: ..., contacto: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarSede(dataConnect, actualizarSedeVars);

console.log(data.sede_update);

// Or, you can use the `Promise` API.
actualizarSede(actualizarSedeVars).then((response) => {
  const data = response.data;
  console.log(data.sede_update);
});
```

### Using `ActualizarSede`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarSedeRef, ActualizarSedeVariables } from '@dataconnect/generated';

// The `ActualizarSede` mutation requires an argument of type `ActualizarSedeVariables`:
const actualizarSedeVars: ActualizarSedeVariables = {
  id: ..., 
  nombre: ..., 
  direccion: ..., 
  telefono: ..., // optional
  contacto: ..., // optional
};

// Call the `actualizarSedeRef()` function to get a reference to the mutation.
const ref = actualizarSedeRef(actualizarSedeVars);
// Variables can be defined inline as well.
const ref = actualizarSedeRef({ id: ..., nombre: ..., direccion: ..., telefono: ..., contacto: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarSedeRef(dataConnect, actualizarSedeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sede_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sede_update);
});
```

## EliminarSede
You can execute the `EliminarSede` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarSede(vars: EliminarSedeVariables): MutationPromise<EliminarSedeData, EliminarSedeVariables>;

interface EliminarSedeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarSedeVariables): MutationRef<EliminarSedeData, EliminarSedeVariables>;
}
export const eliminarSedeRef: EliminarSedeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarSede(dc: DataConnect, vars: EliminarSedeVariables): MutationPromise<EliminarSedeData, EliminarSedeVariables>;

interface EliminarSedeRef {
  ...
  (dc: DataConnect, vars: EliminarSedeVariables): MutationRef<EliminarSedeData, EliminarSedeVariables>;
}
export const eliminarSedeRef: EliminarSedeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarSedeRef:
```typescript
const name = eliminarSedeRef.operationName;
console.log(name);
```

### Variables
The `EliminarSede` mutation requires an argument of type `EliminarSedeVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarSedeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarSede` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarSedeData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarSedeData {
  sede_delete?: Sede_Key | null;
}
```
### Using `EliminarSede`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarSede, EliminarSedeVariables } from '@dataconnect/generated';

// The `EliminarSede` mutation requires an argument of type `EliminarSedeVariables`:
const eliminarSedeVars: EliminarSedeVariables = {
  id: ..., 
};

// Call the `eliminarSede()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarSede(eliminarSedeVars);
// Variables can be defined inline as well.
const { data } = await eliminarSede({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarSede(dataConnect, eliminarSedeVars);

console.log(data.sede_delete);

// Or, you can use the `Promise` API.
eliminarSede(eliminarSedeVars).then((response) => {
  const data = response.data;
  console.log(data.sede_delete);
});
```

### Using `EliminarSede`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarSedeRef, EliminarSedeVariables } from '@dataconnect/generated';

// The `EliminarSede` mutation requires an argument of type `EliminarSedeVariables`:
const eliminarSedeVars: EliminarSedeVariables = {
  id: ..., 
};

// Call the `eliminarSedeRef()` function to get a reference to the mutation.
const ref = eliminarSedeRef(eliminarSedeVars);
// Variables can be defined inline as well.
const ref = eliminarSedeRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarSedeRef(dataConnect, eliminarSedeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sede_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sede_delete);
});
```

## CrearTipoEquipo
You can execute the `CrearTipoEquipo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearTipoEquipo(vars: CrearTipoEquipoVariables): MutationPromise<CrearTipoEquipoData, CrearTipoEquipoVariables>;

interface CrearTipoEquipoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearTipoEquipoVariables): MutationRef<CrearTipoEquipoData, CrearTipoEquipoVariables>;
}
export const crearTipoEquipoRef: CrearTipoEquipoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearTipoEquipo(dc: DataConnect, vars: CrearTipoEquipoVariables): MutationPromise<CrearTipoEquipoData, CrearTipoEquipoVariables>;

interface CrearTipoEquipoRef {
  ...
  (dc: DataConnect, vars: CrearTipoEquipoVariables): MutationRef<CrearTipoEquipoData, CrearTipoEquipoVariables>;
}
export const crearTipoEquipoRef: CrearTipoEquipoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearTipoEquipoRef:
```typescript
const name = crearTipoEquipoRef.operationName;
console.log(name);
```

### Variables
The `CrearTipoEquipo` mutation requires an argument of type `CrearTipoEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearTipoEquipoVariables {
  nombreTipo: string;
  modelo: string;
  descripcion?: string | null;
  anchoBanda?: string | null;
  canales?: number | null;
  tecnologiaRelevante?: string | null;
  datosVarios?: string | null;
}
```
### Return Type
Recall that executing the `CrearTipoEquipo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearTipoEquipoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearTipoEquipoData {
  tipoEquipo_insert: TipoEquipo_Key;
}
```
### Using `CrearTipoEquipo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearTipoEquipo, CrearTipoEquipoVariables } from '@dataconnect/generated';

// The `CrearTipoEquipo` mutation requires an argument of type `CrearTipoEquipoVariables`:
const crearTipoEquipoVars: CrearTipoEquipoVariables = {
  nombreTipo: ..., 
  modelo: ..., 
  descripcion: ..., // optional
  anchoBanda: ..., // optional
  canales: ..., // optional
  tecnologiaRelevante: ..., // optional
  datosVarios: ..., // optional
};

// Call the `crearTipoEquipo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearTipoEquipo(crearTipoEquipoVars);
// Variables can be defined inline as well.
const { data } = await crearTipoEquipo({ nombreTipo: ..., modelo: ..., descripcion: ..., anchoBanda: ..., canales: ..., tecnologiaRelevante: ..., datosVarios: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearTipoEquipo(dataConnect, crearTipoEquipoVars);

console.log(data.tipoEquipo_insert);

// Or, you can use the `Promise` API.
crearTipoEquipo(crearTipoEquipoVars).then((response) => {
  const data = response.data;
  console.log(data.tipoEquipo_insert);
});
```

### Using `CrearTipoEquipo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearTipoEquipoRef, CrearTipoEquipoVariables } from '@dataconnect/generated';

// The `CrearTipoEquipo` mutation requires an argument of type `CrearTipoEquipoVariables`:
const crearTipoEquipoVars: CrearTipoEquipoVariables = {
  nombreTipo: ..., 
  modelo: ..., 
  descripcion: ..., // optional
  anchoBanda: ..., // optional
  canales: ..., // optional
  tecnologiaRelevante: ..., // optional
  datosVarios: ..., // optional
};

// Call the `crearTipoEquipoRef()` function to get a reference to the mutation.
const ref = crearTipoEquipoRef(crearTipoEquipoVars);
// Variables can be defined inline as well.
const ref = crearTipoEquipoRef({ nombreTipo: ..., modelo: ..., descripcion: ..., anchoBanda: ..., canales: ..., tecnologiaRelevante: ..., datosVarios: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearTipoEquipoRef(dataConnect, crearTipoEquipoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tipoEquipo_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tipoEquipo_insert);
});
```

## ActualizarTipoEquipo
You can execute the `ActualizarTipoEquipo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarTipoEquipo(vars: ActualizarTipoEquipoVariables): MutationPromise<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;

interface ActualizarTipoEquipoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarTipoEquipoVariables): MutationRef<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;
}
export const actualizarTipoEquipoRef: ActualizarTipoEquipoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarTipoEquipo(dc: DataConnect, vars: ActualizarTipoEquipoVariables): MutationPromise<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;

interface ActualizarTipoEquipoRef {
  ...
  (dc: DataConnect, vars: ActualizarTipoEquipoVariables): MutationRef<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;
}
export const actualizarTipoEquipoRef: ActualizarTipoEquipoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarTipoEquipoRef:
```typescript
const name = actualizarTipoEquipoRef.operationName;
console.log(name);
```

### Variables
The `ActualizarTipoEquipo` mutation requires an argument of type `ActualizarTipoEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarTipoEquipoVariables {
  id: UUIDString;
  nombreTipo: string;
  descripcion?: string | null;
  anchoBanda?: string | null;
  canales?: number | null;
}
```
### Return Type
Recall that executing the `ActualizarTipoEquipo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarTipoEquipoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarTipoEquipoData {
  tipoEquipo_update?: TipoEquipo_Key | null;
}
```
### Using `ActualizarTipoEquipo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarTipoEquipo, ActualizarTipoEquipoVariables } from '@dataconnect/generated';

// The `ActualizarTipoEquipo` mutation requires an argument of type `ActualizarTipoEquipoVariables`:
const actualizarTipoEquipoVars: ActualizarTipoEquipoVariables = {
  id: ..., 
  nombreTipo: ..., 
  descripcion: ..., // optional
  anchoBanda: ..., // optional
  canales: ..., // optional
};

// Call the `actualizarTipoEquipo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarTipoEquipo(actualizarTipoEquipoVars);
// Variables can be defined inline as well.
const { data } = await actualizarTipoEquipo({ id: ..., nombreTipo: ..., descripcion: ..., anchoBanda: ..., canales: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarTipoEquipo(dataConnect, actualizarTipoEquipoVars);

console.log(data.tipoEquipo_update);

// Or, you can use the `Promise` API.
actualizarTipoEquipo(actualizarTipoEquipoVars).then((response) => {
  const data = response.data;
  console.log(data.tipoEquipo_update);
});
```

### Using `ActualizarTipoEquipo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarTipoEquipoRef, ActualizarTipoEquipoVariables } from '@dataconnect/generated';

// The `ActualizarTipoEquipo` mutation requires an argument of type `ActualizarTipoEquipoVariables`:
const actualizarTipoEquipoVars: ActualizarTipoEquipoVariables = {
  id: ..., 
  nombreTipo: ..., 
  descripcion: ..., // optional
  anchoBanda: ..., // optional
  canales: ..., // optional
};

// Call the `actualizarTipoEquipoRef()` function to get a reference to the mutation.
const ref = actualizarTipoEquipoRef(actualizarTipoEquipoVars);
// Variables can be defined inline as well.
const ref = actualizarTipoEquipoRef({ id: ..., nombreTipo: ..., descripcion: ..., anchoBanda: ..., canales: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarTipoEquipoRef(dataConnect, actualizarTipoEquipoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tipoEquipo_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tipoEquipo_update);
});
```

## EliminarTipoEquipo
You can execute the `EliminarTipoEquipo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarTipoEquipo(vars: EliminarTipoEquipoVariables): MutationPromise<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;

interface EliminarTipoEquipoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarTipoEquipoVariables): MutationRef<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;
}
export const eliminarTipoEquipoRef: EliminarTipoEquipoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarTipoEquipo(dc: DataConnect, vars: EliminarTipoEquipoVariables): MutationPromise<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;

interface EliminarTipoEquipoRef {
  ...
  (dc: DataConnect, vars: EliminarTipoEquipoVariables): MutationRef<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;
}
export const eliminarTipoEquipoRef: EliminarTipoEquipoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarTipoEquipoRef:
```typescript
const name = eliminarTipoEquipoRef.operationName;
console.log(name);
```

### Variables
The `EliminarTipoEquipo` mutation requires an argument of type `EliminarTipoEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarTipoEquipoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarTipoEquipo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarTipoEquipoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarTipoEquipoData {
  tipoEquipo_delete?: TipoEquipo_Key | null;
}
```
### Using `EliminarTipoEquipo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarTipoEquipo, EliminarTipoEquipoVariables } from '@dataconnect/generated';

// The `EliminarTipoEquipo` mutation requires an argument of type `EliminarTipoEquipoVariables`:
const eliminarTipoEquipoVars: EliminarTipoEquipoVariables = {
  id: ..., 
};

// Call the `eliminarTipoEquipo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarTipoEquipo(eliminarTipoEquipoVars);
// Variables can be defined inline as well.
const { data } = await eliminarTipoEquipo({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarTipoEquipo(dataConnect, eliminarTipoEquipoVars);

console.log(data.tipoEquipo_delete);

// Or, you can use the `Promise` API.
eliminarTipoEquipo(eliminarTipoEquipoVars).then((response) => {
  const data = response.data;
  console.log(data.tipoEquipo_delete);
});
```

### Using `EliminarTipoEquipo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarTipoEquipoRef, EliminarTipoEquipoVariables } from '@dataconnect/generated';

// The `EliminarTipoEquipo` mutation requires an argument of type `EliminarTipoEquipoVariables`:
const eliminarTipoEquipoVars: EliminarTipoEquipoVariables = {
  id: ..., 
};

// Call the `eliminarTipoEquipoRef()` function to get a reference to the mutation.
const ref = eliminarTipoEquipoRef(eliminarTipoEquipoVars);
// Variables can be defined inline as well.
const ref = eliminarTipoEquipoRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarTipoEquipoRef(dataConnect, eliminarTipoEquipoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tipoEquipo_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tipoEquipo_delete);
});
```

## CrearEquipoInventario
You can execute the `CrearEquipoInventario` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearEquipoInventario(vars: CrearEquipoInventarioVariables): MutationPromise<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;

interface CrearEquipoInventarioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearEquipoInventarioVariables): MutationRef<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;
}
export const crearEquipoInventarioRef: CrearEquipoInventarioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearEquipoInventario(dc: DataConnect, vars: CrearEquipoInventarioVariables): MutationPromise<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;

interface CrearEquipoInventarioRef {
  ...
  (dc: DataConnect, vars: CrearEquipoInventarioVariables): MutationRef<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;
}
export const crearEquipoInventarioRef: CrearEquipoInventarioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearEquipoInventarioRef:
```typescript
const name = crearEquipoInventarioRef.operationName;
console.log(name);
```

### Variables
The `CrearEquipoInventario` mutation requires an argument of type `CrearEquipoInventarioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearEquipoInventarioVariables {
  tipoEquipoModelo: TipoEquipo_Key;
  modelo: string;
  nombreDescriptivo: string;
  valor: number;
  cantidadDisponible: number;
  serial: string;
  estado: string;
  ubicacionActualId: UUIDString;
}
```
### Return Type
Recall that executing the `CrearEquipoInventario` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearEquipoInventarioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearEquipoInventarioData {
  equipoInventario_insert: EquipoInventario_Key;
}
```
### Using `CrearEquipoInventario`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearEquipoInventario, CrearEquipoInventarioVariables } from '@dataconnect/generated';

// The `CrearEquipoInventario` mutation requires an argument of type `CrearEquipoInventarioVariables`:
const crearEquipoInventarioVars: CrearEquipoInventarioVariables = {
  tipoEquipoModelo: ..., 
  modelo: ..., 
  nombreDescriptivo: ..., 
  valor: ..., 
  cantidadDisponible: ..., 
  serial: ..., 
  estado: ..., 
  ubicacionActualId: ..., 
};

// Call the `crearEquipoInventario()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearEquipoInventario(crearEquipoInventarioVars);
// Variables can be defined inline as well.
const { data } = await crearEquipoInventario({ tipoEquipoModelo: ..., modelo: ..., nombreDescriptivo: ..., valor: ..., cantidadDisponible: ..., serial: ..., estado: ..., ubicacionActualId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearEquipoInventario(dataConnect, crearEquipoInventarioVars);

console.log(data.equipoInventario_insert);

// Or, you can use the `Promise` API.
crearEquipoInventario(crearEquipoInventarioVars).then((response) => {
  const data = response.data;
  console.log(data.equipoInventario_insert);
});
```

### Using `CrearEquipoInventario`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearEquipoInventarioRef, CrearEquipoInventarioVariables } from '@dataconnect/generated';

// The `CrearEquipoInventario` mutation requires an argument of type `CrearEquipoInventarioVariables`:
const crearEquipoInventarioVars: CrearEquipoInventarioVariables = {
  tipoEquipoModelo: ..., 
  modelo: ..., 
  nombreDescriptivo: ..., 
  valor: ..., 
  cantidadDisponible: ..., 
  serial: ..., 
  estado: ..., 
  ubicacionActualId: ..., 
};

// Call the `crearEquipoInventarioRef()` function to get a reference to the mutation.
const ref = crearEquipoInventarioRef(crearEquipoInventarioVars);
// Variables can be defined inline as well.
const ref = crearEquipoInventarioRef({ tipoEquipoModelo: ..., modelo: ..., nombreDescriptivo: ..., valor: ..., cantidadDisponible: ..., serial: ..., estado: ..., ubicacionActualId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearEquipoInventarioRef(dataConnect, crearEquipoInventarioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipoInventario_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipoInventario_insert);
});
```

## ActualizarEquipoInventario
You can execute the `ActualizarEquipoInventario` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarEquipoInventario(vars: ActualizarEquipoInventarioVariables): MutationPromise<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;

interface ActualizarEquipoInventarioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarEquipoInventarioVariables): MutationRef<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;
}
export const actualizarEquipoInventarioRef: ActualizarEquipoInventarioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarEquipoInventario(dc: DataConnect, vars: ActualizarEquipoInventarioVariables): MutationPromise<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;

interface ActualizarEquipoInventarioRef {
  ...
  (dc: DataConnect, vars: ActualizarEquipoInventarioVariables): MutationRef<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;
}
export const actualizarEquipoInventarioRef: ActualizarEquipoInventarioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarEquipoInventarioRef:
```typescript
const name = actualizarEquipoInventarioRef.operationName;
console.log(name);
```

### Variables
The `ActualizarEquipoInventario` mutation requires an argument of type `ActualizarEquipoInventarioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarEquipoInventarioVariables {
  id: UUIDString;
  nombreDescriptivo: string;
  valor: number;
  cantidadDisponible: number;
  estado: string;
  ubicacionActualId: UUIDString;
}
```
### Return Type
Recall that executing the `ActualizarEquipoInventario` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarEquipoInventarioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarEquipoInventarioData {
  equipoInventario_update?: EquipoInventario_Key | null;
}
```
### Using `ActualizarEquipoInventario`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarEquipoInventario, ActualizarEquipoInventarioVariables } from '@dataconnect/generated';

// The `ActualizarEquipoInventario` mutation requires an argument of type `ActualizarEquipoInventarioVariables`:
const actualizarEquipoInventarioVars: ActualizarEquipoInventarioVariables = {
  id: ..., 
  nombreDescriptivo: ..., 
  valor: ..., 
  cantidadDisponible: ..., 
  estado: ..., 
  ubicacionActualId: ..., 
};

// Call the `actualizarEquipoInventario()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarEquipoInventario(actualizarEquipoInventarioVars);
// Variables can be defined inline as well.
const { data } = await actualizarEquipoInventario({ id: ..., nombreDescriptivo: ..., valor: ..., cantidadDisponible: ..., estado: ..., ubicacionActualId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarEquipoInventario(dataConnect, actualizarEquipoInventarioVars);

console.log(data.equipoInventario_update);

// Or, you can use the `Promise` API.
actualizarEquipoInventario(actualizarEquipoInventarioVars).then((response) => {
  const data = response.data;
  console.log(data.equipoInventario_update);
});
```

### Using `ActualizarEquipoInventario`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarEquipoInventarioRef, ActualizarEquipoInventarioVariables } from '@dataconnect/generated';

// The `ActualizarEquipoInventario` mutation requires an argument of type `ActualizarEquipoInventarioVariables`:
const actualizarEquipoInventarioVars: ActualizarEquipoInventarioVariables = {
  id: ..., 
  nombreDescriptivo: ..., 
  valor: ..., 
  cantidadDisponible: ..., 
  estado: ..., 
  ubicacionActualId: ..., 
};

// Call the `actualizarEquipoInventarioRef()` function to get a reference to the mutation.
const ref = actualizarEquipoInventarioRef(actualizarEquipoInventarioVars);
// Variables can be defined inline as well.
const ref = actualizarEquipoInventarioRef({ id: ..., nombreDescriptivo: ..., valor: ..., cantidadDisponible: ..., estado: ..., ubicacionActualId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarEquipoInventarioRef(dataConnect, actualizarEquipoInventarioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipoInventario_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipoInventario_update);
});
```

## EliminarEquipoInventario
You can execute the `EliminarEquipoInventario` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarEquipoInventario(vars: EliminarEquipoInventarioVariables): MutationPromise<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;

interface EliminarEquipoInventarioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarEquipoInventarioVariables): MutationRef<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;
}
export const eliminarEquipoInventarioRef: EliminarEquipoInventarioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarEquipoInventario(dc: DataConnect, vars: EliminarEquipoInventarioVariables): MutationPromise<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;

interface EliminarEquipoInventarioRef {
  ...
  (dc: DataConnect, vars: EliminarEquipoInventarioVariables): MutationRef<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;
}
export const eliminarEquipoInventarioRef: EliminarEquipoInventarioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarEquipoInventarioRef:
```typescript
const name = eliminarEquipoInventarioRef.operationName;
console.log(name);
```

### Variables
The `EliminarEquipoInventario` mutation requires an argument of type `EliminarEquipoInventarioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarEquipoInventarioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarEquipoInventario` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarEquipoInventarioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarEquipoInventarioData {
  equipoInventario_delete?: EquipoInventario_Key | null;
}
```
### Using `EliminarEquipoInventario`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarEquipoInventario, EliminarEquipoInventarioVariables } from '@dataconnect/generated';

// The `EliminarEquipoInventario` mutation requires an argument of type `EliminarEquipoInventarioVariables`:
const eliminarEquipoInventarioVars: EliminarEquipoInventarioVariables = {
  id: ..., 
};

// Call the `eliminarEquipoInventario()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarEquipoInventario(eliminarEquipoInventarioVars);
// Variables can be defined inline as well.
const { data } = await eliminarEquipoInventario({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarEquipoInventario(dataConnect, eliminarEquipoInventarioVars);

console.log(data.equipoInventario_delete);

// Or, you can use the `Promise` API.
eliminarEquipoInventario(eliminarEquipoInventarioVars).then((response) => {
  const data = response.data;
  console.log(data.equipoInventario_delete);
});
```

### Using `EliminarEquipoInventario`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarEquipoInventarioRef, EliminarEquipoInventarioVariables } from '@dataconnect/generated';

// The `EliminarEquipoInventario` mutation requires an argument of type `EliminarEquipoInventarioVariables`:
const eliminarEquipoInventarioVars: EliminarEquipoInventarioVariables = {
  id: ..., 
};

// Call the `eliminarEquipoInventarioRef()` function to get a reference to the mutation.
const ref = eliminarEquipoInventarioRef(eliminarEquipoInventarioVars);
// Variables can be defined inline as well.
const ref = eliminarEquipoInventarioRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarEquipoInventarioRef(dataConnect, eliminarEquipoInventarioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipoInventario_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipoInventario_delete);
});
```

## CrearEnvioEquipo
You can execute the `CrearEnvioEquipo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearEnvioEquipo(vars: CrearEnvioEquipoVariables): MutationPromise<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;

interface CrearEnvioEquipoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearEnvioEquipoVariables): MutationRef<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;
}
export const crearEnvioEquipoRef: CrearEnvioEquipoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearEnvioEquipo(dc: DataConnect, vars: CrearEnvioEquipoVariables): MutationPromise<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;

interface CrearEnvioEquipoRef {
  ...
  (dc: DataConnect, vars: CrearEnvioEquipoVariables): MutationRef<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;
}
export const crearEnvioEquipoRef: CrearEnvioEquipoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearEnvioEquipoRef:
```typescript
const name = crearEnvioEquipoRef.operationName;
console.log(name);
```

### Variables
The `CrearEnvioEquipo` mutation requires an argument of type `CrearEnvioEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearEnvioEquipoVariables {
  gerenciaEncargadaId: UUIDString;
  gerenciaReceptoraId: UUIDString;
  sedeDestinoId: UUIDString;
  sedeOrigenId: UUIDString;
  tipoEnvio: string;
  fechaEnvio: DateString;
  descripcionGeneral?: string | null;
}
```
### Return Type
Recall that executing the `CrearEnvioEquipo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearEnvioEquipoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearEnvioEquipoData {
  envioEquipo_insert: EnvioEquipo_Key;
}
```
### Using `CrearEnvioEquipo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearEnvioEquipo, CrearEnvioEquipoVariables } from '@dataconnect/generated';

// The `CrearEnvioEquipo` mutation requires an argument of type `CrearEnvioEquipoVariables`:
const crearEnvioEquipoVars: CrearEnvioEquipoVariables = {
  gerenciaEncargadaId: ..., 
  gerenciaReceptoraId: ..., 
  sedeDestinoId: ..., 
  sedeOrigenId: ..., 
  tipoEnvio: ..., 
  fechaEnvio: ..., 
  descripcionGeneral: ..., // optional
};

// Call the `crearEnvioEquipo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearEnvioEquipo(crearEnvioEquipoVars);
// Variables can be defined inline as well.
const { data } = await crearEnvioEquipo({ gerenciaEncargadaId: ..., gerenciaReceptoraId: ..., sedeDestinoId: ..., sedeOrigenId: ..., tipoEnvio: ..., fechaEnvio: ..., descripcionGeneral: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearEnvioEquipo(dataConnect, crearEnvioEquipoVars);

console.log(data.envioEquipo_insert);

// Or, you can use the `Promise` API.
crearEnvioEquipo(crearEnvioEquipoVars).then((response) => {
  const data = response.data;
  console.log(data.envioEquipo_insert);
});
```

### Using `CrearEnvioEquipo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearEnvioEquipoRef, CrearEnvioEquipoVariables } from '@dataconnect/generated';

// The `CrearEnvioEquipo` mutation requires an argument of type `CrearEnvioEquipoVariables`:
const crearEnvioEquipoVars: CrearEnvioEquipoVariables = {
  gerenciaEncargadaId: ..., 
  gerenciaReceptoraId: ..., 
  sedeDestinoId: ..., 
  sedeOrigenId: ..., 
  tipoEnvio: ..., 
  fechaEnvio: ..., 
  descripcionGeneral: ..., // optional
};

// Call the `crearEnvioEquipoRef()` function to get a reference to the mutation.
const ref = crearEnvioEquipoRef(crearEnvioEquipoVars);
// Variables can be defined inline as well.
const ref = crearEnvioEquipoRef({ gerenciaEncargadaId: ..., gerenciaReceptoraId: ..., sedeDestinoId: ..., sedeOrigenId: ..., tipoEnvio: ..., fechaEnvio: ..., descripcionGeneral: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearEnvioEquipoRef(dataConnect, crearEnvioEquipoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.envioEquipo_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.envioEquipo_insert);
});
```

## RecepcionarEnvio
You can execute the `RecepcionarEnvio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
recepcionarEnvio(vars: RecepcionarEnvioVariables): MutationPromise<RecepcionarEnvioData, RecepcionarEnvioVariables>;

interface RecepcionarEnvioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecepcionarEnvioVariables): MutationRef<RecepcionarEnvioData, RecepcionarEnvioVariables>;
}
export const recepcionarEnvioRef: RecepcionarEnvioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recepcionarEnvio(dc: DataConnect, vars: RecepcionarEnvioVariables): MutationPromise<RecepcionarEnvioData, RecepcionarEnvioVariables>;

interface RecepcionarEnvioRef {
  ...
  (dc: DataConnect, vars: RecepcionarEnvioVariables): MutationRef<RecepcionarEnvioData, RecepcionarEnvioVariables>;
}
export const recepcionarEnvioRef: RecepcionarEnvioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recepcionarEnvioRef:
```typescript
const name = recepcionarEnvioRef.operationName;
console.log(name);
```

### Variables
The `RecepcionarEnvio` mutation requires an argument of type `RecepcionarEnvioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecepcionarEnvioVariables {
  id: UUIDString;
  fechaRecepcion: DateString;
}
```
### Return Type
Recall that executing the `RecepcionarEnvio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecepcionarEnvioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecepcionarEnvioData {
  envioEquipo_update?: EnvioEquipo_Key | null;
}
```
### Using `RecepcionarEnvio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recepcionarEnvio, RecepcionarEnvioVariables } from '@dataconnect/generated';

// The `RecepcionarEnvio` mutation requires an argument of type `RecepcionarEnvioVariables`:
const recepcionarEnvioVars: RecepcionarEnvioVariables = {
  id: ..., 
  fechaRecepcion: ..., 
};

// Call the `recepcionarEnvio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recepcionarEnvio(recepcionarEnvioVars);
// Variables can be defined inline as well.
const { data } = await recepcionarEnvio({ id: ..., fechaRecepcion: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recepcionarEnvio(dataConnect, recepcionarEnvioVars);

console.log(data.envioEquipo_update);

// Or, you can use the `Promise` API.
recepcionarEnvio(recepcionarEnvioVars).then((response) => {
  const data = response.data;
  console.log(data.envioEquipo_update);
});
```

### Using `RecepcionarEnvio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recepcionarEnvioRef, RecepcionarEnvioVariables } from '@dataconnect/generated';

// The `RecepcionarEnvio` mutation requires an argument of type `RecepcionarEnvioVariables`:
const recepcionarEnvioVars: RecepcionarEnvioVariables = {
  id: ..., 
  fechaRecepcion: ..., 
};

// Call the `recepcionarEnvioRef()` function to get a reference to the mutation.
const ref = recepcionarEnvioRef(recepcionarEnvioVars);
// Variables can be defined inline as well.
const ref = recepcionarEnvioRef({ id: ..., fechaRecepcion: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recepcionarEnvioRef(dataConnect, recepcionarEnvioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.envioEquipo_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.envioEquipo_update);
});
```

## EliminarEnvioEquipo
You can execute the `EliminarEnvioEquipo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarEnvioEquipo(vars: EliminarEnvioEquipoVariables): MutationPromise<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;

interface EliminarEnvioEquipoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarEnvioEquipoVariables): MutationRef<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;
}
export const eliminarEnvioEquipoRef: EliminarEnvioEquipoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarEnvioEquipo(dc: DataConnect, vars: EliminarEnvioEquipoVariables): MutationPromise<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;

interface EliminarEnvioEquipoRef {
  ...
  (dc: DataConnect, vars: EliminarEnvioEquipoVariables): MutationRef<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;
}
export const eliminarEnvioEquipoRef: EliminarEnvioEquipoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarEnvioEquipoRef:
```typescript
const name = eliminarEnvioEquipoRef.operationName;
console.log(name);
```

### Variables
The `EliminarEnvioEquipo` mutation requires an argument of type `EliminarEnvioEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarEnvioEquipoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarEnvioEquipo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarEnvioEquipoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarEnvioEquipoData {
  envioEquipo_delete?: EnvioEquipo_Key | null;
}
```
### Using `EliminarEnvioEquipo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarEnvioEquipo, EliminarEnvioEquipoVariables } from '@dataconnect/generated';

// The `EliminarEnvioEquipo` mutation requires an argument of type `EliminarEnvioEquipoVariables`:
const eliminarEnvioEquipoVars: EliminarEnvioEquipoVariables = {
  id: ..., 
};

// Call the `eliminarEnvioEquipo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarEnvioEquipo(eliminarEnvioEquipoVars);
// Variables can be defined inline as well.
const { data } = await eliminarEnvioEquipo({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarEnvioEquipo(dataConnect, eliminarEnvioEquipoVars);

console.log(data.envioEquipo_delete);

// Or, you can use the `Promise` API.
eliminarEnvioEquipo(eliminarEnvioEquipoVars).then((response) => {
  const data = response.data;
  console.log(data.envioEquipo_delete);
});
```

### Using `EliminarEnvioEquipo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarEnvioEquipoRef, EliminarEnvioEquipoVariables } from '@dataconnect/generated';

// The `EliminarEnvioEquipo` mutation requires an argument of type `EliminarEnvioEquipoVariables`:
const eliminarEnvioEquipoVars: EliminarEnvioEquipoVariables = {
  id: ..., 
};

// Call the `eliminarEnvioEquipoRef()` function to get a reference to the mutation.
const ref = eliminarEnvioEquipoRef(eliminarEnvioEquipoVars);
// Variables can be defined inline as well.
const ref = eliminarEnvioEquipoRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarEnvioEquipoRef(dataConnect, eliminarEnvioEquipoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.envioEquipo_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.envioEquipo_delete);
});
```

## RegistrarAsistencia
You can execute the `RegistrarAsistencia` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
registrarAsistencia(vars: RegistrarAsistenciaVariables): MutationPromise<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;

interface RegistrarAsistenciaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarAsistenciaVariables): MutationRef<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;
}
export const registrarAsistenciaRef: RegistrarAsistenciaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registrarAsistencia(dc: DataConnect, vars: RegistrarAsistenciaVariables): MutationPromise<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;

interface RegistrarAsistenciaRef {
  ...
  (dc: DataConnect, vars: RegistrarAsistenciaVariables): MutationRef<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;
}
export const registrarAsistenciaRef: RegistrarAsistenciaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registrarAsistenciaRef:
```typescript
const name = registrarAsistenciaRef.operationName;
console.log(name);
```

### Variables
The `RegistrarAsistencia` mutation requires an argument of type `RegistrarAsistenciaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegistrarAsistenciaVariables {
  usuarioId: UUIDString;
  fecha: DateString;
  horaEntradaManana: TimestampString;
  horaSalidaManana: TimestampString;
  horaEntradaTarde?: TimestampString | null;
  horaSalidaTarde?: TimestampString | null;
}
```
### Return Type
Recall that executing the `RegistrarAsistencia` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegistrarAsistenciaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegistrarAsistenciaData {
  asistencia_insert: Asistencia_Key;
}
```
### Using `RegistrarAsistencia`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registrarAsistencia, RegistrarAsistenciaVariables } from '@dataconnect/generated';

// The `RegistrarAsistencia` mutation requires an argument of type `RegistrarAsistenciaVariables`:
const registrarAsistenciaVars: RegistrarAsistenciaVariables = {
  usuarioId: ..., 
  fecha: ..., 
  horaEntradaManana: ..., 
  horaSalidaManana: ..., 
  horaEntradaTarde: ..., // optional
  horaSalidaTarde: ..., // optional
};

// Call the `registrarAsistencia()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registrarAsistencia(registrarAsistenciaVars);
// Variables can be defined inline as well.
const { data } = await registrarAsistencia({ usuarioId: ..., fecha: ..., horaEntradaManana: ..., horaSalidaManana: ..., horaEntradaTarde: ..., horaSalidaTarde: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registrarAsistencia(dataConnect, registrarAsistenciaVars);

console.log(data.asistencia_insert);

// Or, you can use the `Promise` API.
registrarAsistencia(registrarAsistenciaVars).then((response) => {
  const data = response.data;
  console.log(data.asistencia_insert);
});
```

### Using `RegistrarAsistencia`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registrarAsistenciaRef, RegistrarAsistenciaVariables } from '@dataconnect/generated';

// The `RegistrarAsistencia` mutation requires an argument of type `RegistrarAsistenciaVariables`:
const registrarAsistenciaVars: RegistrarAsistenciaVariables = {
  usuarioId: ..., 
  fecha: ..., 
  horaEntradaManana: ..., 
  horaSalidaManana: ..., 
  horaEntradaTarde: ..., // optional
  horaSalidaTarde: ..., // optional
};

// Call the `registrarAsistenciaRef()` function to get a reference to the mutation.
const ref = registrarAsistenciaRef(registrarAsistenciaVars);
// Variables can be defined inline as well.
const ref = registrarAsistenciaRef({ usuarioId: ..., fecha: ..., horaEntradaManana: ..., horaSalidaManana: ..., horaEntradaTarde: ..., horaSalidaTarde: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registrarAsistenciaRef(dataConnect, registrarAsistenciaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asistencia_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asistencia_insert);
});
```

## RegistrarEntradaManana
You can execute the `RegistrarEntradaManana` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
registrarEntradaManana(vars: RegistrarEntradaMananaVariables): MutationPromise<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;

interface RegistrarEntradaMananaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RegistrarEntradaMananaVariables): MutationRef<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;
}
export const registrarEntradaMananaRef: RegistrarEntradaMananaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
registrarEntradaManana(dc: DataConnect, vars: RegistrarEntradaMananaVariables): MutationPromise<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;

interface RegistrarEntradaMananaRef {
  ...
  (dc: DataConnect, vars: RegistrarEntradaMananaVariables): MutationRef<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;
}
export const registrarEntradaMananaRef: RegistrarEntradaMananaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the registrarEntradaMananaRef:
```typescript
const name = registrarEntradaMananaRef.operationName;
console.log(name);
```

### Variables
The `RegistrarEntradaManana` mutation requires an argument of type `RegistrarEntradaMananaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RegistrarEntradaMananaVariables {
  horaEntrada: TimestampString;
  horaSalidaManana: TimestampString;
}
```
### Return Type
Recall that executing the `RegistrarEntradaManana` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RegistrarEntradaMananaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RegistrarEntradaMananaData {
  asistencia_insert: Asistencia_Key;
}
```
### Using `RegistrarEntradaManana`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, registrarEntradaManana, RegistrarEntradaMananaVariables } from '@dataconnect/generated';

// The `RegistrarEntradaManana` mutation requires an argument of type `RegistrarEntradaMananaVariables`:
const registrarEntradaMananaVars: RegistrarEntradaMananaVariables = {
  horaEntrada: ..., 
  horaSalidaManana: ..., 
};

// Call the `registrarEntradaManana()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await registrarEntradaManana(registrarEntradaMananaVars);
// Variables can be defined inline as well.
const { data } = await registrarEntradaManana({ horaEntrada: ..., horaSalidaManana: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await registrarEntradaManana(dataConnect, registrarEntradaMananaVars);

console.log(data.asistencia_insert);

// Or, you can use the `Promise` API.
registrarEntradaManana(registrarEntradaMananaVars).then((response) => {
  const data = response.data;
  console.log(data.asistencia_insert);
});
```

### Using `RegistrarEntradaManana`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, registrarEntradaMananaRef, RegistrarEntradaMananaVariables } from '@dataconnect/generated';

// The `RegistrarEntradaManana` mutation requires an argument of type `RegistrarEntradaMananaVariables`:
const registrarEntradaMananaVars: RegistrarEntradaMananaVariables = {
  horaEntrada: ..., 
  horaSalidaManana: ..., 
};

// Call the `registrarEntradaMananaRef()` function to get a reference to the mutation.
const ref = registrarEntradaMananaRef(registrarEntradaMananaVars);
// Variables can be defined inline as well.
const ref = registrarEntradaMananaRef({ horaEntrada: ..., horaSalidaManana: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = registrarEntradaMananaRef(dataConnect, registrarEntradaMananaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asistencia_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asistencia_insert);
});
```

## ActualizarAsistencia
You can execute the `ActualizarAsistencia` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarAsistencia(vars: ActualizarAsistenciaVariables): MutationPromise<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;

interface ActualizarAsistenciaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarAsistenciaVariables): MutationRef<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;
}
export const actualizarAsistenciaRef: ActualizarAsistenciaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarAsistencia(dc: DataConnect, vars: ActualizarAsistenciaVariables): MutationPromise<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;

interface ActualizarAsistenciaRef {
  ...
  (dc: DataConnect, vars: ActualizarAsistenciaVariables): MutationRef<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;
}
export const actualizarAsistenciaRef: ActualizarAsistenciaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarAsistenciaRef:
```typescript
const name = actualizarAsistenciaRef.operationName;
console.log(name);
```

### Variables
The `ActualizarAsistencia` mutation requires an argument of type `ActualizarAsistenciaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarAsistenciaVariables {
  id: UUIDString;
  horaSalidaManana: TimestampString;
  horaEntradaTarde?: TimestampString | null;
  horaSalidaTarde?: TimestampString | null;
}
```
### Return Type
Recall that executing the `ActualizarAsistencia` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarAsistenciaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarAsistenciaData {
  asistencia_update?: Asistencia_Key | null;
}
```
### Using `ActualizarAsistencia`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarAsistencia, ActualizarAsistenciaVariables } from '@dataconnect/generated';

// The `ActualizarAsistencia` mutation requires an argument of type `ActualizarAsistenciaVariables`:
const actualizarAsistenciaVars: ActualizarAsistenciaVariables = {
  id: ..., 
  horaSalidaManana: ..., 
  horaEntradaTarde: ..., // optional
  horaSalidaTarde: ..., // optional
};

// Call the `actualizarAsistencia()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarAsistencia(actualizarAsistenciaVars);
// Variables can be defined inline as well.
const { data } = await actualizarAsistencia({ id: ..., horaSalidaManana: ..., horaEntradaTarde: ..., horaSalidaTarde: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarAsistencia(dataConnect, actualizarAsistenciaVars);

console.log(data.asistencia_update);

// Or, you can use the `Promise` API.
actualizarAsistencia(actualizarAsistenciaVars).then((response) => {
  const data = response.data;
  console.log(data.asistencia_update);
});
```

### Using `ActualizarAsistencia`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarAsistenciaRef, ActualizarAsistenciaVariables } from '@dataconnect/generated';

// The `ActualizarAsistencia` mutation requires an argument of type `ActualizarAsistenciaVariables`:
const actualizarAsistenciaVars: ActualizarAsistenciaVariables = {
  id: ..., 
  horaSalidaManana: ..., 
  horaEntradaTarde: ..., // optional
  horaSalidaTarde: ..., // optional
};

// Call the `actualizarAsistenciaRef()` function to get a reference to the mutation.
const ref = actualizarAsistenciaRef(actualizarAsistenciaVars);
// Variables can be defined inline as well.
const ref = actualizarAsistenciaRef({ id: ..., horaSalidaManana: ..., horaEntradaTarde: ..., horaSalidaTarde: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarAsistenciaRef(dataConnect, actualizarAsistenciaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asistencia_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asistencia_update);
});
```

## EliminarAsistencia
You can execute the `EliminarAsistencia` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarAsistencia(vars: EliminarAsistenciaVariables): MutationPromise<EliminarAsistenciaData, EliminarAsistenciaVariables>;

interface EliminarAsistenciaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarAsistenciaVariables): MutationRef<EliminarAsistenciaData, EliminarAsistenciaVariables>;
}
export const eliminarAsistenciaRef: EliminarAsistenciaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarAsistencia(dc: DataConnect, vars: EliminarAsistenciaVariables): MutationPromise<EliminarAsistenciaData, EliminarAsistenciaVariables>;

interface EliminarAsistenciaRef {
  ...
  (dc: DataConnect, vars: EliminarAsistenciaVariables): MutationRef<EliminarAsistenciaData, EliminarAsistenciaVariables>;
}
export const eliminarAsistenciaRef: EliminarAsistenciaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarAsistenciaRef:
```typescript
const name = eliminarAsistenciaRef.operationName;
console.log(name);
```

### Variables
The `EliminarAsistencia` mutation requires an argument of type `EliminarAsistenciaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarAsistenciaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarAsistencia` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarAsistenciaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarAsistenciaData {
  asistencia_delete?: Asistencia_Key | null;
}
```
### Using `EliminarAsistencia`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarAsistencia, EliminarAsistenciaVariables } from '@dataconnect/generated';

// The `EliminarAsistencia` mutation requires an argument of type `EliminarAsistenciaVariables`:
const eliminarAsistenciaVars: EliminarAsistenciaVariables = {
  id: ..., 
};

// Call the `eliminarAsistencia()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarAsistencia(eliminarAsistenciaVars);
// Variables can be defined inline as well.
const { data } = await eliminarAsistencia({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarAsistencia(dataConnect, eliminarAsistenciaVars);

console.log(data.asistencia_delete);

// Or, you can use the `Promise` API.
eliminarAsistencia(eliminarAsistenciaVars).then((response) => {
  const data = response.data;
  console.log(data.asistencia_delete);
});
```

### Using `EliminarAsistencia`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarAsistenciaRef, EliminarAsistenciaVariables } from '@dataconnect/generated';

// The `EliminarAsistencia` mutation requires an argument of type `EliminarAsistenciaVariables`:
const eliminarAsistenciaVars: EliminarAsistenciaVariables = {
  id: ..., 
};

// Call the `eliminarAsistenciaRef()` function to get a reference to the mutation.
const ref = eliminarAsistenciaRef(eliminarAsistenciaVars);
// Variables can be defined inline as well.
const ref = eliminarAsistenciaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarAsistenciaRef(dataConnect, eliminarAsistenciaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asistencia_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asistencia_delete);
});
```

## CrearCompaniaContratista
You can execute the `CrearCompaniaContratista` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearCompaniaContratista(vars: CrearCompaniaContratistaVariables): MutationPromise<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;

interface CrearCompaniaContratistaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearCompaniaContratistaVariables): MutationRef<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;
}
export const crearCompaniaContratistaRef: CrearCompaniaContratistaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearCompaniaContratista(dc: DataConnect, vars: CrearCompaniaContratistaVariables): MutationPromise<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;

interface CrearCompaniaContratistaRef {
  ...
  (dc: DataConnect, vars: CrearCompaniaContratistaVariables): MutationRef<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;
}
export const crearCompaniaContratistaRef: CrearCompaniaContratistaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearCompaniaContratistaRef:
```typescript
const name = crearCompaniaContratistaRef.operationName;
console.log(name);
```

### Variables
The `CrearCompaniaContratista` mutation requires an argument of type `CrearCompaniaContratistaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearCompaniaContratistaVariables {
  nombre: string;
  rif?: string | null;
  telefonoContacto?: string | null;
}
```
### Return Type
Recall that executing the `CrearCompaniaContratista` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearCompaniaContratistaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearCompaniaContratistaData {
  companiaContratista_insert: CompaniaContratista_Key;
}
```
### Using `CrearCompaniaContratista`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearCompaniaContratista, CrearCompaniaContratistaVariables } from '@dataconnect/generated';

// The `CrearCompaniaContratista` mutation requires an argument of type `CrearCompaniaContratistaVariables`:
const crearCompaniaContratistaVars: CrearCompaniaContratistaVariables = {
  nombre: ..., 
  rif: ..., // optional
  telefonoContacto: ..., // optional
};

// Call the `crearCompaniaContratista()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearCompaniaContratista(crearCompaniaContratistaVars);
// Variables can be defined inline as well.
const { data } = await crearCompaniaContratista({ nombre: ..., rif: ..., telefonoContacto: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearCompaniaContratista(dataConnect, crearCompaniaContratistaVars);

console.log(data.companiaContratista_insert);

// Or, you can use the `Promise` API.
crearCompaniaContratista(crearCompaniaContratistaVars).then((response) => {
  const data = response.data;
  console.log(data.companiaContratista_insert);
});
```

### Using `CrearCompaniaContratista`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearCompaniaContratistaRef, CrearCompaniaContratistaVariables } from '@dataconnect/generated';

// The `CrearCompaniaContratista` mutation requires an argument of type `CrearCompaniaContratistaVariables`:
const crearCompaniaContratistaVars: CrearCompaniaContratistaVariables = {
  nombre: ..., 
  rif: ..., // optional
  telefonoContacto: ..., // optional
};

// Call the `crearCompaniaContratistaRef()` function to get a reference to the mutation.
const ref = crearCompaniaContratistaRef(crearCompaniaContratistaVars);
// Variables can be defined inline as well.
const ref = crearCompaniaContratistaRef({ nombre: ..., rif: ..., telefonoContacto: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearCompaniaContratistaRef(dataConnect, crearCompaniaContratistaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.companiaContratista_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.companiaContratista_insert);
});
```

## ActualizarCompaniaContratista
You can execute the `ActualizarCompaniaContratista` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarCompaniaContratista(vars: ActualizarCompaniaContratistaVariables): MutationPromise<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;

interface ActualizarCompaniaContratistaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarCompaniaContratistaVariables): MutationRef<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;
}
export const actualizarCompaniaContratistaRef: ActualizarCompaniaContratistaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarCompaniaContratista(dc: DataConnect, vars: ActualizarCompaniaContratistaVariables): MutationPromise<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;

interface ActualizarCompaniaContratistaRef {
  ...
  (dc: DataConnect, vars: ActualizarCompaniaContratistaVariables): MutationRef<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;
}
export const actualizarCompaniaContratistaRef: ActualizarCompaniaContratistaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarCompaniaContratistaRef:
```typescript
const name = actualizarCompaniaContratistaRef.operationName;
console.log(name);
```

### Variables
The `ActualizarCompaniaContratista` mutation requires an argument of type `ActualizarCompaniaContratistaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarCompaniaContratistaVariables {
  id: UUIDString;
  nombre: string;
  telefonoContacto?: string | null;
}
```
### Return Type
Recall that executing the `ActualizarCompaniaContratista` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarCompaniaContratistaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarCompaniaContratistaData {
  companiaContratista_update?: CompaniaContratista_Key | null;
}
```
### Using `ActualizarCompaniaContratista`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarCompaniaContratista, ActualizarCompaniaContratistaVariables } from '@dataconnect/generated';

// The `ActualizarCompaniaContratista` mutation requires an argument of type `ActualizarCompaniaContratistaVariables`:
const actualizarCompaniaContratistaVars: ActualizarCompaniaContratistaVariables = {
  id: ..., 
  nombre: ..., 
  telefonoContacto: ..., // optional
};

// Call the `actualizarCompaniaContratista()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarCompaniaContratista(actualizarCompaniaContratistaVars);
// Variables can be defined inline as well.
const { data } = await actualizarCompaniaContratista({ id: ..., nombre: ..., telefonoContacto: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarCompaniaContratista(dataConnect, actualizarCompaniaContratistaVars);

console.log(data.companiaContratista_update);

// Or, you can use the `Promise` API.
actualizarCompaniaContratista(actualizarCompaniaContratistaVars).then((response) => {
  const data = response.data;
  console.log(data.companiaContratista_update);
});
```

### Using `ActualizarCompaniaContratista`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarCompaniaContratistaRef, ActualizarCompaniaContratistaVariables } from '@dataconnect/generated';

// The `ActualizarCompaniaContratista` mutation requires an argument of type `ActualizarCompaniaContratistaVariables`:
const actualizarCompaniaContratistaVars: ActualizarCompaniaContratistaVariables = {
  id: ..., 
  nombre: ..., 
  telefonoContacto: ..., // optional
};

// Call the `actualizarCompaniaContratistaRef()` function to get a reference to the mutation.
const ref = actualizarCompaniaContratistaRef(actualizarCompaniaContratistaVars);
// Variables can be defined inline as well.
const ref = actualizarCompaniaContratistaRef({ id: ..., nombre: ..., telefonoContacto: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarCompaniaContratistaRef(dataConnect, actualizarCompaniaContratistaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.companiaContratista_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.companiaContratista_update);
});
```

## EliminarCompaniaContratista
You can execute the `EliminarCompaniaContratista` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarCompaniaContratista(vars: EliminarCompaniaContratistaVariables): MutationPromise<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;

interface EliminarCompaniaContratistaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarCompaniaContratistaVariables): MutationRef<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;
}
export const eliminarCompaniaContratistaRef: EliminarCompaniaContratistaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarCompaniaContratista(dc: DataConnect, vars: EliminarCompaniaContratistaVariables): MutationPromise<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;

interface EliminarCompaniaContratistaRef {
  ...
  (dc: DataConnect, vars: EliminarCompaniaContratistaVariables): MutationRef<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;
}
export const eliminarCompaniaContratistaRef: EliminarCompaniaContratistaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarCompaniaContratistaRef:
```typescript
const name = eliminarCompaniaContratistaRef.operationName;
console.log(name);
```

### Variables
The `EliminarCompaniaContratista` mutation requires an argument of type `EliminarCompaniaContratistaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarCompaniaContratistaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarCompaniaContratista` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarCompaniaContratistaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarCompaniaContratistaData {
  companiaContratista_delete?: CompaniaContratista_Key | null;
}
```
### Using `EliminarCompaniaContratista`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarCompaniaContratista, EliminarCompaniaContratistaVariables } from '@dataconnect/generated';

// The `EliminarCompaniaContratista` mutation requires an argument of type `EliminarCompaniaContratistaVariables`:
const eliminarCompaniaContratistaVars: EliminarCompaniaContratistaVariables = {
  id: ..., 
};

// Call the `eliminarCompaniaContratista()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarCompaniaContratista(eliminarCompaniaContratistaVars);
// Variables can be defined inline as well.
const { data } = await eliminarCompaniaContratista({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarCompaniaContratista(dataConnect, eliminarCompaniaContratistaVars);

console.log(data.companiaContratista_delete);

// Or, you can use the `Promise` API.
eliminarCompaniaContratista(eliminarCompaniaContratistaVars).then((response) => {
  const data = response.data;
  console.log(data.companiaContratista_delete);
});
```

### Using `EliminarCompaniaContratista`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarCompaniaContratistaRef, EliminarCompaniaContratistaVariables } from '@dataconnect/generated';

// The `EliminarCompaniaContratista` mutation requires an argument of type `EliminarCompaniaContratistaVariables`:
const eliminarCompaniaContratistaVars: EliminarCompaniaContratistaVariables = {
  id: ..., 
};

// Call the `eliminarCompaniaContratistaRef()` function to get a reference to the mutation.
const ref = eliminarCompaniaContratistaRef(eliminarCompaniaContratistaVars);
// Variables can be defined inline as well.
const ref = eliminarCompaniaContratistaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarCompaniaContratistaRef(dataConnect, eliminarCompaniaContratistaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.companiaContratista_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.companiaContratista_delete);
});
```

## CrearCuadrilla
You can execute the `CrearCuadrilla` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearCuadrilla(vars: CrearCuadrillaVariables): MutationPromise<CrearCuadrillaData, CrearCuadrillaVariables>;

interface CrearCuadrillaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearCuadrillaVariables): MutationRef<CrearCuadrillaData, CrearCuadrillaVariables>;
}
export const crearCuadrillaRef: CrearCuadrillaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearCuadrilla(dc: DataConnect, vars: CrearCuadrillaVariables): MutationPromise<CrearCuadrillaData, CrearCuadrillaVariables>;

interface CrearCuadrillaRef {
  ...
  (dc: DataConnect, vars: CrearCuadrillaVariables): MutationRef<CrearCuadrillaData, CrearCuadrillaVariables>;
}
export const crearCuadrillaRef: CrearCuadrillaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearCuadrillaRef:
```typescript
const name = crearCuadrillaRef.operationName;
console.log(name);
```

### Variables
The `CrearCuadrilla` mutation requires an argument of type `CrearCuadrillaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearCuadrillaVariables {
  nombreIdentificador: string;
  tamanoAproximado?: number | null;
  companiaContratistaId: UUIDString;
}
```
### Return Type
Recall that executing the `CrearCuadrilla` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearCuadrillaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearCuadrillaData {
  cuadrilla_insert: Cuadrilla_Key;
}
```
### Using `CrearCuadrilla`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearCuadrilla, CrearCuadrillaVariables } from '@dataconnect/generated';

// The `CrearCuadrilla` mutation requires an argument of type `CrearCuadrillaVariables`:
const crearCuadrillaVars: CrearCuadrillaVariables = {
  nombreIdentificador: ..., 
  tamanoAproximado: ..., // optional
  companiaContratistaId: ..., 
};

// Call the `crearCuadrilla()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearCuadrilla(crearCuadrillaVars);
// Variables can be defined inline as well.
const { data } = await crearCuadrilla({ nombreIdentificador: ..., tamanoAproximado: ..., companiaContratistaId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearCuadrilla(dataConnect, crearCuadrillaVars);

console.log(data.cuadrilla_insert);

// Or, you can use the `Promise` API.
crearCuadrilla(crearCuadrillaVars).then((response) => {
  const data = response.data;
  console.log(data.cuadrilla_insert);
});
```

### Using `CrearCuadrilla`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearCuadrillaRef, CrearCuadrillaVariables } from '@dataconnect/generated';

// The `CrearCuadrilla` mutation requires an argument of type `CrearCuadrillaVariables`:
const crearCuadrillaVars: CrearCuadrillaVariables = {
  nombreIdentificador: ..., 
  tamanoAproximado: ..., // optional
  companiaContratistaId: ..., 
};

// Call the `crearCuadrillaRef()` function to get a reference to the mutation.
const ref = crearCuadrillaRef(crearCuadrillaVars);
// Variables can be defined inline as well.
const ref = crearCuadrillaRef({ nombreIdentificador: ..., tamanoAproximado: ..., companiaContratistaId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearCuadrillaRef(dataConnect, crearCuadrillaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cuadrilla_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cuadrilla_insert);
});
```

## ActualizarCuadrilla
You can execute the `ActualizarCuadrilla` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarCuadrilla(vars: ActualizarCuadrillaVariables): MutationPromise<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;

interface ActualizarCuadrillaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarCuadrillaVariables): MutationRef<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;
}
export const actualizarCuadrillaRef: ActualizarCuadrillaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarCuadrilla(dc: DataConnect, vars: ActualizarCuadrillaVariables): MutationPromise<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;

interface ActualizarCuadrillaRef {
  ...
  (dc: DataConnect, vars: ActualizarCuadrillaVariables): MutationRef<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;
}
export const actualizarCuadrillaRef: ActualizarCuadrillaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarCuadrillaRef:
```typescript
const name = actualizarCuadrillaRef.operationName;
console.log(name);
```

### Variables
The `ActualizarCuadrilla` mutation requires an argument of type `ActualizarCuadrillaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarCuadrillaVariables {
  id: UUIDString;
  nombreIdentificador: string;
  tamanoAproximado?: number | null;
}
```
### Return Type
Recall that executing the `ActualizarCuadrilla` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarCuadrillaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarCuadrillaData {
  cuadrilla_update?: Cuadrilla_Key | null;
}
```
### Using `ActualizarCuadrilla`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarCuadrilla, ActualizarCuadrillaVariables } from '@dataconnect/generated';

// The `ActualizarCuadrilla` mutation requires an argument of type `ActualizarCuadrillaVariables`:
const actualizarCuadrillaVars: ActualizarCuadrillaVariables = {
  id: ..., 
  nombreIdentificador: ..., 
  tamanoAproximado: ..., // optional
};

// Call the `actualizarCuadrilla()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarCuadrilla(actualizarCuadrillaVars);
// Variables can be defined inline as well.
const { data } = await actualizarCuadrilla({ id: ..., nombreIdentificador: ..., tamanoAproximado: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarCuadrilla(dataConnect, actualizarCuadrillaVars);

console.log(data.cuadrilla_update);

// Or, you can use the `Promise` API.
actualizarCuadrilla(actualizarCuadrillaVars).then((response) => {
  const data = response.data;
  console.log(data.cuadrilla_update);
});
```

### Using `ActualizarCuadrilla`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarCuadrillaRef, ActualizarCuadrillaVariables } from '@dataconnect/generated';

// The `ActualizarCuadrilla` mutation requires an argument of type `ActualizarCuadrillaVariables`:
const actualizarCuadrillaVars: ActualizarCuadrillaVariables = {
  id: ..., 
  nombreIdentificador: ..., 
  tamanoAproximado: ..., // optional
};

// Call the `actualizarCuadrillaRef()` function to get a reference to the mutation.
const ref = actualizarCuadrillaRef(actualizarCuadrillaVars);
// Variables can be defined inline as well.
const ref = actualizarCuadrillaRef({ id: ..., nombreIdentificador: ..., tamanoAproximado: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarCuadrillaRef(dataConnect, actualizarCuadrillaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cuadrilla_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cuadrilla_update);
});
```

## EliminarCuadrilla
You can execute the `EliminarCuadrilla` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarCuadrilla(vars: EliminarCuadrillaVariables): MutationPromise<EliminarCuadrillaData, EliminarCuadrillaVariables>;

interface EliminarCuadrillaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarCuadrillaVariables): MutationRef<EliminarCuadrillaData, EliminarCuadrillaVariables>;
}
export const eliminarCuadrillaRef: EliminarCuadrillaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarCuadrilla(dc: DataConnect, vars: EliminarCuadrillaVariables): MutationPromise<EliminarCuadrillaData, EliminarCuadrillaVariables>;

interface EliminarCuadrillaRef {
  ...
  (dc: DataConnect, vars: EliminarCuadrillaVariables): MutationRef<EliminarCuadrillaData, EliminarCuadrillaVariables>;
}
export const eliminarCuadrillaRef: EliminarCuadrillaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarCuadrillaRef:
```typescript
const name = eliminarCuadrillaRef.operationName;
console.log(name);
```

### Variables
The `EliminarCuadrilla` mutation requires an argument of type `EliminarCuadrillaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarCuadrillaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarCuadrilla` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarCuadrillaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarCuadrillaData {
  cuadrilla_delete?: Cuadrilla_Key | null;
}
```
### Using `EliminarCuadrilla`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarCuadrilla, EliminarCuadrillaVariables } from '@dataconnect/generated';

// The `EliminarCuadrilla` mutation requires an argument of type `EliminarCuadrillaVariables`:
const eliminarCuadrillaVars: EliminarCuadrillaVariables = {
  id: ..., 
};

// Call the `eliminarCuadrilla()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarCuadrilla(eliminarCuadrillaVars);
// Variables can be defined inline as well.
const { data } = await eliminarCuadrilla({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarCuadrilla(dataConnect, eliminarCuadrillaVars);

console.log(data.cuadrilla_delete);

// Or, you can use the `Promise` API.
eliminarCuadrilla(eliminarCuadrillaVars).then((response) => {
  const data = response.data;
  console.log(data.cuadrilla_delete);
});
```

### Using `EliminarCuadrilla`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarCuadrillaRef, EliminarCuadrillaVariables } from '@dataconnect/generated';

// The `EliminarCuadrilla` mutation requires an argument of type `EliminarCuadrillaVariables`:
const eliminarCuadrillaVars: EliminarCuadrillaVariables = {
  id: ..., 
};

// Call the `eliminarCuadrillaRef()` function to get a reference to the mutation.
const ref = eliminarCuadrillaRef(eliminarCuadrillaVars);
// Variables can be defined inline as well.
const ref = eliminarCuadrillaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarCuadrillaRef(dataConnect, eliminarCuadrillaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cuadrilla_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cuadrilla_delete);
});
```

## CrearEquipamento
You can execute the `CrearEquipamento` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearEquipamento(vars: CrearEquipamentoVariables): MutationPromise<CrearEquipamentoData, CrearEquipamentoVariables>;

interface CrearEquipamentoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearEquipamentoVariables): MutationRef<CrearEquipamentoData, CrearEquipamentoVariables>;
}
export const crearEquipamentoRef: CrearEquipamentoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearEquipamento(dc: DataConnect, vars: CrearEquipamentoVariables): MutationPromise<CrearEquipamentoData, CrearEquipamentoVariables>;

interface CrearEquipamentoRef {
  ...
  (dc: DataConnect, vars: CrearEquipamentoVariables): MutationRef<CrearEquipamentoData, CrearEquipamentoVariables>;
}
export const crearEquipamentoRef: CrearEquipamentoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearEquipamentoRef:
```typescript
const name = crearEquipamentoRef.operationName;
console.log(name);
```

### Variables
The `CrearEquipamento` mutation requires an argument of type `CrearEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearEquipamentoVariables {
  nombre: string;
  descripcion?: string | null;
  datosVarios?: string | null;
  modelo?: string | null;
}
```
### Return Type
Recall that executing the `CrearEquipamento` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearEquipamentoData {
  equipamento_insert: Equipamento_Key;
}
```
### Using `CrearEquipamento`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearEquipamento, CrearEquipamentoVariables } from '@dataconnect/generated';

// The `CrearEquipamento` mutation requires an argument of type `CrearEquipamentoVariables`:
const crearEquipamentoVars: CrearEquipamentoVariables = {
  nombre: ..., 
  descripcion: ..., // optional
  datosVarios: ..., // optional
  modelo: ..., // optional
};

// Call the `crearEquipamento()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearEquipamento(crearEquipamentoVars);
// Variables can be defined inline as well.
const { data } = await crearEquipamento({ nombre: ..., descripcion: ..., datosVarios: ..., modelo: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearEquipamento(dataConnect, crearEquipamentoVars);

console.log(data.equipamento_insert);

// Or, you can use the `Promise` API.
crearEquipamento(crearEquipamentoVars).then((response) => {
  const data = response.data;
  console.log(data.equipamento_insert);
});
```

### Using `CrearEquipamento`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearEquipamentoRef, CrearEquipamentoVariables } from '@dataconnect/generated';

// The `CrearEquipamento` mutation requires an argument of type `CrearEquipamentoVariables`:
const crearEquipamentoVars: CrearEquipamentoVariables = {
  nombre: ..., 
  descripcion: ..., // optional
  datosVarios: ..., // optional
  modelo: ..., // optional
};

// Call the `crearEquipamentoRef()` function to get a reference to the mutation.
const ref = crearEquipamentoRef(crearEquipamentoVars);
// Variables can be defined inline as well.
const ref = crearEquipamentoRef({ nombre: ..., descripcion: ..., datosVarios: ..., modelo: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearEquipamentoRef(dataConnect, crearEquipamentoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipamento_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipamento_insert);
});
```

## ActualizarEquipamento
You can execute the `ActualizarEquipamento` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarEquipamento(vars: ActualizarEquipamentoVariables): MutationPromise<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;

interface ActualizarEquipamentoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarEquipamentoVariables): MutationRef<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;
}
export const actualizarEquipamentoRef: ActualizarEquipamentoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarEquipamento(dc: DataConnect, vars: ActualizarEquipamentoVariables): MutationPromise<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;

interface ActualizarEquipamentoRef {
  ...
  (dc: DataConnect, vars: ActualizarEquipamentoVariables): MutationRef<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;
}
export const actualizarEquipamentoRef: ActualizarEquipamentoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarEquipamentoRef:
```typescript
const name = actualizarEquipamentoRef.operationName;
console.log(name);
```

### Variables
The `ActualizarEquipamento` mutation requires an argument of type `ActualizarEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarEquipamentoVariables {
  id: UUIDString;
  nombre: string;
  descripcion?: string | null;
}
```
### Return Type
Recall that executing the `ActualizarEquipamento` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarEquipamentoData {
  equipamento_update?: Equipamento_Key | null;
}
```
### Using `ActualizarEquipamento`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarEquipamento, ActualizarEquipamentoVariables } from '@dataconnect/generated';

// The `ActualizarEquipamento` mutation requires an argument of type `ActualizarEquipamentoVariables`:
const actualizarEquipamentoVars: ActualizarEquipamentoVariables = {
  id: ..., 
  nombre: ..., 
  descripcion: ..., // optional
};

// Call the `actualizarEquipamento()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarEquipamento(actualizarEquipamentoVars);
// Variables can be defined inline as well.
const { data } = await actualizarEquipamento({ id: ..., nombre: ..., descripcion: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarEquipamento(dataConnect, actualizarEquipamentoVars);

console.log(data.equipamento_update);

// Or, you can use the `Promise` API.
actualizarEquipamento(actualizarEquipamentoVars).then((response) => {
  const data = response.data;
  console.log(data.equipamento_update);
});
```

### Using `ActualizarEquipamento`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarEquipamentoRef, ActualizarEquipamentoVariables } from '@dataconnect/generated';

// The `ActualizarEquipamento` mutation requires an argument of type `ActualizarEquipamentoVariables`:
const actualizarEquipamentoVars: ActualizarEquipamentoVariables = {
  id: ..., 
  nombre: ..., 
  descripcion: ..., // optional
};

// Call the `actualizarEquipamentoRef()` function to get a reference to the mutation.
const ref = actualizarEquipamentoRef(actualizarEquipamentoVars);
// Variables can be defined inline as well.
const ref = actualizarEquipamentoRef({ id: ..., nombre: ..., descripcion: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarEquipamentoRef(dataConnect, actualizarEquipamentoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipamento_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipamento_update);
});
```

## EliminarEquipamento
You can execute the `EliminarEquipamento` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarEquipamento(vars: EliminarEquipamentoVariables): MutationPromise<EliminarEquipamentoData, EliminarEquipamentoVariables>;

interface EliminarEquipamentoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarEquipamentoVariables): MutationRef<EliminarEquipamentoData, EliminarEquipamentoVariables>;
}
export const eliminarEquipamentoRef: EliminarEquipamentoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarEquipamento(dc: DataConnect, vars: EliminarEquipamentoVariables): MutationPromise<EliminarEquipamentoData, EliminarEquipamentoVariables>;

interface EliminarEquipamentoRef {
  ...
  (dc: DataConnect, vars: EliminarEquipamentoVariables): MutationRef<EliminarEquipamentoData, EliminarEquipamentoVariables>;
}
export const eliminarEquipamentoRef: EliminarEquipamentoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarEquipamentoRef:
```typescript
const name = eliminarEquipamentoRef.operationName;
console.log(name);
```

### Variables
The `EliminarEquipamento` mutation requires an argument of type `EliminarEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarEquipamentoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarEquipamento` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarEquipamentoData {
  equipamento_delete?: Equipamento_Key | null;
}
```
### Using `EliminarEquipamento`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarEquipamento, EliminarEquipamentoVariables } from '@dataconnect/generated';

// The `EliminarEquipamento` mutation requires an argument of type `EliminarEquipamentoVariables`:
const eliminarEquipamentoVars: EliminarEquipamentoVariables = {
  id: ..., 
};

// Call the `eliminarEquipamento()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarEquipamento(eliminarEquipamentoVars);
// Variables can be defined inline as well.
const { data } = await eliminarEquipamento({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarEquipamento(dataConnect, eliminarEquipamentoVars);

console.log(data.equipamento_delete);

// Or, you can use the `Promise` API.
eliminarEquipamento(eliminarEquipamentoVars).then((response) => {
  const data = response.data;
  console.log(data.equipamento_delete);
});
```

### Using `EliminarEquipamento`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarEquipamentoRef, EliminarEquipamentoVariables } from '@dataconnect/generated';

// The `EliminarEquipamento` mutation requires an argument of type `EliminarEquipamentoVariables`:
const eliminarEquipamentoVars: EliminarEquipamentoVariables = {
  id: ..., 
};

// Call the `eliminarEquipamentoRef()` function to get a reference to the mutation.
const ref = eliminarEquipamentoRef(eliminarEquipamentoVars);
// Variables can be defined inline as well.
const ref = eliminarEquipamentoRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarEquipamentoRef(dataConnect, eliminarEquipamentoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipamento_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipamento_delete);
});
```

## PrestarEquipamento
You can execute the `PrestarEquipamento` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
prestarEquipamento(vars: PrestarEquipamentoVariables): MutationPromise<PrestarEquipamentoData, PrestarEquipamentoVariables>;

interface PrestarEquipamentoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PrestarEquipamentoVariables): MutationRef<PrestarEquipamentoData, PrestarEquipamentoVariables>;
}
export const prestarEquipamentoRef: PrestarEquipamentoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
prestarEquipamento(dc: DataConnect, vars: PrestarEquipamentoVariables): MutationPromise<PrestarEquipamentoData, PrestarEquipamentoVariables>;

interface PrestarEquipamentoRef {
  ...
  (dc: DataConnect, vars: PrestarEquipamentoVariables): MutationRef<PrestarEquipamentoData, PrestarEquipamentoVariables>;
}
export const prestarEquipamentoRef: PrestarEquipamentoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the prestarEquipamentoRef:
```typescript
const name = prestarEquipamentoRef.operationName;
console.log(name);
```

### Variables
The `PrestarEquipamento` mutation requires an argument of type `PrestarEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PrestarEquipamentoVariables {
  companiaPrestadaId: UUIDString;
  equipamentoId: UUIDString;
  fechaInicio: DateString;
}
```
### Return Type
Recall that executing the `PrestarEquipamento` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PrestarEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PrestarEquipamentoData {
  equipamentoPrestado_insert: EquipamentoPrestado_Key;
}
```
### Using `PrestarEquipamento`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, prestarEquipamento, PrestarEquipamentoVariables } from '@dataconnect/generated';

// The `PrestarEquipamento` mutation requires an argument of type `PrestarEquipamentoVariables`:
const prestarEquipamentoVars: PrestarEquipamentoVariables = {
  companiaPrestadaId: ..., 
  equipamentoId: ..., 
  fechaInicio: ..., 
};

// Call the `prestarEquipamento()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await prestarEquipamento(prestarEquipamentoVars);
// Variables can be defined inline as well.
const { data } = await prestarEquipamento({ companiaPrestadaId: ..., equipamentoId: ..., fechaInicio: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await prestarEquipamento(dataConnect, prestarEquipamentoVars);

console.log(data.equipamentoPrestado_insert);

// Or, you can use the `Promise` API.
prestarEquipamento(prestarEquipamentoVars).then((response) => {
  const data = response.data;
  console.log(data.equipamentoPrestado_insert);
});
```

### Using `PrestarEquipamento`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, prestarEquipamentoRef, PrestarEquipamentoVariables } from '@dataconnect/generated';

// The `PrestarEquipamento` mutation requires an argument of type `PrestarEquipamentoVariables`:
const prestarEquipamentoVars: PrestarEquipamentoVariables = {
  companiaPrestadaId: ..., 
  equipamentoId: ..., 
  fechaInicio: ..., 
};

// Call the `prestarEquipamentoRef()` function to get a reference to the mutation.
const ref = prestarEquipamentoRef(prestarEquipamentoVars);
// Variables can be defined inline as well.
const ref = prestarEquipamentoRef({ companiaPrestadaId: ..., equipamentoId: ..., fechaInicio: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = prestarEquipamentoRef(dataConnect, prestarEquipamentoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipamentoPrestado_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipamentoPrestado_insert);
});
```

## DevolverEquipamento
You can execute the `DevolverEquipamento` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
devolverEquipamento(vars: DevolverEquipamentoVariables): MutationPromise<DevolverEquipamentoData, DevolverEquipamentoVariables>;

interface DevolverEquipamentoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DevolverEquipamentoVariables): MutationRef<DevolverEquipamentoData, DevolverEquipamentoVariables>;
}
export const devolverEquipamentoRef: DevolverEquipamentoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
devolverEquipamento(dc: DataConnect, vars: DevolverEquipamentoVariables): MutationPromise<DevolverEquipamentoData, DevolverEquipamentoVariables>;

interface DevolverEquipamentoRef {
  ...
  (dc: DataConnect, vars: DevolverEquipamentoVariables): MutationRef<DevolverEquipamentoData, DevolverEquipamentoVariables>;
}
export const devolverEquipamentoRef: DevolverEquipamentoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the devolverEquipamentoRef:
```typescript
const name = devolverEquipamentoRef.operationName;
console.log(name);
```

### Variables
The `DevolverEquipamento` mutation requires an argument of type `DevolverEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DevolverEquipamentoVariables {
  id: UUIDString;
  fechaDevolucion: DateString;
}
```
### Return Type
Recall that executing the `DevolverEquipamento` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DevolverEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DevolverEquipamentoData {
  equipamentoPrestado_update?: EquipamentoPrestado_Key | null;
}
```
### Using `DevolverEquipamento`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, devolverEquipamento, DevolverEquipamentoVariables } from '@dataconnect/generated';

// The `DevolverEquipamento` mutation requires an argument of type `DevolverEquipamentoVariables`:
const devolverEquipamentoVars: DevolverEquipamentoVariables = {
  id: ..., 
  fechaDevolucion: ..., 
};

// Call the `devolverEquipamento()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await devolverEquipamento(devolverEquipamentoVars);
// Variables can be defined inline as well.
const { data } = await devolverEquipamento({ id: ..., fechaDevolucion: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await devolverEquipamento(dataConnect, devolverEquipamentoVars);

console.log(data.equipamentoPrestado_update);

// Or, you can use the `Promise` API.
devolverEquipamento(devolverEquipamentoVars).then((response) => {
  const data = response.data;
  console.log(data.equipamentoPrestado_update);
});
```

### Using `DevolverEquipamento`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, devolverEquipamentoRef, DevolverEquipamentoVariables } from '@dataconnect/generated';

// The `DevolverEquipamento` mutation requires an argument of type `DevolverEquipamentoVariables`:
const devolverEquipamentoVars: DevolverEquipamentoVariables = {
  id: ..., 
  fechaDevolucion: ..., 
};

// Call the `devolverEquipamentoRef()` function to get a reference to the mutation.
const ref = devolverEquipamentoRef(devolverEquipamentoVars);
// Variables can be defined inline as well.
const ref = devolverEquipamentoRef({ id: ..., fechaDevolucion: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = devolverEquipamentoRef(dataConnect, devolverEquipamentoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipamentoPrestado_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipamentoPrestado_update);
});
```

## EliminarEquipamentoPrestado
You can execute the `EliminarEquipamentoPrestado` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarEquipamentoPrestado(vars: EliminarEquipamentoPrestadoVariables): MutationPromise<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;

interface EliminarEquipamentoPrestadoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarEquipamentoPrestadoVariables): MutationRef<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;
}
export const eliminarEquipamentoPrestadoRef: EliminarEquipamentoPrestadoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarEquipamentoPrestado(dc: DataConnect, vars: EliminarEquipamentoPrestadoVariables): MutationPromise<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;

interface EliminarEquipamentoPrestadoRef {
  ...
  (dc: DataConnect, vars: EliminarEquipamentoPrestadoVariables): MutationRef<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;
}
export const eliminarEquipamentoPrestadoRef: EliminarEquipamentoPrestadoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarEquipamentoPrestadoRef:
```typescript
const name = eliminarEquipamentoPrestadoRef.operationName;
console.log(name);
```

### Variables
The `EliminarEquipamentoPrestado` mutation requires an argument of type `EliminarEquipamentoPrestadoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarEquipamentoPrestadoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarEquipamentoPrestado` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarEquipamentoPrestadoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarEquipamentoPrestadoData {
  equipamentoPrestado_delete?: EquipamentoPrestado_Key | null;
}
```
### Using `EliminarEquipamentoPrestado`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarEquipamentoPrestado, EliminarEquipamentoPrestadoVariables } from '@dataconnect/generated';

// The `EliminarEquipamentoPrestado` mutation requires an argument of type `EliminarEquipamentoPrestadoVariables`:
const eliminarEquipamentoPrestadoVars: EliminarEquipamentoPrestadoVariables = {
  id: ..., 
};

// Call the `eliminarEquipamentoPrestado()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarEquipamentoPrestado(eliminarEquipamentoPrestadoVars);
// Variables can be defined inline as well.
const { data } = await eliminarEquipamentoPrestado({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarEquipamentoPrestado(dataConnect, eliminarEquipamentoPrestadoVars);

console.log(data.equipamentoPrestado_delete);

// Or, you can use the `Promise` API.
eliminarEquipamentoPrestado(eliminarEquipamentoPrestadoVars).then((response) => {
  const data = response.data;
  console.log(data.equipamentoPrestado_delete);
});
```

### Using `EliminarEquipamentoPrestado`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarEquipamentoPrestadoRef, EliminarEquipamentoPrestadoVariables } from '@dataconnect/generated';

// The `EliminarEquipamentoPrestado` mutation requires an argument of type `EliminarEquipamentoPrestadoVariables`:
const eliminarEquipamentoPrestadoVars: EliminarEquipamentoPrestadoVariables = {
  id: ..., 
};

// Call the `eliminarEquipamentoPrestadoRef()` function to get a reference to the mutation.
const ref = eliminarEquipamentoPrestadoRef(eliminarEquipamentoPrestadoVars);
// Variables can be defined inline as well.
const ref = eliminarEquipamentoPrestadoRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarEquipamentoPrestadoRef(dataConnect, eliminarEquipamentoPrestadoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.equipamentoPrestado_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.equipamentoPrestado_delete);
});
```

## CrearMovimientoTesoreria
You can execute the `CrearMovimientoTesoreria` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearMovimientoTesoreria(vars: CrearMovimientoTesoreriaVariables): MutationPromise<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;

interface CrearMovimientoTesoreriaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearMovimientoTesoreriaVariables): MutationRef<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;
}
export const crearMovimientoTesoreriaRef: CrearMovimientoTesoreriaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearMovimientoTesoreria(dc: DataConnect, vars: CrearMovimientoTesoreriaVariables): MutationPromise<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;

interface CrearMovimientoTesoreriaRef {
  ...
  (dc: DataConnect, vars: CrearMovimientoTesoreriaVariables): MutationRef<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;
}
export const crearMovimientoTesoreriaRef: CrearMovimientoTesoreriaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearMovimientoTesoreriaRef:
```typescript
const name = crearMovimientoTesoreriaRef.operationName;
console.log(name);
```

### Variables
The `CrearMovimientoTesoreria` mutation requires an argument of type `CrearMovimientoTesoreriaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearMovimientoTesoreriaVariables {
  tipo: string;
  monto: number;
  moneda: string;
  tasaBCV: number;
  fechaTasa: DateString;
  concepto: string;
  sedeId: UUIDString;
  creadoPorId: UUIDString;
  avioRefId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `CrearMovimientoTesoreria` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearMovimientoTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearMovimientoTesoreriaData {
  movimientoTesoreria_insert: MovimientoTesoreria_Key;
}
```
### Using `CrearMovimientoTesoreria`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearMovimientoTesoreria, CrearMovimientoTesoreriaVariables } from '@dataconnect/generated';

// The `CrearMovimientoTesoreria` mutation requires an argument of type `CrearMovimientoTesoreriaVariables`:
const crearMovimientoTesoreriaVars: CrearMovimientoTesoreriaVariables = {
  tipo: ..., 
  monto: ..., 
  moneda: ..., 
  tasaBCV: ..., 
  fechaTasa: ..., 
  concepto: ..., 
  sedeId: ..., 
  creadoPorId: ..., 
  avioRefId: ..., // optional
};

// Call the `crearMovimientoTesoreria()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearMovimientoTesoreria(crearMovimientoTesoreriaVars);
// Variables can be defined inline as well.
const { data } = await crearMovimientoTesoreria({ tipo: ..., monto: ..., moneda: ..., tasaBCV: ..., fechaTasa: ..., concepto: ..., sedeId: ..., creadoPorId: ..., avioRefId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearMovimientoTesoreria(dataConnect, crearMovimientoTesoreriaVars);

console.log(data.movimientoTesoreria_insert);

// Or, you can use the `Promise` API.
crearMovimientoTesoreria(crearMovimientoTesoreriaVars).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria_insert);
});
```

### Using `CrearMovimientoTesoreria`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearMovimientoTesoreriaRef, CrearMovimientoTesoreriaVariables } from '@dataconnect/generated';

// The `CrearMovimientoTesoreria` mutation requires an argument of type `CrearMovimientoTesoreriaVariables`:
const crearMovimientoTesoreriaVars: CrearMovimientoTesoreriaVariables = {
  tipo: ..., 
  monto: ..., 
  moneda: ..., 
  tasaBCV: ..., 
  fechaTasa: ..., 
  concepto: ..., 
  sedeId: ..., 
  creadoPorId: ..., 
  avioRefId: ..., // optional
};

// Call the `crearMovimientoTesoreriaRef()` function to get a reference to the mutation.
const ref = crearMovimientoTesoreriaRef(crearMovimientoTesoreriaVars);
// Variables can be defined inline as well.
const ref = crearMovimientoTesoreriaRef({ tipo: ..., monto: ..., moneda: ..., tasaBCV: ..., fechaTasa: ..., concepto: ..., sedeId: ..., creadoPorId: ..., avioRefId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearMovimientoTesoreriaRef(dataConnect, crearMovimientoTesoreriaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.movimientoTesoreria_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria_insert);
});
```

## AprobarMovimientoTesoreria
You can execute the `AprobarMovimientoTesoreria` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
aprobarMovimientoTesoreria(vars: AprobarMovimientoTesoreriaVariables): MutationPromise<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;

interface AprobarMovimientoTesoreriaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AprobarMovimientoTesoreriaVariables): MutationRef<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;
}
export const aprobarMovimientoTesoreriaRef: AprobarMovimientoTesoreriaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
aprobarMovimientoTesoreria(dc: DataConnect, vars: AprobarMovimientoTesoreriaVariables): MutationPromise<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;

interface AprobarMovimientoTesoreriaRef {
  ...
  (dc: DataConnect, vars: AprobarMovimientoTesoreriaVariables): MutationRef<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;
}
export const aprobarMovimientoTesoreriaRef: AprobarMovimientoTesoreriaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the aprobarMovimientoTesoreriaRef:
```typescript
const name = aprobarMovimientoTesoreriaRef.operationName;
console.log(name);
```

### Variables
The `AprobarMovimientoTesoreria` mutation requires an argument of type `AprobarMovimientoTesoreriaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AprobarMovimientoTesoreriaVariables {
  id: UUIDString;
  aprobadoPorId: UUIDString;
}
```
### Return Type
Recall that executing the `AprobarMovimientoTesoreria` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AprobarMovimientoTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AprobarMovimientoTesoreriaData {
  movimientoTesoreria_update?: MovimientoTesoreria_Key | null;
}
```
### Using `AprobarMovimientoTesoreria`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, aprobarMovimientoTesoreria, AprobarMovimientoTesoreriaVariables } from '@dataconnect/generated';

// The `AprobarMovimientoTesoreria` mutation requires an argument of type `AprobarMovimientoTesoreriaVariables`:
const aprobarMovimientoTesoreriaVars: AprobarMovimientoTesoreriaVariables = {
  id: ..., 
  aprobadoPorId: ..., 
};

// Call the `aprobarMovimientoTesoreria()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await aprobarMovimientoTesoreria(aprobarMovimientoTesoreriaVars);
// Variables can be defined inline as well.
const { data } = await aprobarMovimientoTesoreria({ id: ..., aprobadoPorId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await aprobarMovimientoTesoreria(dataConnect, aprobarMovimientoTesoreriaVars);

console.log(data.movimientoTesoreria_update);

// Or, you can use the `Promise` API.
aprobarMovimientoTesoreria(aprobarMovimientoTesoreriaVars).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria_update);
});
```

### Using `AprobarMovimientoTesoreria`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, aprobarMovimientoTesoreriaRef, AprobarMovimientoTesoreriaVariables } from '@dataconnect/generated';

// The `AprobarMovimientoTesoreria` mutation requires an argument of type `AprobarMovimientoTesoreriaVariables`:
const aprobarMovimientoTesoreriaVars: AprobarMovimientoTesoreriaVariables = {
  id: ..., 
  aprobadoPorId: ..., 
};

// Call the `aprobarMovimientoTesoreriaRef()` function to get a reference to the mutation.
const ref = aprobarMovimientoTesoreriaRef(aprobarMovimientoTesoreriaVars);
// Variables can be defined inline as well.
const ref = aprobarMovimientoTesoreriaRef({ id: ..., aprobadoPorId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = aprobarMovimientoTesoreriaRef(dataConnect, aprobarMovimientoTesoreriaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.movimientoTesoreria_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria_update);
});
```

## AnularMovimientoTesoreria
You can execute the `AnularMovimientoTesoreria` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
anularMovimientoTesoreria(vars: AnularMovimientoTesoreriaVariables): MutationPromise<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;

interface AnularMovimientoTesoreriaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AnularMovimientoTesoreriaVariables): MutationRef<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;
}
export const anularMovimientoTesoreriaRef: AnularMovimientoTesoreriaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
anularMovimientoTesoreria(dc: DataConnect, vars: AnularMovimientoTesoreriaVariables): MutationPromise<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;

interface AnularMovimientoTesoreriaRef {
  ...
  (dc: DataConnect, vars: AnularMovimientoTesoreriaVariables): MutationRef<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;
}
export const anularMovimientoTesoreriaRef: AnularMovimientoTesoreriaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the anularMovimientoTesoreriaRef:
```typescript
const name = anularMovimientoTesoreriaRef.operationName;
console.log(name);
```

### Variables
The `AnularMovimientoTesoreria` mutation requires an argument of type `AnularMovimientoTesoreriaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AnularMovimientoTesoreriaVariables {
  id: UUIDString;
  anulaAId: UUIDString;
}
```
### Return Type
Recall that executing the `AnularMovimientoTesoreria` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AnularMovimientoTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AnularMovimientoTesoreriaData {
  movimientoTesoreria_update?: MovimientoTesoreria_Key | null;
}
```
### Using `AnularMovimientoTesoreria`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, anularMovimientoTesoreria, AnularMovimientoTesoreriaVariables } from '@dataconnect/generated';

// The `AnularMovimientoTesoreria` mutation requires an argument of type `AnularMovimientoTesoreriaVariables`:
const anularMovimientoTesoreriaVars: AnularMovimientoTesoreriaVariables = {
  id: ..., 
  anulaAId: ..., 
};

// Call the `anularMovimientoTesoreria()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await anularMovimientoTesoreria(anularMovimientoTesoreriaVars);
// Variables can be defined inline as well.
const { data } = await anularMovimientoTesoreria({ id: ..., anulaAId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await anularMovimientoTesoreria(dataConnect, anularMovimientoTesoreriaVars);

console.log(data.movimientoTesoreria_update);

// Or, you can use the `Promise` API.
anularMovimientoTesoreria(anularMovimientoTesoreriaVars).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria_update);
});
```

### Using `AnularMovimientoTesoreria`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, anularMovimientoTesoreriaRef, AnularMovimientoTesoreriaVariables } from '@dataconnect/generated';

// The `AnularMovimientoTesoreria` mutation requires an argument of type `AnularMovimientoTesoreriaVariables`:
const anularMovimientoTesoreriaVars: AnularMovimientoTesoreriaVariables = {
  id: ..., 
  anulaAId: ..., 
};

// Call the `anularMovimientoTesoreriaRef()` function to get a reference to the mutation.
const ref = anularMovimientoTesoreriaRef(anularMovimientoTesoreriaVars);
// Variables can be defined inline as well.
const ref = anularMovimientoTesoreriaRef({ id: ..., anulaAId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = anularMovimientoTesoreriaRef(dataConnect, anularMovimientoTesoreriaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.movimientoTesoreria_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria_update);
});
```

## EliminarMovimientoTesoreria
You can execute the `EliminarMovimientoTesoreria` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarMovimientoTesoreria(vars: EliminarMovimientoTesoreriaVariables): MutationPromise<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;

interface EliminarMovimientoTesoreriaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarMovimientoTesoreriaVariables): MutationRef<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;
}
export const eliminarMovimientoTesoreriaRef: EliminarMovimientoTesoreriaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarMovimientoTesoreria(dc: DataConnect, vars: EliminarMovimientoTesoreriaVariables): MutationPromise<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;

interface EliminarMovimientoTesoreriaRef {
  ...
  (dc: DataConnect, vars: EliminarMovimientoTesoreriaVariables): MutationRef<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;
}
export const eliminarMovimientoTesoreriaRef: EliminarMovimientoTesoreriaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarMovimientoTesoreriaRef:
```typescript
const name = eliminarMovimientoTesoreriaRef.operationName;
console.log(name);
```

### Variables
The `EliminarMovimientoTesoreria` mutation requires an argument of type `EliminarMovimientoTesoreriaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarMovimientoTesoreriaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarMovimientoTesoreria` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarMovimientoTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarMovimientoTesoreriaData {
  movimientoTesoreria_delete?: MovimientoTesoreria_Key | null;
}
```
### Using `EliminarMovimientoTesoreria`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarMovimientoTesoreria, EliminarMovimientoTesoreriaVariables } from '@dataconnect/generated';

// The `EliminarMovimientoTesoreria` mutation requires an argument of type `EliminarMovimientoTesoreriaVariables`:
const eliminarMovimientoTesoreriaVars: EliminarMovimientoTesoreriaVariables = {
  id: ..., 
};

// Call the `eliminarMovimientoTesoreria()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarMovimientoTesoreria(eliminarMovimientoTesoreriaVars);
// Variables can be defined inline as well.
const { data } = await eliminarMovimientoTesoreria({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarMovimientoTesoreria(dataConnect, eliminarMovimientoTesoreriaVars);

console.log(data.movimientoTesoreria_delete);

// Or, you can use the `Promise` API.
eliminarMovimientoTesoreria(eliminarMovimientoTesoreriaVars).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria_delete);
});
```

### Using `EliminarMovimientoTesoreria`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarMovimientoTesoreriaRef, EliminarMovimientoTesoreriaVariables } from '@dataconnect/generated';

// The `EliminarMovimientoTesoreria` mutation requires an argument of type `EliminarMovimientoTesoreriaVariables`:
const eliminarMovimientoTesoreriaVars: EliminarMovimientoTesoreriaVariables = {
  id: ..., 
};

// Call the `eliminarMovimientoTesoreriaRef()` function to get a reference to the mutation.
const ref = eliminarMovimientoTesoreriaRef(eliminarMovimientoTesoreriaVars);
// Variables can be defined inline as well.
const ref = eliminarMovimientoTesoreriaRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarMovimientoTesoreriaRef(dataConnect, eliminarMovimientoTesoreriaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.movimientoTesoreria_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.movimientoTesoreria_delete);
});
```

## CrearFondo
You can execute the `CrearFondo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
crearFondo(vars: CrearFondoVariables): MutationPromise<CrearFondoData, CrearFondoVariables>;

interface CrearFondoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CrearFondoVariables): MutationRef<CrearFondoData, CrearFondoVariables>;
}
export const crearFondoRef: CrearFondoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
crearFondo(dc: DataConnect, vars: CrearFondoVariables): MutationPromise<CrearFondoData, CrearFondoVariables>;

interface CrearFondoRef {
  ...
  (dc: DataConnect, vars: CrearFondoVariables): MutationRef<CrearFondoData, CrearFondoVariables>;
}
export const crearFondoRef: CrearFondoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the crearFondoRef:
```typescript
const name = crearFondoRef.operationName;
console.log(name);
```

### Variables
The `CrearFondo` mutation requires an argument of type `CrearFondoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CrearFondoVariables {
  sedeId: UUIDString;
  saldo: number;
  moneda: string;
}
```
### Return Type
Recall that executing the `CrearFondo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CrearFondoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CrearFondoData {
  fondo_insert: Fondo_Key;
}
```
### Using `CrearFondo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, crearFondo, CrearFondoVariables } from '@dataconnect/generated';

// The `CrearFondo` mutation requires an argument of type `CrearFondoVariables`:
const crearFondoVars: CrearFondoVariables = {
  sedeId: ..., 
  saldo: ..., 
  moneda: ..., 
};

// Call the `crearFondo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await crearFondo(crearFondoVars);
// Variables can be defined inline as well.
const { data } = await crearFondo({ sedeId: ..., saldo: ..., moneda: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await crearFondo(dataConnect, crearFondoVars);

console.log(data.fondo_insert);

// Or, you can use the `Promise` API.
crearFondo(crearFondoVars).then((response) => {
  const data = response.data;
  console.log(data.fondo_insert);
});
```

### Using `CrearFondo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, crearFondoRef, CrearFondoVariables } from '@dataconnect/generated';

// The `CrearFondo` mutation requires an argument of type `CrearFondoVariables`:
const crearFondoVars: CrearFondoVariables = {
  sedeId: ..., 
  saldo: ..., 
  moneda: ..., 
};

// Call the `crearFondoRef()` function to get a reference to the mutation.
const ref = crearFondoRef(crearFondoVars);
// Variables can be defined inline as well.
const ref = crearFondoRef({ sedeId: ..., saldo: ..., moneda: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = crearFondoRef(dataConnect, crearFondoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.fondo_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.fondo_insert);
});
```

## ActualizarFondo
You can execute the `ActualizarFondo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
actualizarFondo(vars: ActualizarFondoVariables): MutationPromise<ActualizarFondoData, ActualizarFondoVariables>;

interface ActualizarFondoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActualizarFondoVariables): MutationRef<ActualizarFondoData, ActualizarFondoVariables>;
}
export const actualizarFondoRef: ActualizarFondoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
actualizarFondo(dc: DataConnect, vars: ActualizarFondoVariables): MutationPromise<ActualizarFondoData, ActualizarFondoVariables>;

interface ActualizarFondoRef {
  ...
  (dc: DataConnect, vars: ActualizarFondoVariables): MutationRef<ActualizarFondoData, ActualizarFondoVariables>;
}
export const actualizarFondoRef: ActualizarFondoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the actualizarFondoRef:
```typescript
const name = actualizarFondoRef.operationName;
console.log(name);
```

### Variables
The `ActualizarFondo` mutation requires an argument of type `ActualizarFondoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActualizarFondoVariables {
  id: UUIDString;
  saldo: number;
  moneda: string;
}
```
### Return Type
Recall that executing the `ActualizarFondo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActualizarFondoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActualizarFondoData {
  fondo_update?: Fondo_Key | null;
}
```
### Using `ActualizarFondo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, actualizarFondo, ActualizarFondoVariables } from '@dataconnect/generated';

// The `ActualizarFondo` mutation requires an argument of type `ActualizarFondoVariables`:
const actualizarFondoVars: ActualizarFondoVariables = {
  id: ..., 
  saldo: ..., 
  moneda: ..., 
};

// Call the `actualizarFondo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await actualizarFondo(actualizarFondoVars);
// Variables can be defined inline as well.
const { data } = await actualizarFondo({ id: ..., saldo: ..., moneda: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await actualizarFondo(dataConnect, actualizarFondoVars);

console.log(data.fondo_update);

// Or, you can use the `Promise` API.
actualizarFondo(actualizarFondoVars).then((response) => {
  const data = response.data;
  console.log(data.fondo_update);
});
```

### Using `ActualizarFondo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, actualizarFondoRef, ActualizarFondoVariables } from '@dataconnect/generated';

// The `ActualizarFondo` mutation requires an argument of type `ActualizarFondoVariables`:
const actualizarFondoVars: ActualizarFondoVariables = {
  id: ..., 
  saldo: ..., 
  moneda: ..., 
};

// Call the `actualizarFondoRef()` function to get a reference to the mutation.
const ref = actualizarFondoRef(actualizarFondoVars);
// Variables can be defined inline as well.
const ref = actualizarFondoRef({ id: ..., saldo: ..., moneda: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = actualizarFondoRef(dataConnect, actualizarFondoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.fondo_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.fondo_update);
});
```

## EliminarFondo
You can execute the `EliminarFondo` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
eliminarFondo(vars: EliminarFondoVariables): MutationPromise<EliminarFondoData, EliminarFondoVariables>;

interface EliminarFondoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EliminarFondoVariables): MutationRef<EliminarFondoData, EliminarFondoVariables>;
}
export const eliminarFondoRef: EliminarFondoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
eliminarFondo(dc: DataConnect, vars: EliminarFondoVariables): MutationPromise<EliminarFondoData, EliminarFondoVariables>;

interface EliminarFondoRef {
  ...
  (dc: DataConnect, vars: EliminarFondoVariables): MutationRef<EliminarFondoData, EliminarFondoVariables>;
}
export const eliminarFondoRef: EliminarFondoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the eliminarFondoRef:
```typescript
const name = eliminarFondoRef.operationName;
console.log(name);
```

### Variables
The `EliminarFondo` mutation requires an argument of type `EliminarFondoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EliminarFondoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `EliminarFondo` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EliminarFondoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EliminarFondoData {
  fondo_delete?: Fondo_Key | null;
}
```
### Using `EliminarFondo`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, eliminarFondo, EliminarFondoVariables } from '@dataconnect/generated';

// The `EliminarFondo` mutation requires an argument of type `EliminarFondoVariables`:
const eliminarFondoVars: EliminarFondoVariables = {
  id: ..., 
};

// Call the `eliminarFondo()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await eliminarFondo(eliminarFondoVars);
// Variables can be defined inline as well.
const { data } = await eliminarFondo({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await eliminarFondo(dataConnect, eliminarFondoVars);

console.log(data.fondo_delete);

// Or, you can use the `Promise` API.
eliminarFondo(eliminarFondoVars).then((response) => {
  const data = response.data;
  console.log(data.fondo_delete);
});
```

### Using `EliminarFondo`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, eliminarFondoRef, EliminarFondoVariables } from '@dataconnect/generated';

// The `EliminarFondo` mutation requires an argument of type `EliminarFondoVariables`:
const eliminarFondoVars: EliminarFondoVariables = {
  id: ..., 
};

// Call the `eliminarFondoRef()` function to get a reference to the mutation.
const ref = eliminarFondoRef(eliminarFondoVars);
// Variables can be defined inline as well.
const ref = eliminarFondoRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = eliminarFondoRef(dataConnect, eliminarFondoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.fondo_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.fondo_delete);
});
```

