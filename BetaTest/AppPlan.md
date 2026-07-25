1) Eliminar tesoreria, y la tabla de Movimientos Tesoreria.
2) Rehacer la asistencia con un modulo que utilice biometría, marcado de asistencias tardías, calcular el tiempo trabajado. Tratar como sea posible de utilizar la biometria del telefono para identificacion.
3) Reescribir todo (utiilizar ayuda para el frontend y parte visual, hacer las funciones a pata)
- Generar exportaciones
4) Cambiar el titulo de proyecto aprobado (Preguntar a Meri)
4) Cambiar planteamiento del problema (Preguntar a Meri)
5) Preguntarle a Meri los diagramas UML como van
6) Terminar los Cap


Base de datos mongodb deseada:

usuarios/{uid}            { nombre, email, rol: tesoreriaGeneral|gerenciaLocal|almacenista|oficinista, sede, activo }
asistencias/{id}          { usuario{usuarioID}, fechaEntrada, fechaSalida, horas, metodoMarcaje }
inventario/{id}           { cantidad, sede{sedeID}, estado (bool), creadoPor, modelos{modeloID}}
modelos/{id}               { codigomodelo (unico), descripcion, tecnologias, marca, nombreIdentificador}
movimientoInventario/{id} { sedeOrigen{sedeID}, sedeDestino{sedeID}, itemUID, activoRef, responsable, creadoPor, creadoEn }
sedes                     { email, direccion(unico), nombre(unico), telefono}



```


Funciones que se necesitan:

Crear Asistencia
    Entradas: Un UserID, de aqui en adelante referido como UID; una hora de entrada.
    Seguridad: El UID se saca automaticamente. Se verifica que no haya asistencia anterior. Se verifica utilizando biometria de alguna forma que el usuario sea correcto.
    Proceso: Se asigna automáticamente la hora de salida relevante (11:50am para las mañanas, 5:00pm para las tardes), se calculan las horas trabajadas, se asigna un valor booleano a entrada taría.
    Salidas: Una entrada a la colección de usuarios en el firestore.

Crear Modelo: 
    Entrada: Un codigo de modelo (string, unico), una descripción breve (string), una descripción de las tecnologías relevantes (string), una Marca, un nombre identificador (string)
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. Se verifica que no exista un numero de modelo igual, se pide autenticación biométrica.
    Proceso: Se recopila la información, se toma el UID del usuario que lo implementó, y se añade como usuario creador.
    Salida: Una entrada a la colección de Modelos en el Firestore.

Crear Inventario: 
    Entrada: Una cantidad de equipamento, una sede (elegida de la base de datos).
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. Se pide autenticación biométrica. Se Verifica que no exista un inventario del item en la sede anteriormente.
    Proceso: El usuario debe elegir de la lista de Modelos preexistentes para añadir al sistema. Luego, se toma la UID del usuario que está implementando, y se añade como usuario creador. Si inventario >0, se checkea un booleano de disponible como true. Falso si ==0. 
    Salida: Una entrada a la colección de Inventario en el Firestore.

Asignar Movimiento de Inventario:
    Entrada: Una cantidad de equipamento, una sede de origen, una sede de destino.
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista. Se pide autenticación biométrica. 
    Proceso: El usuario debe elegir de la lista de inventario preexistentes. El sistema debe calcular automáticamente si la salida se puede cubrir por la cantidad de inventario disponible en la sede. El sistema debe decidir si crear una nueva colección de inventario programáticamente para la nueva sede, o actualizar una preexistente.

Crear Usuario: 
    Entrada: Un nombre (Unico), un email (unico), un rol (obligatorio, elegido de la base de datos), actividad (booleano), una sede (elegida de la base de datos), una contraseña.
    Seguridad: Se tiene que crear una cuenta de Servicio para esto, y logearse con la cuenta de servicio. Esta cuenta de servicio idealmente cuenta con verificación biométrica añadida. Se pide autenticación biométrica al momento de realizar la operación como tal. Se pide la contraseña del admin.
    Proceso: 
        Debido a como funciona el Firebase Auth que utilizamos, y el Firestore como función para los roles, se tiene que utilizar la función de Firebase createUser({email,emailVerified,phoneNumber,password,displayName,photoURL,disabled=false}). 
            - Crear un nuevo elemento en 
            - Crear un nuevo usuario en Firebase Auth.
    Salida: un nuevo usuario en Firebase Auth. Una nueva entrada en la colección de usuarios, con el mismo UID que el usuario recién creado, y su rol apropiado. 

Exportar Inventario:
    Entrada: Toda la colección de inventario.
    Seguridad: Se verifica que el usuario sea user.rol==Almacenista o user.rol==GerenciaLocal. Se pide autenticación biométrica. 
    Proceso: Dependiendo del tipo de exportación, se hace un sort por modelos, por cantidad, o se filtra por cada elemento en el inventario con una cantidad total menor a un numero dado por el usuario.
    Salida: un archivo tipo .xls

Exportar Asistencia:
    Entrada: Toda la colección de asistencia.
    Seguridad: Se verifica que el usuario sea user.rol==Oficinista o user.rol==GerenciaLocal. Se pide autenticación biométrica. 
    Proceso: Dependiendo del tipo de exportación, se hace un sort por nombre, por rol, por cantidad de entradas tardías, o por horas asistidas
    Salida: un archivo tipo .xls

Exportar Usuarios:
    Entrada: Toda la colección de usuarios.
    Seguridad: Se verifica que el usuario sea user.rol==GerenciaLocal o el Service User. Se pide autenticación biométrica. 
    Proceso: Dependiendo del tipo de exportación, se hace un sort por nombre o por rol.
    Salida: un archivo tipo .xls

Exportar Movimientos:
    Entrada: Toda la colección de movimientosInventario.
    Seguridad: Se verifica que el usuario sea user.rol==GerenciaLocal o el Service User. Se pide autenticación biométrica. 
    Proceso: Dependiendo del tipo de exportación, se hace un sort por modelos, por cantidad, por sede, o se filtra por sede.
    Salida: un archivo tipo .xls

Funciones que se van a utilizar mucho, aprenderselas:

Lectura:
    getCollection(collectionName, filters?, orderBy?, limit?) - Obtener lista con filtros y ordenamiento
    getDocument(collectionName, docId) - Obtener documento individual
    getDocumentWhere(field, operator, value)` - Buscar por campo específico
    getDocumentsPaginated(collectionName, pageSize, lastDoc?)` - Paginación
    subscribeToCollection(collectionName, callback)` - Tiempo real (onSnapshot)
    getAggregatedData(collectionName, aggregations)` - Contar, sumar, promediar

Escritura:

    createDocument(collectionName, data) - Crear con ID automático
    updateDocument(collectionName, docId, data)` - Actualizar parcial
    deleteDocument(collectionName, docId)` - Eliminar
    batchWrite(operations)` - Operaciones en lote (transacciones)
    upsertDocument(collectionName, docId, data)` - Crear o actualizar

Validación:

    validateUniqueFields(collectionName, fields, excludeId?)` - Verificar unicidad
    OJO, como no se va a utilizar Firebase Auth para esto como es super cansino, se va a verificar comparando el rol del usuario vs la db de firestore
    POR ENDE HAY QUE GENERAR UNA FUNCIÓN DE VERIFICACIÓN DE USUARIO.

Biometría: 
    Hay que descargar un modulo npm de biometria

Excel:
    Hay que descargar un modulo npm de excel