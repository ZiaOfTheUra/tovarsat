# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCrearUsuario, useActualizarMiPerfil, useEliminarUsuario, useCrearSede, useActualizarSede, useEliminarSede, useCrearTipoEquipo, useActualizarTipoEquipo, useEliminarTipoEquipo, useCrearEquipoInventario } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCrearUsuario(crearUsuarioVars);

const { data, isPending, isSuccess, isError, error } = useActualizarMiPerfil(actualizarMiPerfilVars);

const { data, isPending, isSuccess, isError, error } = useEliminarUsuario(eliminarUsuarioVars);

const { data, isPending, isSuccess, isError, error } = useCrearSede(crearSedeVars);

const { data, isPending, isSuccess, isError, error } = useActualizarSede(actualizarSedeVars);

const { data, isPending, isSuccess, isError, error } = useEliminarSede(eliminarSedeVars);

const { data, isPending, isSuccess, isError, error } = useCrearTipoEquipo(crearTipoEquipoVars);

const { data, isPending, isSuccess, isError, error } = useActualizarTipoEquipo(actualizarTipoEquipoVars);

const { data, isPending, isSuccess, isError, error } = useEliminarTipoEquipo(eliminarTipoEquipoVars);

const { data, isPending, isSuccess, isError, error } = useCrearEquipoInventario(crearEquipoInventarioVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { crearUsuario, actualizarMiPerfil, eliminarUsuario, crearSede, actualizarSede, eliminarSede, crearTipoEquipo, actualizarTipoEquipo, eliminarTipoEquipo, crearEquipoInventario } from '@dataconnect/generated';


// Operation CrearUsuario:  For variables, look at type CrearUsuarioVars in ../index.d.ts
const { data } = await CrearUsuario(dataConnect, crearUsuarioVars);

// Operation ActualizarMiPerfil:  For variables, look at type ActualizarMiPerfilVars in ../index.d.ts
const { data } = await ActualizarMiPerfil(dataConnect, actualizarMiPerfilVars);

// Operation EliminarUsuario:  For variables, look at type EliminarUsuarioVars in ../index.d.ts
const { data } = await EliminarUsuario(dataConnect, eliminarUsuarioVars);

// Operation CrearSede:  For variables, look at type CrearSedeVars in ../index.d.ts
const { data } = await CrearSede(dataConnect, crearSedeVars);

// Operation ActualizarSede:  For variables, look at type ActualizarSedeVars in ../index.d.ts
const { data } = await ActualizarSede(dataConnect, actualizarSedeVars);

// Operation EliminarSede:  For variables, look at type EliminarSedeVars in ../index.d.ts
const { data } = await EliminarSede(dataConnect, eliminarSedeVars);

// Operation CrearTipoEquipo:  For variables, look at type CrearTipoEquipoVars in ../index.d.ts
const { data } = await CrearTipoEquipo(dataConnect, crearTipoEquipoVars);

// Operation ActualizarTipoEquipo:  For variables, look at type ActualizarTipoEquipoVars in ../index.d.ts
const { data } = await ActualizarTipoEquipo(dataConnect, actualizarTipoEquipoVars);

// Operation EliminarTipoEquipo:  For variables, look at type EliminarTipoEquipoVars in ../index.d.ts
const { data } = await EliminarTipoEquipo(dataConnect, eliminarTipoEquipoVars);

// Operation CrearEquipoInventario:  For variables, look at type CrearEquipoInventarioVars in ../index.d.ts
const { data } = await CrearEquipoInventario(dataConnect, crearEquipoInventarioVars);


```