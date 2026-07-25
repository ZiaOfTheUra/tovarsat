# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `example`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `example` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## ListarSedes
You can execute the `ListarSedes` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarSedes(dc: DataConnect, options?: useDataConnectQueryOptions<ListarSedesData>): UseDataConnectQueryResult<ListarSedesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarSedes(options?: useDataConnectQueryOptions<ListarSedesData>): UseDataConnectQueryResult<ListarSedesData, undefined>;
```

### Variables
The `ListarSedes` Query has no variables.
### Return Type
Recall that calling the `ListarSedes` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarSedes` Query is of type `ListarSedesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarSedes`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarSedes } from '@dataconnect/generated/react'

export default function ListarSedesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarSedes();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarSedes(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarSedes(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarSedes(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.sedes);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarUsuarios
You can execute the `ListarUsuarios` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarUsuarios(dc: DataConnect, options?: useDataConnectQueryOptions<ListarUsuariosData>): UseDataConnectQueryResult<ListarUsuariosData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarUsuarios(options?: useDataConnectQueryOptions<ListarUsuariosData>): UseDataConnectQueryResult<ListarUsuariosData, undefined>;
```

### Variables
The `ListarUsuarios` Query has no variables.
### Return Type
Recall that calling the `ListarUsuarios` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarUsuarios` Query is of type `ListarUsuariosData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarUsuarios`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarUsuarios } from '@dataconnect/generated/react'

export default function ListarUsuariosComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarUsuarios();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarUsuarios(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarUsuarios(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarUsuarios(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.usuarios);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarMisAsistencias
You can execute the `ListarMisAsistencias` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarMisAsistencias(dc: DataConnect, options?: useDataConnectQueryOptions<ListarMisAsistenciasData>): UseDataConnectQueryResult<ListarMisAsistenciasData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarMisAsistencias(options?: useDataConnectQueryOptions<ListarMisAsistenciasData>): UseDataConnectQueryResult<ListarMisAsistenciasData, undefined>;
```

### Variables
The `ListarMisAsistencias` Query has no variables.
### Return Type
Recall that calling the `ListarMisAsistencias` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarMisAsistencias` Query is of type `ListarMisAsistenciasData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarMisAsistencias`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarMisAsistencias } from '@dataconnect/generated/react'

export default function ListarMisAsistenciasComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarMisAsistencias();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarMisAsistencias(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarMisAsistencias(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarMisAsistencias(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.usuario);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ObtenerUsuarioPorId
You can execute the `ObtenerUsuarioPorId` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useObtenerUsuarioPorId(dc: DataConnect, vars: ObtenerUsuarioPorIdVariables, options?: useDataConnectQueryOptions<ObtenerUsuarioPorIdData>): UseDataConnectQueryResult<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useObtenerUsuarioPorId(vars: ObtenerUsuarioPorIdVariables, options?: useDataConnectQueryOptions<ObtenerUsuarioPorIdData>): UseDataConnectQueryResult<ObtenerUsuarioPorIdData, ObtenerUsuarioPorIdVariables>;
```

### Variables
The `ObtenerUsuarioPorId` Query requires an argument of type `ObtenerUsuarioPorIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ObtenerUsuarioPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `ObtenerUsuarioPorId` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ObtenerUsuarioPorId` Query is of type `ObtenerUsuarioPorIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ObtenerUsuarioPorId`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ObtenerUsuarioPorIdVariables } from '@dataconnect/generated';
import { useObtenerUsuarioPorId } from '@dataconnect/generated/react'

export default function ObtenerUsuarioPorIdComponent() {
  // The `useObtenerUsuarioPorId` Query hook requires an argument of type `ObtenerUsuarioPorIdVariables`:
  const obtenerUsuarioPorIdVars: ObtenerUsuarioPorIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useObtenerUsuarioPorId(obtenerUsuarioPorIdVars);
  // Variables can be defined inline as well.
  const query = useObtenerUsuarioPorId({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useObtenerUsuarioPorId(dataConnect, obtenerUsuarioPorIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerUsuarioPorId(obtenerUsuarioPorIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerUsuarioPorId(dataConnect, obtenerUsuarioPorIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.usuario);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarTiposEquipo
You can execute the `ListarTiposEquipo` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarTiposEquipo(dc: DataConnect, options?: useDataConnectQueryOptions<ListarTiposEquipoData>): UseDataConnectQueryResult<ListarTiposEquipoData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarTiposEquipo(options?: useDataConnectQueryOptions<ListarTiposEquipoData>): UseDataConnectQueryResult<ListarTiposEquipoData, undefined>;
```

### Variables
The `ListarTiposEquipo` Query has no variables.
### Return Type
Recall that calling the `ListarTiposEquipo` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarTiposEquipo` Query is of type `ListarTiposEquipoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarTiposEquipo`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarTiposEquipo } from '@dataconnect/generated/react'

export default function ListarTiposEquipoComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarTiposEquipo();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarTiposEquipo(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarTiposEquipo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarTiposEquipo(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.tipoEquipos);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarEquiposInventario
You can execute the `ListarEquiposInventario` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarEquiposInventario(dc: DataConnect, options?: useDataConnectQueryOptions<ListarEquiposInventarioData>): UseDataConnectQueryResult<ListarEquiposInventarioData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarEquiposInventario(options?: useDataConnectQueryOptions<ListarEquiposInventarioData>): UseDataConnectQueryResult<ListarEquiposInventarioData, undefined>;
```

### Variables
The `ListarEquiposInventario` Query has no variables.
### Return Type
Recall that calling the `ListarEquiposInventario` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarEquiposInventario` Query is of type `ListarEquiposInventarioData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarEquiposInventario`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarEquiposInventario } from '@dataconnect/generated/react'

export default function ListarEquiposInventarioComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarEquiposInventario();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarEquiposInventario(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarEquiposInventario(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarEquiposInventario(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.equipoInventarios);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ObtenerEquipoPorId
You can execute the `ObtenerEquipoPorId` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useObtenerEquipoPorId(dc: DataConnect, vars: ObtenerEquipoPorIdVariables, options?: useDataConnectQueryOptions<ObtenerEquipoPorIdData>): UseDataConnectQueryResult<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useObtenerEquipoPorId(vars: ObtenerEquipoPorIdVariables, options?: useDataConnectQueryOptions<ObtenerEquipoPorIdData>): UseDataConnectQueryResult<ObtenerEquipoPorIdData, ObtenerEquipoPorIdVariables>;
```

### Variables
The `ObtenerEquipoPorId` Query requires an argument of type `ObtenerEquipoPorIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ObtenerEquipoPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `ObtenerEquipoPorId` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ObtenerEquipoPorId` Query is of type `ObtenerEquipoPorIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ObtenerEquipoPorId`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ObtenerEquipoPorIdVariables } from '@dataconnect/generated';
import { useObtenerEquipoPorId } from '@dataconnect/generated/react'

export default function ObtenerEquipoPorIdComponent() {
  // The `useObtenerEquipoPorId` Query hook requires an argument of type `ObtenerEquipoPorIdVariables`:
  const obtenerEquipoPorIdVars: ObtenerEquipoPorIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useObtenerEquipoPorId(obtenerEquipoPorIdVars);
  // Variables can be defined inline as well.
  const query = useObtenerEquipoPorId({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useObtenerEquipoPorId(dataConnect, obtenerEquipoPorIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerEquipoPorId(obtenerEquipoPorIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerEquipoPorId(dataConnect, obtenerEquipoPorIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.equipoInventario);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarEnviosEquipo
You can execute the `ListarEnviosEquipo` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarEnviosEquipo(dc: DataConnect, options?: useDataConnectQueryOptions<ListarEnviosEquipoData>): UseDataConnectQueryResult<ListarEnviosEquipoData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarEnviosEquipo(options?: useDataConnectQueryOptions<ListarEnviosEquipoData>): UseDataConnectQueryResult<ListarEnviosEquipoData, undefined>;
```

### Variables
The `ListarEnviosEquipo` Query has no variables.
### Return Type
Recall that calling the `ListarEnviosEquipo` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarEnviosEquipo` Query is of type `ListarEnviosEquipoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarEnviosEquipo`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarEnviosEquipo } from '@dataconnect/generated/react'

export default function ListarEnviosEquipoComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarEnviosEquipo();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarEnviosEquipo(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarEnviosEquipo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarEnviosEquipo(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.envioEquipos);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ObtenerEnvioPorId
You can execute the `ObtenerEnvioPorId` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useObtenerEnvioPorId(dc: DataConnect, vars: ObtenerEnvioPorIdVariables, options?: useDataConnectQueryOptions<ObtenerEnvioPorIdData>): UseDataConnectQueryResult<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useObtenerEnvioPorId(vars: ObtenerEnvioPorIdVariables, options?: useDataConnectQueryOptions<ObtenerEnvioPorIdData>): UseDataConnectQueryResult<ObtenerEnvioPorIdData, ObtenerEnvioPorIdVariables>;
```

### Variables
The `ObtenerEnvioPorId` Query requires an argument of type `ObtenerEnvioPorIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ObtenerEnvioPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `ObtenerEnvioPorId` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ObtenerEnvioPorId` Query is of type `ObtenerEnvioPorIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ObtenerEnvioPorId`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ObtenerEnvioPorIdVariables } from '@dataconnect/generated';
import { useObtenerEnvioPorId } from '@dataconnect/generated/react'

export default function ObtenerEnvioPorIdComponent() {
  // The `useObtenerEnvioPorId` Query hook requires an argument of type `ObtenerEnvioPorIdVariables`:
  const obtenerEnvioPorIdVars: ObtenerEnvioPorIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useObtenerEnvioPorId(obtenerEnvioPorIdVars);
  // Variables can be defined inline as well.
  const query = useObtenerEnvioPorId({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useObtenerEnvioPorId(dataConnect, obtenerEnvioPorIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerEnvioPorId(obtenerEnvioPorIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerEnvioPorId(dataConnect, obtenerEnvioPorIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.envioEquipo);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarCompaniasContratistas
You can execute the `ListarCompaniasContratistas` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarCompaniasContratistas(dc: DataConnect, options?: useDataConnectQueryOptions<ListarCompaniasContratistasData>): UseDataConnectQueryResult<ListarCompaniasContratistasData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarCompaniasContratistas(options?: useDataConnectQueryOptions<ListarCompaniasContratistasData>): UseDataConnectQueryResult<ListarCompaniasContratistasData, undefined>;
```

### Variables
The `ListarCompaniasContratistas` Query has no variables.
### Return Type
Recall that calling the `ListarCompaniasContratistas` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarCompaniasContratistas` Query is of type `ListarCompaniasContratistasData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListarCompaniasContratistasData {
  companiaContratistas: ({
    id: UUIDString;
    nombre: string;
    rif?: string | null;
    telefonoContacto?: string | null;
  } & CompaniaContratista_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarCompaniasContratistas`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarCompaniasContratistas } from '@dataconnect/generated/react'

export default function ListarCompaniasContratistasComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarCompaniasContratistas();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarCompaniasContratistas(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarCompaniasContratistas(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarCompaniasContratistas(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.companiaContratistas);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarCuadrillasPorContratista
You can execute the `ListarCuadrillasPorContratista` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarCuadrillasPorContratista(dc: DataConnect, vars: ListarCuadrillasPorContratistaVariables, options?: useDataConnectQueryOptions<ListarCuadrillasPorContratistaData>): UseDataConnectQueryResult<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarCuadrillasPorContratista(vars: ListarCuadrillasPorContratistaVariables, options?: useDataConnectQueryOptions<ListarCuadrillasPorContratistaData>): UseDataConnectQueryResult<ListarCuadrillasPorContratistaData, ListarCuadrillasPorContratistaVariables>;
```

### Variables
The `ListarCuadrillasPorContratista` Query requires an argument of type `ListarCuadrillasPorContratistaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ListarCuadrillasPorContratistaVariables {
  companiaId: UUIDString;
}
```
### Return Type
Recall that calling the `ListarCuadrillasPorContratista` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarCuadrillasPorContratista` Query is of type `ListarCuadrillasPorContratistaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarCuadrillasPorContratista`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ListarCuadrillasPorContratistaVariables } from '@dataconnect/generated';
import { useListarCuadrillasPorContratista } from '@dataconnect/generated/react'

export default function ListarCuadrillasPorContratistaComponent() {
  // The `useListarCuadrillasPorContratista` Query hook requires an argument of type `ListarCuadrillasPorContratistaVariables`:
  const listarCuadrillasPorContratistaVars: ListarCuadrillasPorContratistaVariables = {
    companiaId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarCuadrillasPorContratista(listarCuadrillasPorContratistaVars);
  // Variables can be defined inline as well.
  const query = useListarCuadrillasPorContratista({ companiaId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarCuadrillasPorContratista(dataConnect, listarCuadrillasPorContratistaVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarCuadrillasPorContratista(listarCuadrillasPorContratistaVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarCuadrillasPorContratista(dataConnect, listarCuadrillasPorContratistaVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.companiaContratista);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarEquipamentosPrestados
You can execute the `ListarEquipamentosPrestados` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarEquipamentosPrestados(dc: DataConnect, options?: useDataConnectQueryOptions<ListarEquipamentosPrestadosData>): UseDataConnectQueryResult<ListarEquipamentosPrestadosData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarEquipamentosPrestados(options?: useDataConnectQueryOptions<ListarEquipamentosPrestadosData>): UseDataConnectQueryResult<ListarEquipamentosPrestadosData, undefined>;
```

### Variables
The `ListarEquipamentosPrestados` Query has no variables.
### Return Type
Recall that calling the `ListarEquipamentosPrestados` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarEquipamentosPrestados` Query is of type `ListarEquipamentosPrestadosData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarEquipamentosPrestados`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarEquipamentosPrestados } from '@dataconnect/generated/react'

export default function ListarEquipamentosPrestadosComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarEquipamentosPrestados();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarEquipamentosPrestados(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarEquipamentosPrestados(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarEquipamentosPrestados(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.equipamentoPrestados);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarMovimientosTesoreria
You can execute the `ListarMovimientosTesoreria` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarMovimientosTesoreria(dc: DataConnect, options?: useDataConnectQueryOptions<ListarMovimientosTesoreriaData>): UseDataConnectQueryResult<ListarMovimientosTesoreriaData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarMovimientosTesoreria(options?: useDataConnectQueryOptions<ListarMovimientosTesoreriaData>): UseDataConnectQueryResult<ListarMovimientosTesoreriaData, undefined>;
```

### Variables
The `ListarMovimientosTesoreria` Query has no variables.
### Return Type
Recall that calling the `ListarMovimientosTesoreria` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarMovimientosTesoreria` Query is of type `ListarMovimientosTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarMovimientosTesoreria`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarMovimientosTesoreria } from '@dataconnect/generated/react'

export default function ListarMovimientosTesoreriaComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarMovimientosTesoreria();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarMovimientosTesoreria(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarMovimientosTesoreria(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarMovimientosTesoreria(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.movimientoTesorerias);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ObtenerMovimientoPorId
You can execute the `ObtenerMovimientoPorId` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useObtenerMovimientoPorId(dc: DataConnect, vars: ObtenerMovimientoPorIdVariables, options?: useDataConnectQueryOptions<ObtenerMovimientoPorIdData>): UseDataConnectQueryResult<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useObtenerMovimientoPorId(vars: ObtenerMovimientoPorIdVariables, options?: useDataConnectQueryOptions<ObtenerMovimientoPorIdData>): UseDataConnectQueryResult<ObtenerMovimientoPorIdData, ObtenerMovimientoPorIdVariables>;
```

### Variables
The `ObtenerMovimientoPorId` Query requires an argument of type `ObtenerMovimientoPorIdVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ObtenerMovimientoPorIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `ObtenerMovimientoPorId` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ObtenerMovimientoPorId` Query is of type `ObtenerMovimientoPorIdData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ObtenerMovimientoPorId`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ObtenerMovimientoPorIdVariables } from '@dataconnect/generated';
import { useObtenerMovimientoPorId } from '@dataconnect/generated/react'

export default function ObtenerMovimientoPorIdComponent() {
  // The `useObtenerMovimientoPorId` Query hook requires an argument of type `ObtenerMovimientoPorIdVariables`:
  const obtenerMovimientoPorIdVars: ObtenerMovimientoPorIdVariables = {
    id: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useObtenerMovimientoPorId(obtenerMovimientoPorIdVars);
  // Variables can be defined inline as well.
  const query = useObtenerMovimientoPorId({ id: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useObtenerMovimientoPorId(dataConnect, obtenerMovimientoPorIdVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerMovimientoPorId(obtenerMovimientoPorIdVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerMovimientoPorId(dataConnect, obtenerMovimientoPorIdVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.movimientoTesoreria);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ListarFondos
You can execute the `ListarFondos` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useListarFondos(dc: DataConnect, options?: useDataConnectQueryOptions<ListarFondosData>): UseDataConnectQueryResult<ListarFondosData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useListarFondos(options?: useDataConnectQueryOptions<ListarFondosData>): UseDataConnectQueryResult<ListarFondosData, undefined>;
```

### Variables
The `ListarFondos` Query has no variables.
### Return Type
Recall that calling the `ListarFondos` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ListarFondos` Query is of type `ListarFondosData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ListarFondos`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';
import { useListarFondos } from '@dataconnect/generated/react'

export default function ListarFondosComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useListarFondos();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useListarFondos(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useListarFondos(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useListarFondos(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.fondos);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ObtenerFondoPorSede
You can execute the `ObtenerFondoPorSede` Query using the following Query hook function, which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts):

```javascript
useObtenerFondoPorSede(dc: DataConnect, vars: ObtenerFondoPorSedeVariables, options?: useDataConnectQueryOptions<ObtenerFondoPorSedeData>): UseDataConnectQueryResult<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useObtenerFondoPorSede(vars: ObtenerFondoPorSedeVariables, options?: useDataConnectQueryOptions<ObtenerFondoPorSedeData>): UseDataConnectQueryResult<ObtenerFondoPorSedeData, ObtenerFondoPorSedeVariables>;
```

### Variables
The `ObtenerFondoPorSede` Query requires an argument of type `ObtenerFondoPorSedeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ObtenerFondoPorSedeVariables {
  sedeId: UUIDString;
}
```
### Return Type
Recall that calling the `ObtenerFondoPorSede` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `ObtenerFondoPorSede` Query is of type `ObtenerFondoPorSedeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `ObtenerFondoPorSede`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ObtenerFondoPorSedeVariables } from '@dataconnect/generated';
import { useObtenerFondoPorSede } from '@dataconnect/generated/react'

export default function ObtenerFondoPorSedeComponent() {
  // The `useObtenerFondoPorSede` Query hook requires an argument of type `ObtenerFondoPorSedeVariables`:
  const obtenerFondoPorSedeVars: ObtenerFondoPorSedeVariables = {
    sedeId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useObtenerFondoPorSede(obtenerFondoPorSedeVars);
  // Variables can be defined inline as well.
  const query = useObtenerFondoPorSede({ sedeId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useObtenerFondoPorSede(dataConnect, obtenerFondoPorSedeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerFondoPorSede(obtenerFondoPorSedeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useObtenerFondoPorSede(dataConnect, obtenerFondoPorSedeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.sede);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `example` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CrearUsuario
You can execute the `CrearUsuario` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearUsuario(options?: useDataConnectMutationOptions<CrearUsuarioData, FirebaseError, CrearUsuarioVariables>): UseDataConnectMutationResult<CrearUsuarioData, CrearUsuarioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearUsuario(dc: DataConnect, options?: useDataConnectMutationOptions<CrearUsuarioData, FirebaseError, CrearUsuarioVariables>): UseDataConnectMutationResult<CrearUsuarioData, CrearUsuarioVariables>;
```

### Variables
The `CrearUsuario` Mutation requires an argument of type `CrearUsuarioVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CrearUsuario` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearUsuario` Mutation is of type `CrearUsuarioData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearUsuarioData {
  usuario_insert: Usuario_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearUsuario`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearUsuarioVariables } from '@dataconnect/generated';
import { useCrearUsuario } from '@dataconnect/generated/react'

export default function CrearUsuarioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearUsuario();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearUsuario(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearUsuario(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearUsuario(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearUsuario` Mutation requires an argument of type `CrearUsuarioVariables`:
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
  mutation.mutate(crearUsuarioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ nombre: ..., apellido: ..., cedula: ..., fechaNacimiento: ..., cargo: ..., nivelAdministrativo: ..., hashBiometrico: ..., permisosDB: ..., email: ..., rol: ..., sedeId: ..., activo: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearUsuarioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.usuario_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarMiPerfil
You can execute the `ActualizarMiPerfil` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarMiPerfil(options?: useDataConnectMutationOptions<ActualizarMiPerfilData, FirebaseError, ActualizarMiPerfilVariables>): UseDataConnectMutationResult<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarMiPerfil(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarMiPerfilData, FirebaseError, ActualizarMiPerfilVariables>): UseDataConnectMutationResult<ActualizarMiPerfilData, ActualizarMiPerfilVariables>;
```

### Variables
The `ActualizarMiPerfil` Mutation requires an argument of type `ActualizarMiPerfilVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ActualizarMiPerfilVariables {
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
}
```
### Return Type
Recall that calling the `ActualizarMiPerfil` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarMiPerfil` Mutation is of type `ActualizarMiPerfilData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarMiPerfilData {
  usuario_update?: Usuario_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarMiPerfil`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarMiPerfilVariables } from '@dataconnect/generated';
import { useActualizarMiPerfil } from '@dataconnect/generated/react'

export default function ActualizarMiPerfilComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarMiPerfil();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarMiPerfil(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarMiPerfil(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarMiPerfil(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarMiPerfil` Mutation requires an argument of type `ActualizarMiPerfilVariables`:
  const actualizarMiPerfilVars: ActualizarMiPerfilVariables = {
    nombre: ..., 
    apellido: ..., 
    cedula: ..., 
    email: ..., 
  };
  mutation.mutate(actualizarMiPerfilVars);
  // Variables can be defined inline as well.
  mutation.mutate({ nombre: ..., apellido: ..., cedula: ..., email: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarMiPerfilVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.usuario_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarUsuario
You can execute the `EliminarUsuario` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarUsuario(options?: useDataConnectMutationOptions<EliminarUsuarioData, FirebaseError, EliminarUsuarioVariables>): UseDataConnectMutationResult<EliminarUsuarioData, EliminarUsuarioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarUsuario(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarUsuarioData, FirebaseError, EliminarUsuarioVariables>): UseDataConnectMutationResult<EliminarUsuarioData, EliminarUsuarioVariables>;
```

### Variables
The `EliminarUsuario` Mutation requires an argument of type `EliminarUsuarioVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarUsuarioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarUsuario` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarUsuario` Mutation is of type `EliminarUsuarioData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarUsuarioData {
  usuario_delete?: Usuario_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarUsuario`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarUsuarioVariables } from '@dataconnect/generated';
import { useEliminarUsuario } from '@dataconnect/generated/react'

export default function EliminarUsuarioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarUsuario();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarUsuario(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarUsuario(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarUsuario(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarUsuario` Mutation requires an argument of type `EliminarUsuarioVariables`:
  const eliminarUsuarioVars: EliminarUsuarioVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarUsuarioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarUsuarioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.usuario_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearSede
You can execute the `CrearSede` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearSede(options?: useDataConnectMutationOptions<CrearSedeData, FirebaseError, CrearSedeVariables>): UseDataConnectMutationResult<CrearSedeData, CrearSedeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearSede(dc: DataConnect, options?: useDataConnectMutationOptions<CrearSedeData, FirebaseError, CrearSedeVariables>): UseDataConnectMutationResult<CrearSedeData, CrearSedeVariables>;
```

### Variables
The `CrearSede` Mutation requires an argument of type `CrearSedeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CrearSedeVariables {
  nombre: string;
  direccion: string;
  telefono?: string | null;
  contacto?: string | null;
}
```
### Return Type
Recall that calling the `CrearSede` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearSede` Mutation is of type `CrearSedeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearSedeData {
  sede_insert: Sede_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearSede`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearSedeVariables } from '@dataconnect/generated';
import { useCrearSede } from '@dataconnect/generated/react'

export default function CrearSedeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearSede();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearSede(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearSede(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearSede(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearSede` Mutation requires an argument of type `CrearSedeVariables`:
  const crearSedeVars: CrearSedeVariables = {
    nombre: ..., 
    direccion: ..., 
    telefono: ..., // optional
    contacto: ..., // optional
  };
  mutation.mutate(crearSedeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ nombre: ..., direccion: ..., telefono: ..., contacto: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearSedeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.sede_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarSede
You can execute the `ActualizarSede` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarSede(options?: useDataConnectMutationOptions<ActualizarSedeData, FirebaseError, ActualizarSedeVariables>): UseDataConnectMutationResult<ActualizarSedeData, ActualizarSedeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarSede(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarSedeData, FirebaseError, ActualizarSedeVariables>): UseDataConnectMutationResult<ActualizarSedeData, ActualizarSedeVariables>;
```

### Variables
The `ActualizarSede` Mutation requires an argument of type `ActualizarSedeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ActualizarSedeVariables {
  id: UUIDString;
  nombre: string;
  direccion: string;
  telefono?: string | null;
  contacto?: string | null;
}
```
### Return Type
Recall that calling the `ActualizarSede` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarSede` Mutation is of type `ActualizarSedeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarSedeData {
  sede_update?: Sede_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarSede`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarSedeVariables } from '@dataconnect/generated';
import { useActualizarSede } from '@dataconnect/generated/react'

export default function ActualizarSedeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarSede();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarSede(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarSede(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarSede(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarSede` Mutation requires an argument of type `ActualizarSedeVariables`:
  const actualizarSedeVars: ActualizarSedeVariables = {
    id: ..., 
    nombre: ..., 
    direccion: ..., 
    telefono: ..., // optional
    contacto: ..., // optional
  };
  mutation.mutate(actualizarSedeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., nombre: ..., direccion: ..., telefono: ..., contacto: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarSedeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.sede_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarSede
You can execute the `EliminarSede` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarSede(options?: useDataConnectMutationOptions<EliminarSedeData, FirebaseError, EliminarSedeVariables>): UseDataConnectMutationResult<EliminarSedeData, EliminarSedeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarSede(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarSedeData, FirebaseError, EliminarSedeVariables>): UseDataConnectMutationResult<EliminarSedeData, EliminarSedeVariables>;
```

### Variables
The `EliminarSede` Mutation requires an argument of type `EliminarSedeVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarSedeVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarSede` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarSede` Mutation is of type `EliminarSedeData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarSedeData {
  sede_delete?: Sede_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarSede`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarSedeVariables } from '@dataconnect/generated';
import { useEliminarSede } from '@dataconnect/generated/react'

export default function EliminarSedeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarSede();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarSede(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarSede(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarSede(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarSede` Mutation requires an argument of type `EliminarSedeVariables`:
  const eliminarSedeVars: EliminarSedeVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarSedeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarSedeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.sede_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearTipoEquipo
You can execute the `CrearTipoEquipo` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearTipoEquipo(options?: useDataConnectMutationOptions<CrearTipoEquipoData, FirebaseError, CrearTipoEquipoVariables>): UseDataConnectMutationResult<CrearTipoEquipoData, CrearTipoEquipoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearTipoEquipo(dc: DataConnect, options?: useDataConnectMutationOptions<CrearTipoEquipoData, FirebaseError, CrearTipoEquipoVariables>): UseDataConnectMutationResult<CrearTipoEquipoData, CrearTipoEquipoVariables>;
```

### Variables
The `CrearTipoEquipo` Mutation requires an argument of type `CrearTipoEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CrearTipoEquipo` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearTipoEquipo` Mutation is of type `CrearTipoEquipoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearTipoEquipoData {
  tipoEquipo_insert: TipoEquipo_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearTipoEquipo`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearTipoEquipoVariables } from '@dataconnect/generated';
import { useCrearTipoEquipo } from '@dataconnect/generated/react'

export default function CrearTipoEquipoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearTipoEquipo();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearTipoEquipo(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearTipoEquipo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearTipoEquipo(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearTipoEquipo` Mutation requires an argument of type `CrearTipoEquipoVariables`:
  const crearTipoEquipoVars: CrearTipoEquipoVariables = {
    nombreTipo: ..., 
    modelo: ..., 
    descripcion: ..., // optional
    anchoBanda: ..., // optional
    canales: ..., // optional
    tecnologiaRelevante: ..., // optional
    datosVarios: ..., // optional
  };
  mutation.mutate(crearTipoEquipoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ nombreTipo: ..., modelo: ..., descripcion: ..., anchoBanda: ..., canales: ..., tecnologiaRelevante: ..., datosVarios: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearTipoEquipoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.tipoEquipo_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarTipoEquipo
You can execute the `ActualizarTipoEquipo` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarTipoEquipo(options?: useDataConnectMutationOptions<ActualizarTipoEquipoData, FirebaseError, ActualizarTipoEquipoVariables>): UseDataConnectMutationResult<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarTipoEquipo(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarTipoEquipoData, FirebaseError, ActualizarTipoEquipoVariables>): UseDataConnectMutationResult<ActualizarTipoEquipoData, ActualizarTipoEquipoVariables>;
```

### Variables
The `ActualizarTipoEquipo` Mutation requires an argument of type `ActualizarTipoEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ActualizarTipoEquipoVariables {
  id: UUIDString;
  nombreTipo: string;
  descripcion?: string | null;
  anchoBanda?: string | null;
  canales?: number | null;
}
```
### Return Type
Recall that calling the `ActualizarTipoEquipo` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarTipoEquipo` Mutation is of type `ActualizarTipoEquipoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarTipoEquipoData {
  tipoEquipo_update?: TipoEquipo_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarTipoEquipo`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarTipoEquipoVariables } from '@dataconnect/generated';
import { useActualizarTipoEquipo } from '@dataconnect/generated/react'

export default function ActualizarTipoEquipoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarTipoEquipo();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarTipoEquipo(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarTipoEquipo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarTipoEquipo(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarTipoEquipo` Mutation requires an argument of type `ActualizarTipoEquipoVariables`:
  const actualizarTipoEquipoVars: ActualizarTipoEquipoVariables = {
    id: ..., 
    nombreTipo: ..., 
    descripcion: ..., // optional
    anchoBanda: ..., // optional
    canales: ..., // optional
  };
  mutation.mutate(actualizarTipoEquipoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., nombreTipo: ..., descripcion: ..., anchoBanda: ..., canales: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarTipoEquipoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.tipoEquipo_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarTipoEquipo
You can execute the `EliminarTipoEquipo` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarTipoEquipo(options?: useDataConnectMutationOptions<EliminarTipoEquipoData, FirebaseError, EliminarTipoEquipoVariables>): UseDataConnectMutationResult<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarTipoEquipo(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarTipoEquipoData, FirebaseError, EliminarTipoEquipoVariables>): UseDataConnectMutationResult<EliminarTipoEquipoData, EliminarTipoEquipoVariables>;
```

### Variables
The `EliminarTipoEquipo` Mutation requires an argument of type `EliminarTipoEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarTipoEquipoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarTipoEquipo` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarTipoEquipo` Mutation is of type `EliminarTipoEquipoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarTipoEquipoData {
  tipoEquipo_delete?: TipoEquipo_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarTipoEquipo`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarTipoEquipoVariables } from '@dataconnect/generated';
import { useEliminarTipoEquipo } from '@dataconnect/generated/react'

export default function EliminarTipoEquipoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarTipoEquipo();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarTipoEquipo(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarTipoEquipo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarTipoEquipo(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarTipoEquipo` Mutation requires an argument of type `EliminarTipoEquipoVariables`:
  const eliminarTipoEquipoVars: EliminarTipoEquipoVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarTipoEquipoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarTipoEquipoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.tipoEquipo_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearEquipoInventario
You can execute the `CrearEquipoInventario` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearEquipoInventario(options?: useDataConnectMutationOptions<CrearEquipoInventarioData, FirebaseError, CrearEquipoInventarioVariables>): UseDataConnectMutationResult<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearEquipoInventario(dc: DataConnect, options?: useDataConnectMutationOptions<CrearEquipoInventarioData, FirebaseError, CrearEquipoInventarioVariables>): UseDataConnectMutationResult<CrearEquipoInventarioData, CrearEquipoInventarioVariables>;
```

### Variables
The `CrearEquipoInventario` Mutation requires an argument of type `CrearEquipoInventarioVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CrearEquipoInventario` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearEquipoInventario` Mutation is of type `CrearEquipoInventarioData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearEquipoInventarioData {
  equipoInventario_insert: EquipoInventario_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearEquipoInventario`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearEquipoInventarioVariables } from '@dataconnect/generated';
import { useCrearEquipoInventario } from '@dataconnect/generated/react'

export default function CrearEquipoInventarioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearEquipoInventario();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearEquipoInventario(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearEquipoInventario(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearEquipoInventario(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearEquipoInventario` Mutation requires an argument of type `CrearEquipoInventarioVariables`:
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
  mutation.mutate(crearEquipoInventarioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ tipoEquipoModelo: ..., modelo: ..., nombreDescriptivo: ..., valor: ..., cantidadDisponible: ..., serial: ..., estado: ..., ubicacionActualId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearEquipoInventarioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipoInventario_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarEquipoInventario
You can execute the `ActualizarEquipoInventario` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarEquipoInventario(options?: useDataConnectMutationOptions<ActualizarEquipoInventarioData, FirebaseError, ActualizarEquipoInventarioVariables>): UseDataConnectMutationResult<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarEquipoInventario(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarEquipoInventarioData, FirebaseError, ActualizarEquipoInventarioVariables>): UseDataConnectMutationResult<ActualizarEquipoInventarioData, ActualizarEquipoInventarioVariables>;
```

### Variables
The `ActualizarEquipoInventario` Mutation requires an argument of type `ActualizarEquipoInventarioVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ActualizarEquipoInventario` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarEquipoInventario` Mutation is of type `ActualizarEquipoInventarioData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarEquipoInventarioData {
  equipoInventario_update?: EquipoInventario_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarEquipoInventario`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarEquipoInventarioVariables } from '@dataconnect/generated';
import { useActualizarEquipoInventario } from '@dataconnect/generated/react'

export default function ActualizarEquipoInventarioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarEquipoInventario();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarEquipoInventario(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarEquipoInventario(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarEquipoInventario(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarEquipoInventario` Mutation requires an argument of type `ActualizarEquipoInventarioVariables`:
  const actualizarEquipoInventarioVars: ActualizarEquipoInventarioVariables = {
    id: ..., 
    nombreDescriptivo: ..., 
    valor: ..., 
    cantidadDisponible: ..., 
    estado: ..., 
    ubicacionActualId: ..., 
  };
  mutation.mutate(actualizarEquipoInventarioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., nombreDescriptivo: ..., valor: ..., cantidadDisponible: ..., estado: ..., ubicacionActualId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarEquipoInventarioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipoInventario_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarEquipoInventario
You can execute the `EliminarEquipoInventario` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarEquipoInventario(options?: useDataConnectMutationOptions<EliminarEquipoInventarioData, FirebaseError, EliminarEquipoInventarioVariables>): UseDataConnectMutationResult<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarEquipoInventario(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarEquipoInventarioData, FirebaseError, EliminarEquipoInventarioVariables>): UseDataConnectMutationResult<EliminarEquipoInventarioData, EliminarEquipoInventarioVariables>;
```

### Variables
The `EliminarEquipoInventario` Mutation requires an argument of type `EliminarEquipoInventarioVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarEquipoInventarioVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarEquipoInventario` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarEquipoInventario` Mutation is of type `EliminarEquipoInventarioData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarEquipoInventarioData {
  equipoInventario_delete?: EquipoInventario_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarEquipoInventario`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarEquipoInventarioVariables } from '@dataconnect/generated';
import { useEliminarEquipoInventario } from '@dataconnect/generated/react'

export default function EliminarEquipoInventarioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarEquipoInventario();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarEquipoInventario(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarEquipoInventario(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarEquipoInventario(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarEquipoInventario` Mutation requires an argument of type `EliminarEquipoInventarioVariables`:
  const eliminarEquipoInventarioVars: EliminarEquipoInventarioVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarEquipoInventarioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarEquipoInventarioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipoInventario_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearEnvioEquipo
You can execute the `CrearEnvioEquipo` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearEnvioEquipo(options?: useDataConnectMutationOptions<CrearEnvioEquipoData, FirebaseError, CrearEnvioEquipoVariables>): UseDataConnectMutationResult<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearEnvioEquipo(dc: DataConnect, options?: useDataConnectMutationOptions<CrearEnvioEquipoData, FirebaseError, CrearEnvioEquipoVariables>): UseDataConnectMutationResult<CrearEnvioEquipoData, CrearEnvioEquipoVariables>;
```

### Variables
The `CrearEnvioEquipo` Mutation requires an argument of type `CrearEnvioEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CrearEnvioEquipo` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearEnvioEquipo` Mutation is of type `CrearEnvioEquipoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearEnvioEquipoData {
  envioEquipo_insert: EnvioEquipo_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearEnvioEquipo`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearEnvioEquipoVariables } from '@dataconnect/generated';
import { useCrearEnvioEquipo } from '@dataconnect/generated/react'

export default function CrearEnvioEquipoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearEnvioEquipo();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearEnvioEquipo(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearEnvioEquipo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearEnvioEquipo(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearEnvioEquipo` Mutation requires an argument of type `CrearEnvioEquipoVariables`:
  const crearEnvioEquipoVars: CrearEnvioEquipoVariables = {
    gerenciaEncargadaId: ..., 
    gerenciaReceptoraId: ..., 
    sedeDestinoId: ..., 
    sedeOrigenId: ..., 
    tipoEnvio: ..., 
    fechaEnvio: ..., 
    descripcionGeneral: ..., // optional
  };
  mutation.mutate(crearEnvioEquipoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ gerenciaEncargadaId: ..., gerenciaReceptoraId: ..., sedeDestinoId: ..., sedeOrigenId: ..., tipoEnvio: ..., fechaEnvio: ..., descripcionGeneral: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearEnvioEquipoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.envioEquipo_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RecepcionarEnvio
You can execute the `RecepcionarEnvio` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useRecepcionarEnvio(options?: useDataConnectMutationOptions<RecepcionarEnvioData, FirebaseError, RecepcionarEnvioVariables>): UseDataConnectMutationResult<RecepcionarEnvioData, RecepcionarEnvioVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRecepcionarEnvio(dc: DataConnect, options?: useDataConnectMutationOptions<RecepcionarEnvioData, FirebaseError, RecepcionarEnvioVariables>): UseDataConnectMutationResult<RecepcionarEnvioData, RecepcionarEnvioVariables>;
```

### Variables
The `RecepcionarEnvio` Mutation requires an argument of type `RecepcionarEnvioVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RecepcionarEnvioVariables {
  id: UUIDString;
  fechaRecepcion: DateString;
}
```
### Return Type
Recall that calling the `RecepcionarEnvio` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RecepcionarEnvio` Mutation is of type `RecepcionarEnvioData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RecepcionarEnvioData {
  envioEquipo_update?: EnvioEquipo_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RecepcionarEnvio`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RecepcionarEnvioVariables } from '@dataconnect/generated';
import { useRecepcionarEnvio } from '@dataconnect/generated/react'

export default function RecepcionarEnvioComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRecepcionarEnvio();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRecepcionarEnvio(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecepcionarEnvio(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecepcionarEnvio(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRecepcionarEnvio` Mutation requires an argument of type `RecepcionarEnvioVariables`:
  const recepcionarEnvioVars: RecepcionarEnvioVariables = {
    id: ..., 
    fechaRecepcion: ..., 
  };
  mutation.mutate(recepcionarEnvioVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., fechaRecepcion: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(recepcionarEnvioVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.envioEquipo_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarEnvioEquipo
You can execute the `EliminarEnvioEquipo` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarEnvioEquipo(options?: useDataConnectMutationOptions<EliminarEnvioEquipoData, FirebaseError, EliminarEnvioEquipoVariables>): UseDataConnectMutationResult<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarEnvioEquipo(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarEnvioEquipoData, FirebaseError, EliminarEnvioEquipoVariables>): UseDataConnectMutationResult<EliminarEnvioEquipoData, EliminarEnvioEquipoVariables>;
```

### Variables
The `EliminarEnvioEquipo` Mutation requires an argument of type `EliminarEnvioEquipoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarEnvioEquipoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarEnvioEquipo` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarEnvioEquipo` Mutation is of type `EliminarEnvioEquipoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarEnvioEquipoData {
  envioEquipo_delete?: EnvioEquipo_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarEnvioEquipo`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarEnvioEquipoVariables } from '@dataconnect/generated';
import { useEliminarEnvioEquipo } from '@dataconnect/generated/react'

export default function EliminarEnvioEquipoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarEnvioEquipo();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarEnvioEquipo(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarEnvioEquipo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarEnvioEquipo(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarEnvioEquipo` Mutation requires an argument of type `EliminarEnvioEquipoVariables`:
  const eliminarEnvioEquipoVars: EliminarEnvioEquipoVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarEnvioEquipoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarEnvioEquipoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.envioEquipo_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RegistrarAsistencia
You can execute the `RegistrarAsistencia` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useRegistrarAsistencia(options?: useDataConnectMutationOptions<RegistrarAsistenciaData, FirebaseError, RegistrarAsistenciaVariables>): UseDataConnectMutationResult<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRegistrarAsistencia(dc: DataConnect, options?: useDataConnectMutationOptions<RegistrarAsistenciaData, FirebaseError, RegistrarAsistenciaVariables>): UseDataConnectMutationResult<RegistrarAsistenciaData, RegistrarAsistenciaVariables>;
```

### Variables
The `RegistrarAsistencia` Mutation requires an argument of type `RegistrarAsistenciaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `RegistrarAsistencia` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RegistrarAsistencia` Mutation is of type `RegistrarAsistenciaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RegistrarAsistenciaData {
  asistencia_insert: Asistencia_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RegistrarAsistencia`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RegistrarAsistenciaVariables } from '@dataconnect/generated';
import { useRegistrarAsistencia } from '@dataconnect/generated/react'

export default function RegistrarAsistenciaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRegistrarAsistencia();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRegistrarAsistencia(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRegistrarAsistencia(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRegistrarAsistencia(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRegistrarAsistencia` Mutation requires an argument of type `RegistrarAsistenciaVariables`:
  const registrarAsistenciaVars: RegistrarAsistenciaVariables = {
    usuarioId: ..., 
    fecha: ..., 
    horaEntradaManana: ..., 
    horaSalidaManana: ..., 
    horaEntradaTarde: ..., // optional
    horaSalidaTarde: ..., // optional
  };
  mutation.mutate(registrarAsistenciaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ usuarioId: ..., fecha: ..., horaEntradaManana: ..., horaSalidaManana: ..., horaEntradaTarde: ..., horaSalidaTarde: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(registrarAsistenciaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.asistencia_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RegistrarEntradaManana
You can execute the `RegistrarEntradaManana` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useRegistrarEntradaManana(options?: useDataConnectMutationOptions<RegistrarEntradaMananaData, FirebaseError, RegistrarEntradaMananaVariables>): UseDataConnectMutationResult<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRegistrarEntradaManana(dc: DataConnect, options?: useDataConnectMutationOptions<RegistrarEntradaMananaData, FirebaseError, RegistrarEntradaMananaVariables>): UseDataConnectMutationResult<RegistrarEntradaMananaData, RegistrarEntradaMananaVariables>;
```

### Variables
The `RegistrarEntradaManana` Mutation requires an argument of type `RegistrarEntradaMananaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RegistrarEntradaMananaVariables {
  horaEntrada: TimestampString;
  horaSalidaManana: TimestampString;
}
```
### Return Type
Recall that calling the `RegistrarEntradaManana` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RegistrarEntradaManana` Mutation is of type `RegistrarEntradaMananaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RegistrarEntradaMananaData {
  asistencia_insert: Asistencia_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RegistrarEntradaManana`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RegistrarEntradaMananaVariables } from '@dataconnect/generated';
import { useRegistrarEntradaManana } from '@dataconnect/generated/react'

export default function RegistrarEntradaMananaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRegistrarEntradaManana();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRegistrarEntradaManana(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRegistrarEntradaManana(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRegistrarEntradaManana(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRegistrarEntradaManana` Mutation requires an argument of type `RegistrarEntradaMananaVariables`:
  const registrarEntradaMananaVars: RegistrarEntradaMananaVariables = {
    horaEntrada: ..., 
    horaSalidaManana: ..., 
  };
  mutation.mutate(registrarEntradaMananaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ horaEntrada: ..., horaSalidaManana: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(registrarEntradaMananaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.asistencia_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarAsistencia
You can execute the `ActualizarAsistencia` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarAsistencia(options?: useDataConnectMutationOptions<ActualizarAsistenciaData, FirebaseError, ActualizarAsistenciaVariables>): UseDataConnectMutationResult<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarAsistencia(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarAsistenciaData, FirebaseError, ActualizarAsistenciaVariables>): UseDataConnectMutationResult<ActualizarAsistenciaData, ActualizarAsistenciaVariables>;
```

### Variables
The `ActualizarAsistencia` Mutation requires an argument of type `ActualizarAsistenciaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ActualizarAsistenciaVariables {
  id: UUIDString;
  horaSalidaManana: TimestampString;
  horaEntradaTarde?: TimestampString | null;
  horaSalidaTarde?: TimestampString | null;
}
```
### Return Type
Recall that calling the `ActualizarAsistencia` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarAsistencia` Mutation is of type `ActualizarAsistenciaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarAsistenciaData {
  asistencia_update?: Asistencia_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarAsistencia`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarAsistenciaVariables } from '@dataconnect/generated';
import { useActualizarAsistencia } from '@dataconnect/generated/react'

export default function ActualizarAsistenciaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarAsistencia();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarAsistencia(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarAsistencia(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarAsistencia(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarAsistencia` Mutation requires an argument of type `ActualizarAsistenciaVariables`:
  const actualizarAsistenciaVars: ActualizarAsistenciaVariables = {
    id: ..., 
    horaSalidaManana: ..., 
    horaEntradaTarde: ..., // optional
    horaSalidaTarde: ..., // optional
  };
  mutation.mutate(actualizarAsistenciaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., horaSalidaManana: ..., horaEntradaTarde: ..., horaSalidaTarde: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarAsistenciaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.asistencia_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarAsistencia
You can execute the `EliminarAsistencia` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarAsistencia(options?: useDataConnectMutationOptions<EliminarAsistenciaData, FirebaseError, EliminarAsistenciaVariables>): UseDataConnectMutationResult<EliminarAsistenciaData, EliminarAsistenciaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarAsistencia(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarAsistenciaData, FirebaseError, EliminarAsistenciaVariables>): UseDataConnectMutationResult<EliminarAsistenciaData, EliminarAsistenciaVariables>;
```

### Variables
The `EliminarAsistencia` Mutation requires an argument of type `EliminarAsistenciaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarAsistenciaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarAsistencia` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarAsistencia` Mutation is of type `EliminarAsistenciaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarAsistenciaData {
  asistencia_delete?: Asistencia_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarAsistencia`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarAsistenciaVariables } from '@dataconnect/generated';
import { useEliminarAsistencia } from '@dataconnect/generated/react'

export default function EliminarAsistenciaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarAsistencia();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarAsistencia(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarAsistencia(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarAsistencia(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarAsistencia` Mutation requires an argument of type `EliminarAsistenciaVariables`:
  const eliminarAsistenciaVars: EliminarAsistenciaVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarAsistenciaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarAsistenciaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.asistencia_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearCompaniaContratista
You can execute the `CrearCompaniaContratista` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearCompaniaContratista(options?: useDataConnectMutationOptions<CrearCompaniaContratistaData, FirebaseError, CrearCompaniaContratistaVariables>): UseDataConnectMutationResult<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearCompaniaContratista(dc: DataConnect, options?: useDataConnectMutationOptions<CrearCompaniaContratistaData, FirebaseError, CrearCompaniaContratistaVariables>): UseDataConnectMutationResult<CrearCompaniaContratistaData, CrearCompaniaContratistaVariables>;
```

### Variables
The `CrearCompaniaContratista` Mutation requires an argument of type `CrearCompaniaContratistaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CrearCompaniaContratistaVariables {
  nombre: string;
  rif?: string | null;
  telefonoContacto?: string | null;
}
```
### Return Type
Recall that calling the `CrearCompaniaContratista` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearCompaniaContratista` Mutation is of type `CrearCompaniaContratistaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearCompaniaContratistaData {
  companiaContratista_insert: CompaniaContratista_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearCompaniaContratista`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearCompaniaContratistaVariables } from '@dataconnect/generated';
import { useCrearCompaniaContratista } from '@dataconnect/generated/react'

export default function CrearCompaniaContratistaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearCompaniaContratista();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearCompaniaContratista(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearCompaniaContratista(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearCompaniaContratista(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearCompaniaContratista` Mutation requires an argument of type `CrearCompaniaContratistaVariables`:
  const crearCompaniaContratistaVars: CrearCompaniaContratistaVariables = {
    nombre: ..., 
    rif: ..., // optional
    telefonoContacto: ..., // optional
  };
  mutation.mutate(crearCompaniaContratistaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ nombre: ..., rif: ..., telefonoContacto: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearCompaniaContratistaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.companiaContratista_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarCompaniaContratista
You can execute the `ActualizarCompaniaContratista` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarCompaniaContratista(options?: useDataConnectMutationOptions<ActualizarCompaniaContratistaData, FirebaseError, ActualizarCompaniaContratistaVariables>): UseDataConnectMutationResult<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarCompaniaContratista(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarCompaniaContratistaData, FirebaseError, ActualizarCompaniaContratistaVariables>): UseDataConnectMutationResult<ActualizarCompaniaContratistaData, ActualizarCompaniaContratistaVariables>;
```

### Variables
The `ActualizarCompaniaContratista` Mutation requires an argument of type `ActualizarCompaniaContratistaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ActualizarCompaniaContratistaVariables {
  id: UUIDString;
  nombre: string;
  telefonoContacto?: string | null;
}
```
### Return Type
Recall that calling the `ActualizarCompaniaContratista` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarCompaniaContratista` Mutation is of type `ActualizarCompaniaContratistaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarCompaniaContratistaData {
  companiaContratista_update?: CompaniaContratista_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarCompaniaContratista`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarCompaniaContratistaVariables } from '@dataconnect/generated';
import { useActualizarCompaniaContratista } from '@dataconnect/generated/react'

export default function ActualizarCompaniaContratistaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarCompaniaContratista();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarCompaniaContratista(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarCompaniaContratista(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarCompaniaContratista(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarCompaniaContratista` Mutation requires an argument of type `ActualizarCompaniaContratistaVariables`:
  const actualizarCompaniaContratistaVars: ActualizarCompaniaContratistaVariables = {
    id: ..., 
    nombre: ..., 
    telefonoContacto: ..., // optional
  };
  mutation.mutate(actualizarCompaniaContratistaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., nombre: ..., telefonoContacto: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarCompaniaContratistaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.companiaContratista_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarCompaniaContratista
You can execute the `EliminarCompaniaContratista` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarCompaniaContratista(options?: useDataConnectMutationOptions<EliminarCompaniaContratistaData, FirebaseError, EliminarCompaniaContratistaVariables>): UseDataConnectMutationResult<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarCompaniaContratista(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarCompaniaContratistaData, FirebaseError, EliminarCompaniaContratistaVariables>): UseDataConnectMutationResult<EliminarCompaniaContratistaData, EliminarCompaniaContratistaVariables>;
```

### Variables
The `EliminarCompaniaContratista` Mutation requires an argument of type `EliminarCompaniaContratistaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarCompaniaContratistaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarCompaniaContratista` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarCompaniaContratista` Mutation is of type `EliminarCompaniaContratistaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarCompaniaContratistaData {
  companiaContratista_delete?: CompaniaContratista_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarCompaniaContratista`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarCompaniaContratistaVariables } from '@dataconnect/generated';
import { useEliminarCompaniaContratista } from '@dataconnect/generated/react'

export default function EliminarCompaniaContratistaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarCompaniaContratista();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarCompaniaContratista(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarCompaniaContratista(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarCompaniaContratista(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarCompaniaContratista` Mutation requires an argument of type `EliminarCompaniaContratistaVariables`:
  const eliminarCompaniaContratistaVars: EliminarCompaniaContratistaVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarCompaniaContratistaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarCompaniaContratistaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.companiaContratista_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearCuadrilla
You can execute the `CrearCuadrilla` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearCuadrilla(options?: useDataConnectMutationOptions<CrearCuadrillaData, FirebaseError, CrearCuadrillaVariables>): UseDataConnectMutationResult<CrearCuadrillaData, CrearCuadrillaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearCuadrilla(dc: DataConnect, options?: useDataConnectMutationOptions<CrearCuadrillaData, FirebaseError, CrearCuadrillaVariables>): UseDataConnectMutationResult<CrearCuadrillaData, CrearCuadrillaVariables>;
```

### Variables
The `CrearCuadrilla` Mutation requires an argument of type `CrearCuadrillaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CrearCuadrillaVariables {
  nombreIdentificador: string;
  tamanoAproximado?: number | null;
  companiaContratistaId: UUIDString;
}
```
### Return Type
Recall that calling the `CrearCuadrilla` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearCuadrilla` Mutation is of type `CrearCuadrillaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearCuadrillaData {
  cuadrilla_insert: Cuadrilla_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearCuadrilla`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearCuadrillaVariables } from '@dataconnect/generated';
import { useCrearCuadrilla } from '@dataconnect/generated/react'

export default function CrearCuadrillaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearCuadrilla();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearCuadrilla(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearCuadrilla(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearCuadrilla(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearCuadrilla` Mutation requires an argument of type `CrearCuadrillaVariables`:
  const crearCuadrillaVars: CrearCuadrillaVariables = {
    nombreIdentificador: ..., 
    tamanoAproximado: ..., // optional
    companiaContratistaId: ..., 
  };
  mutation.mutate(crearCuadrillaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ nombreIdentificador: ..., tamanoAproximado: ..., companiaContratistaId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearCuadrillaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.cuadrilla_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarCuadrilla
You can execute the `ActualizarCuadrilla` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarCuadrilla(options?: useDataConnectMutationOptions<ActualizarCuadrillaData, FirebaseError, ActualizarCuadrillaVariables>): UseDataConnectMutationResult<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarCuadrilla(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarCuadrillaData, FirebaseError, ActualizarCuadrillaVariables>): UseDataConnectMutationResult<ActualizarCuadrillaData, ActualizarCuadrillaVariables>;
```

### Variables
The `ActualizarCuadrilla` Mutation requires an argument of type `ActualizarCuadrillaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ActualizarCuadrillaVariables {
  id: UUIDString;
  nombreIdentificador: string;
  tamanoAproximado?: number | null;
}
```
### Return Type
Recall that calling the `ActualizarCuadrilla` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarCuadrilla` Mutation is of type `ActualizarCuadrillaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarCuadrillaData {
  cuadrilla_update?: Cuadrilla_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarCuadrilla`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarCuadrillaVariables } from '@dataconnect/generated';
import { useActualizarCuadrilla } from '@dataconnect/generated/react'

export default function ActualizarCuadrillaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarCuadrilla();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarCuadrilla(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarCuadrilla(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarCuadrilla(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarCuadrilla` Mutation requires an argument of type `ActualizarCuadrillaVariables`:
  const actualizarCuadrillaVars: ActualizarCuadrillaVariables = {
    id: ..., 
    nombreIdentificador: ..., 
    tamanoAproximado: ..., // optional
  };
  mutation.mutate(actualizarCuadrillaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., nombreIdentificador: ..., tamanoAproximado: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarCuadrillaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.cuadrilla_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarCuadrilla
You can execute the `EliminarCuadrilla` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarCuadrilla(options?: useDataConnectMutationOptions<EliminarCuadrillaData, FirebaseError, EliminarCuadrillaVariables>): UseDataConnectMutationResult<EliminarCuadrillaData, EliminarCuadrillaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarCuadrilla(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarCuadrillaData, FirebaseError, EliminarCuadrillaVariables>): UseDataConnectMutationResult<EliminarCuadrillaData, EliminarCuadrillaVariables>;
```

### Variables
The `EliminarCuadrilla` Mutation requires an argument of type `EliminarCuadrillaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarCuadrillaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarCuadrilla` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarCuadrilla` Mutation is of type `EliminarCuadrillaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarCuadrillaData {
  cuadrilla_delete?: Cuadrilla_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarCuadrilla`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarCuadrillaVariables } from '@dataconnect/generated';
import { useEliminarCuadrilla } from '@dataconnect/generated/react'

export default function EliminarCuadrillaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarCuadrilla();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarCuadrilla(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarCuadrilla(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarCuadrilla(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarCuadrilla` Mutation requires an argument of type `EliminarCuadrillaVariables`:
  const eliminarCuadrillaVars: EliminarCuadrillaVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarCuadrillaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarCuadrillaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.cuadrilla_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearEquipamento
You can execute the `CrearEquipamento` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearEquipamento(options?: useDataConnectMutationOptions<CrearEquipamentoData, FirebaseError, CrearEquipamentoVariables>): UseDataConnectMutationResult<CrearEquipamentoData, CrearEquipamentoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearEquipamento(dc: DataConnect, options?: useDataConnectMutationOptions<CrearEquipamentoData, FirebaseError, CrearEquipamentoVariables>): UseDataConnectMutationResult<CrearEquipamentoData, CrearEquipamentoVariables>;
```

### Variables
The `CrearEquipamento` Mutation requires an argument of type `CrearEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CrearEquipamentoVariables {
  nombre: string;
  descripcion?: string | null;
  datosVarios?: string | null;
  modelo?: string | null;
}
```
### Return Type
Recall that calling the `CrearEquipamento` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearEquipamento` Mutation is of type `CrearEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearEquipamentoData {
  equipamento_insert: Equipamento_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearEquipamento`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearEquipamentoVariables } from '@dataconnect/generated';
import { useCrearEquipamento } from '@dataconnect/generated/react'

export default function CrearEquipamentoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearEquipamento();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearEquipamento(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearEquipamento(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearEquipamento(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearEquipamento` Mutation requires an argument of type `CrearEquipamentoVariables`:
  const crearEquipamentoVars: CrearEquipamentoVariables = {
    nombre: ..., 
    descripcion: ..., // optional
    datosVarios: ..., // optional
    modelo: ..., // optional
  };
  mutation.mutate(crearEquipamentoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ nombre: ..., descripcion: ..., datosVarios: ..., modelo: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearEquipamentoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipamento_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarEquipamento
You can execute the `ActualizarEquipamento` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarEquipamento(options?: useDataConnectMutationOptions<ActualizarEquipamentoData, FirebaseError, ActualizarEquipamentoVariables>): UseDataConnectMutationResult<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarEquipamento(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarEquipamentoData, FirebaseError, ActualizarEquipamentoVariables>): UseDataConnectMutationResult<ActualizarEquipamentoData, ActualizarEquipamentoVariables>;
```

### Variables
The `ActualizarEquipamento` Mutation requires an argument of type `ActualizarEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ActualizarEquipamentoVariables {
  id: UUIDString;
  nombre: string;
  descripcion?: string | null;
}
```
### Return Type
Recall that calling the `ActualizarEquipamento` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarEquipamento` Mutation is of type `ActualizarEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarEquipamentoData {
  equipamento_update?: Equipamento_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarEquipamento`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarEquipamentoVariables } from '@dataconnect/generated';
import { useActualizarEquipamento } from '@dataconnect/generated/react'

export default function ActualizarEquipamentoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarEquipamento();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarEquipamento(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarEquipamento(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarEquipamento(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarEquipamento` Mutation requires an argument of type `ActualizarEquipamentoVariables`:
  const actualizarEquipamentoVars: ActualizarEquipamentoVariables = {
    id: ..., 
    nombre: ..., 
    descripcion: ..., // optional
  };
  mutation.mutate(actualizarEquipamentoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., nombre: ..., descripcion: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarEquipamentoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipamento_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarEquipamento
You can execute the `EliminarEquipamento` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarEquipamento(options?: useDataConnectMutationOptions<EliminarEquipamentoData, FirebaseError, EliminarEquipamentoVariables>): UseDataConnectMutationResult<EliminarEquipamentoData, EliminarEquipamentoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarEquipamento(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarEquipamentoData, FirebaseError, EliminarEquipamentoVariables>): UseDataConnectMutationResult<EliminarEquipamentoData, EliminarEquipamentoVariables>;
```

### Variables
The `EliminarEquipamento` Mutation requires an argument of type `EliminarEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarEquipamentoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarEquipamento` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarEquipamento` Mutation is of type `EliminarEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarEquipamentoData {
  equipamento_delete?: Equipamento_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarEquipamento`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarEquipamentoVariables } from '@dataconnect/generated';
import { useEliminarEquipamento } from '@dataconnect/generated/react'

export default function EliminarEquipamentoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarEquipamento();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarEquipamento(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarEquipamento(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarEquipamento(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarEquipamento` Mutation requires an argument of type `EliminarEquipamentoVariables`:
  const eliminarEquipamentoVars: EliminarEquipamentoVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarEquipamentoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarEquipamentoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipamento_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## PrestarEquipamento
You can execute the `PrestarEquipamento` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
usePrestarEquipamento(options?: useDataConnectMutationOptions<PrestarEquipamentoData, FirebaseError, PrestarEquipamentoVariables>): UseDataConnectMutationResult<PrestarEquipamentoData, PrestarEquipamentoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
usePrestarEquipamento(dc: DataConnect, options?: useDataConnectMutationOptions<PrestarEquipamentoData, FirebaseError, PrestarEquipamentoVariables>): UseDataConnectMutationResult<PrestarEquipamentoData, PrestarEquipamentoVariables>;
```

### Variables
The `PrestarEquipamento` Mutation requires an argument of type `PrestarEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface PrestarEquipamentoVariables {
  companiaPrestadaId: UUIDString;
  equipamentoId: UUIDString;
  fechaInicio: DateString;
}
```
### Return Type
Recall that calling the `PrestarEquipamento` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `PrestarEquipamento` Mutation is of type `PrestarEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface PrestarEquipamentoData {
  equipamentoPrestado_insert: EquipamentoPrestado_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `PrestarEquipamento`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, PrestarEquipamentoVariables } from '@dataconnect/generated';
import { usePrestarEquipamento } from '@dataconnect/generated/react'

export default function PrestarEquipamentoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = usePrestarEquipamento();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = usePrestarEquipamento(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePrestarEquipamento(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePrestarEquipamento(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `usePrestarEquipamento` Mutation requires an argument of type `PrestarEquipamentoVariables`:
  const prestarEquipamentoVars: PrestarEquipamentoVariables = {
    companiaPrestadaId: ..., 
    equipamentoId: ..., 
    fechaInicio: ..., 
  };
  mutation.mutate(prestarEquipamentoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ companiaPrestadaId: ..., equipamentoId: ..., fechaInicio: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(prestarEquipamentoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipamentoPrestado_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DevolverEquipamento
You can execute the `DevolverEquipamento` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useDevolverEquipamento(options?: useDataConnectMutationOptions<DevolverEquipamentoData, FirebaseError, DevolverEquipamentoVariables>): UseDataConnectMutationResult<DevolverEquipamentoData, DevolverEquipamentoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDevolverEquipamento(dc: DataConnect, options?: useDataConnectMutationOptions<DevolverEquipamentoData, FirebaseError, DevolverEquipamentoVariables>): UseDataConnectMutationResult<DevolverEquipamentoData, DevolverEquipamentoVariables>;
```

### Variables
The `DevolverEquipamento` Mutation requires an argument of type `DevolverEquipamentoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DevolverEquipamentoVariables {
  id: UUIDString;
  fechaDevolucion: DateString;
}
```
### Return Type
Recall that calling the `DevolverEquipamento` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DevolverEquipamento` Mutation is of type `DevolverEquipamentoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DevolverEquipamentoData {
  equipamentoPrestado_update?: EquipamentoPrestado_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DevolverEquipamento`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DevolverEquipamentoVariables } from '@dataconnect/generated';
import { useDevolverEquipamento } from '@dataconnect/generated/react'

export default function DevolverEquipamentoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDevolverEquipamento();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDevolverEquipamento(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDevolverEquipamento(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDevolverEquipamento(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDevolverEquipamento` Mutation requires an argument of type `DevolverEquipamentoVariables`:
  const devolverEquipamentoVars: DevolverEquipamentoVariables = {
    id: ..., 
    fechaDevolucion: ..., 
  };
  mutation.mutate(devolverEquipamentoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., fechaDevolucion: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(devolverEquipamentoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipamentoPrestado_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarEquipamentoPrestado
You can execute the `EliminarEquipamentoPrestado` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarEquipamentoPrestado(options?: useDataConnectMutationOptions<EliminarEquipamentoPrestadoData, FirebaseError, EliminarEquipamentoPrestadoVariables>): UseDataConnectMutationResult<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarEquipamentoPrestado(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarEquipamentoPrestadoData, FirebaseError, EliminarEquipamentoPrestadoVariables>): UseDataConnectMutationResult<EliminarEquipamentoPrestadoData, EliminarEquipamentoPrestadoVariables>;
```

### Variables
The `EliminarEquipamentoPrestado` Mutation requires an argument of type `EliminarEquipamentoPrestadoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarEquipamentoPrestadoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarEquipamentoPrestado` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarEquipamentoPrestado` Mutation is of type `EliminarEquipamentoPrestadoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarEquipamentoPrestadoData {
  equipamentoPrestado_delete?: EquipamentoPrestado_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarEquipamentoPrestado`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarEquipamentoPrestadoVariables } from '@dataconnect/generated';
import { useEliminarEquipamentoPrestado } from '@dataconnect/generated/react'

export default function EliminarEquipamentoPrestadoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarEquipamentoPrestado();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarEquipamentoPrestado(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarEquipamentoPrestado(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarEquipamentoPrestado(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarEquipamentoPrestado` Mutation requires an argument of type `EliminarEquipamentoPrestadoVariables`:
  const eliminarEquipamentoPrestadoVars: EliminarEquipamentoPrestadoVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarEquipamentoPrestadoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarEquipamentoPrestadoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.equipamentoPrestado_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearMovimientoTesoreria
You can execute the `CrearMovimientoTesoreria` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearMovimientoTesoreria(options?: useDataConnectMutationOptions<CrearMovimientoTesoreriaData, FirebaseError, CrearMovimientoTesoreriaVariables>): UseDataConnectMutationResult<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearMovimientoTesoreria(dc: DataConnect, options?: useDataConnectMutationOptions<CrearMovimientoTesoreriaData, FirebaseError, CrearMovimientoTesoreriaVariables>): UseDataConnectMutationResult<CrearMovimientoTesoreriaData, CrearMovimientoTesoreriaVariables>;
```

### Variables
The `CrearMovimientoTesoreria` Mutation requires an argument of type `CrearMovimientoTesoreriaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CrearMovimientoTesoreria` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearMovimientoTesoreria` Mutation is of type `CrearMovimientoTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearMovimientoTesoreriaData {
  movimientoTesoreria_insert: MovimientoTesoreria_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearMovimientoTesoreria`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearMovimientoTesoreriaVariables } from '@dataconnect/generated';
import { useCrearMovimientoTesoreria } from '@dataconnect/generated/react'

export default function CrearMovimientoTesoreriaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearMovimientoTesoreria();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearMovimientoTesoreria(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearMovimientoTesoreria(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearMovimientoTesoreria(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearMovimientoTesoreria` Mutation requires an argument of type `CrearMovimientoTesoreriaVariables`:
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
  mutation.mutate(crearMovimientoTesoreriaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ tipo: ..., monto: ..., moneda: ..., tasaBCV: ..., fechaTasa: ..., concepto: ..., sedeId: ..., creadoPorId: ..., avioRefId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearMovimientoTesoreriaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.movimientoTesoreria_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AprobarMovimientoTesoreria
You can execute the `AprobarMovimientoTesoreria` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAprobarMovimientoTesoreria(options?: useDataConnectMutationOptions<AprobarMovimientoTesoreriaData, FirebaseError, AprobarMovimientoTesoreriaVariables>): UseDataConnectMutationResult<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAprobarMovimientoTesoreria(dc: DataConnect, options?: useDataConnectMutationOptions<AprobarMovimientoTesoreriaData, FirebaseError, AprobarMovimientoTesoreriaVariables>): UseDataConnectMutationResult<AprobarMovimientoTesoreriaData, AprobarMovimientoTesoreriaVariables>;
```

### Variables
The `AprobarMovimientoTesoreria` Mutation requires an argument of type `AprobarMovimientoTesoreriaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AprobarMovimientoTesoreriaVariables {
  id: UUIDString;
  aprobadoPorId: UUIDString;
}
```
### Return Type
Recall that calling the `AprobarMovimientoTesoreria` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AprobarMovimientoTesoreria` Mutation is of type `AprobarMovimientoTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AprobarMovimientoTesoreriaData {
  movimientoTesoreria_update?: MovimientoTesoreria_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AprobarMovimientoTesoreria`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AprobarMovimientoTesoreriaVariables } from '@dataconnect/generated';
import { useAprobarMovimientoTesoreria } from '@dataconnect/generated/react'

export default function AprobarMovimientoTesoreriaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAprobarMovimientoTesoreria();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAprobarMovimientoTesoreria(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAprobarMovimientoTesoreria(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAprobarMovimientoTesoreria(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAprobarMovimientoTesoreria` Mutation requires an argument of type `AprobarMovimientoTesoreriaVariables`:
  const aprobarMovimientoTesoreriaVars: AprobarMovimientoTesoreriaVariables = {
    id: ..., 
    aprobadoPorId: ..., 
  };
  mutation.mutate(aprobarMovimientoTesoreriaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., aprobadoPorId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(aprobarMovimientoTesoreriaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.movimientoTesoreria_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AnularMovimientoTesoreria
You can execute the `AnularMovimientoTesoreria` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useAnularMovimientoTesoreria(options?: useDataConnectMutationOptions<AnularMovimientoTesoreriaData, FirebaseError, AnularMovimientoTesoreriaVariables>): UseDataConnectMutationResult<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAnularMovimientoTesoreria(dc: DataConnect, options?: useDataConnectMutationOptions<AnularMovimientoTesoreriaData, FirebaseError, AnularMovimientoTesoreriaVariables>): UseDataConnectMutationResult<AnularMovimientoTesoreriaData, AnularMovimientoTesoreriaVariables>;
```

### Variables
The `AnularMovimientoTesoreria` Mutation requires an argument of type `AnularMovimientoTesoreriaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AnularMovimientoTesoreriaVariables {
  id: UUIDString;
  anulaAId: UUIDString;
}
```
### Return Type
Recall that calling the `AnularMovimientoTesoreria` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AnularMovimientoTesoreria` Mutation is of type `AnularMovimientoTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AnularMovimientoTesoreriaData {
  movimientoTesoreria_update?: MovimientoTesoreria_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AnularMovimientoTesoreria`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AnularMovimientoTesoreriaVariables } from '@dataconnect/generated';
import { useAnularMovimientoTesoreria } from '@dataconnect/generated/react'

export default function AnularMovimientoTesoreriaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAnularMovimientoTesoreria();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAnularMovimientoTesoreria(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAnularMovimientoTesoreria(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAnularMovimientoTesoreria(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAnularMovimientoTesoreria` Mutation requires an argument of type `AnularMovimientoTesoreriaVariables`:
  const anularMovimientoTesoreriaVars: AnularMovimientoTesoreriaVariables = {
    id: ..., 
    anulaAId: ..., 
  };
  mutation.mutate(anularMovimientoTesoreriaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., anulaAId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(anularMovimientoTesoreriaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.movimientoTesoreria_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarMovimientoTesoreria
You can execute the `EliminarMovimientoTesoreria` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarMovimientoTesoreria(options?: useDataConnectMutationOptions<EliminarMovimientoTesoreriaData, FirebaseError, EliminarMovimientoTesoreriaVariables>): UseDataConnectMutationResult<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarMovimientoTesoreria(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarMovimientoTesoreriaData, FirebaseError, EliminarMovimientoTesoreriaVariables>): UseDataConnectMutationResult<EliminarMovimientoTesoreriaData, EliminarMovimientoTesoreriaVariables>;
```

### Variables
The `EliminarMovimientoTesoreria` Mutation requires an argument of type `EliminarMovimientoTesoreriaVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarMovimientoTesoreriaVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarMovimientoTesoreria` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarMovimientoTesoreria` Mutation is of type `EliminarMovimientoTesoreriaData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarMovimientoTesoreriaData {
  movimientoTesoreria_delete?: MovimientoTesoreria_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarMovimientoTesoreria`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarMovimientoTesoreriaVariables } from '@dataconnect/generated';
import { useEliminarMovimientoTesoreria } from '@dataconnect/generated/react'

export default function EliminarMovimientoTesoreriaComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarMovimientoTesoreria();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarMovimientoTesoreria(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarMovimientoTesoreria(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarMovimientoTesoreria(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarMovimientoTesoreria` Mutation requires an argument of type `EliminarMovimientoTesoreriaVariables`:
  const eliminarMovimientoTesoreriaVars: EliminarMovimientoTesoreriaVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarMovimientoTesoreriaVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarMovimientoTesoreriaVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.movimientoTesoreria_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CrearFondo
You can execute the `CrearFondo` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useCrearFondo(options?: useDataConnectMutationOptions<CrearFondoData, FirebaseError, CrearFondoVariables>): UseDataConnectMutationResult<CrearFondoData, CrearFondoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCrearFondo(dc: DataConnect, options?: useDataConnectMutationOptions<CrearFondoData, FirebaseError, CrearFondoVariables>): UseDataConnectMutationResult<CrearFondoData, CrearFondoVariables>;
```

### Variables
The `CrearFondo` Mutation requires an argument of type `CrearFondoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CrearFondoVariables {
  sedeId: UUIDString;
  saldo: number;
  moneda: string;
}
```
### Return Type
Recall that calling the `CrearFondo` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CrearFondo` Mutation is of type `CrearFondoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CrearFondoData {
  fondo_insert: Fondo_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CrearFondo`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CrearFondoVariables } from '@dataconnect/generated';
import { useCrearFondo } from '@dataconnect/generated/react'

export default function CrearFondoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCrearFondo();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCrearFondo(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearFondo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCrearFondo(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCrearFondo` Mutation requires an argument of type `CrearFondoVariables`:
  const crearFondoVars: CrearFondoVariables = {
    sedeId: ..., 
    saldo: ..., 
    moneda: ..., 
  };
  mutation.mutate(crearFondoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ sedeId: ..., saldo: ..., moneda: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(crearFondoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.fondo_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ActualizarFondo
You can execute the `ActualizarFondo` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useActualizarFondo(options?: useDataConnectMutationOptions<ActualizarFondoData, FirebaseError, ActualizarFondoVariables>): UseDataConnectMutationResult<ActualizarFondoData, ActualizarFondoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useActualizarFondo(dc: DataConnect, options?: useDataConnectMutationOptions<ActualizarFondoData, FirebaseError, ActualizarFondoVariables>): UseDataConnectMutationResult<ActualizarFondoData, ActualizarFondoVariables>;
```

### Variables
The `ActualizarFondo` Mutation requires an argument of type `ActualizarFondoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ActualizarFondoVariables {
  id: UUIDString;
  saldo: number;
  moneda: string;
}
```
### Return Type
Recall that calling the `ActualizarFondo` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ActualizarFondo` Mutation is of type `ActualizarFondoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ActualizarFondoData {
  fondo_update?: Fondo_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ActualizarFondo`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ActualizarFondoVariables } from '@dataconnect/generated';
import { useActualizarFondo } from '@dataconnect/generated/react'

export default function ActualizarFondoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useActualizarFondo();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useActualizarFondo(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarFondo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useActualizarFondo(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useActualizarFondo` Mutation requires an argument of type `ActualizarFondoVariables`:
  const actualizarFondoVars: ActualizarFondoVariables = {
    id: ..., 
    saldo: ..., 
    moneda: ..., 
  };
  mutation.mutate(actualizarFondoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., saldo: ..., moneda: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(actualizarFondoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.fondo_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## EliminarFondo
You can execute the `EliminarFondo` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect-generated/react/index.d.ts](./index.d.ts)):
```javascript
useEliminarFondo(options?: useDataConnectMutationOptions<EliminarFondoData, FirebaseError, EliminarFondoVariables>): UseDataConnectMutationResult<EliminarFondoData, EliminarFondoVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useEliminarFondo(dc: DataConnect, options?: useDataConnectMutationOptions<EliminarFondoData, FirebaseError, EliminarFondoVariables>): UseDataConnectMutationResult<EliminarFondoData, EliminarFondoVariables>;
```

### Variables
The `EliminarFondo` Mutation requires an argument of type `EliminarFondoVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface EliminarFondoVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `EliminarFondo` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `EliminarFondo` Mutation is of type `EliminarFondoData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface EliminarFondoData {
  fondo_delete?: Fondo_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `EliminarFondo`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, EliminarFondoVariables } from '@dataconnect/generated';
import { useEliminarFondo } from '@dataconnect/generated/react'

export default function EliminarFondoComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useEliminarFondo();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useEliminarFondo(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarFondo(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useEliminarFondo(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useEliminarFondo` Mutation requires an argument of type `EliminarFondoVariables`:
  const eliminarFondoVars: EliminarFondoVariables = {
    id: ..., 
  };
  mutation.mutate(eliminarFondoVars);
  // Variables can be defined inline as well.
  mutation.mutate({ id: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(eliminarFondoVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.fondo_delete);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

