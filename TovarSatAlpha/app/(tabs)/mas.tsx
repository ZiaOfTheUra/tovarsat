import { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  FlatList,
  useColorScheme,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { createAuthUser, loginWithEmail } from '@/services/auth';
import { fetchAll, fetchById, addDocument, setDocument, updateDocument, deleteDocument } from '@/services/firestore';
import { COLLECTIONS } from '@/config';
import type { Sede, TipoEquipo, Usuario } from '@/types';

// ───────────────────────────── Constantes ─────────────────────────────

const ROLES_LIST = [
  { value: 'tesoreriaGeneral', label: 'Tesorería General' },
  { value: 'gerenciaLocal', label: 'Gerencia Local' },
  { value: 'almacenista', label: 'Almacenista' },
  { value: 'oficinista', label: 'Oficinista' },
] as const;

// ───────────────────────────── Sección configurable ─────────────────────────────

type SeccionConfig = {
  titulo: string;
  filas: {
    id: string;
    label: string;
    subtitulo?: string;
    onPress: () => void;
  }[];
};

// ───────────────────────────── Componente: Grupo de tarjetas ─────────────────────────────

function GrupoSeccion({ titulo, filas, theme, ...props }: SeccionConfig & { theme: any }) {
  return (
    <ThemedView style={estilos.seccionContenedor}>
      <ThemedText type="defaultSemiBold" style={estilos.seccionTitulo}>
        {titulo}
      </ThemedText>
      <ThemedView style={[estilos.grupoTarjetas, { backgroundColor: theme.sectionBg }]}>
        {filas.map((fila, index) => (
          <TouchableOpacity
            key={fila.id}
            style={[
              estilos.filaTarjeta,
              { backgroundColor: theme.rowBg, borderBottomColor: theme.rowBorder },
              index === 0 && estilos.filaPrimera,
              index === filas.length - 1 && estilos.filaUltima,
            ]}
            onPress={() => {
              console.log('[MasScreen] Presionado:', fila.id);
              fila.onPress();
            }}
            activeOpacity={0.6}
          >
            <ThemedText style={estilos.filaLabel}>{fila.label}</ThemedText>
            {fila.subtitulo && (
              <ThemedText style={estilos.filaSubtitulo}>{fila.subtitulo}</ThemedText>
            )}
            <ThemedText style={estilos.filaChevron}>›</ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

// ───────────────────────────── Pantalla principal ─────────────────────────────

export default function MasScreen() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const theme = {
    modalBg: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
    inputBg: colorScheme === 'dark' ? '#2c2c2e' : '#ffffff',
    inputBorder: colorScheme === 'dark' ? '#3a3a3c' : '#ccc',
    selectBg: colorScheme === 'dark' ? '#2c2c2e' : '#ffffff',
    overlay: colorScheme === 'dark' ? '#000000cc' : '#000000aa',
    optionBg: colorScheme === 'dark' ? '#2c2c2e' : '#f5f5f5',
    sectionBg: colorScheme === 'dark' ? '#2c2c2e' : '#f0f0f0',
    rowBg: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
    rowBorder: colorScheme === 'dark' ? '#3a3a3c' : '#ddd',
  };
  const { hasRole: esGerencia } = useRole(['gerenciaLocal']);

  // Datos
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [tipos, setTipos] = useState<TipoEquipo[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Modales
  const [modalSede, setModalSede] = useState(false);
  const [modalTipo, setModalTipo] = useState(false);
  const [modalListaSedes, setModalListaSedes] = useState(false);
  const [modalListaTipos, setModalListaTipos] = useState(false);
  const [modalListaUsuarios, setModalListaUsuarios] = useState(false);
  const [modalUsuario, setModalUsuario] = useState(false);
  const [editandoUsuarioId, setEditandoUsuarioId] = useState<string | null>(null);

  // Formularios
  const [sedeForm, setSedeForm] = useState({ nombre: '', direccion: '', telefono: '', contacto: '' });
  const [tipoForm, setTipoForm] = useState({ nombreTipo: '', modelo: '', descripcion: '', anchoBanda: '', canales: '', tecnologiaRelevante: '', datosVarios: '' });
  const [usuarioForm, setUsuarioForm] = useState({ nombre: '', email: '', password: '', rol: '', sede: '', activo: true });
  const [adminCredentials, setAdminCredentials] = useState<{ email: string; password: string } | null>(null);
  const [pickerModal, setPickerModal] = useState<'rol' | 'sede' | null>(null);

  // ── Cargar datos ─────────────────────────────────────────

  // Cargar sedes, tipos de equipo y usuarios desde Firestore
  const cargarDatos = useCallback(async () => {
    try {
      console.log('[MasScreen] cargarDatos: iniciando carga...');
      const [sedesData, tiposData, usuariosData] = await Promise.all([
        fetchAll<Sede>(COLLECTIONS.SEDES),
        fetchAll<TipoEquipo>(COLLECTIONS.TIPOS_EQUIPO),
        fetchAll<Usuario>(COLLECTIONS.USUARIOS),
      ]);
      console.log('[MasScreen] cargarDatos: sedes=', sedesData.length, 'tipos=', tiposData.length, 'usuarios=', usuariosData.length);
      setSedes(sedesData);
      setTipos(tiposData);
      setUsuarios(usuariosData);
    } catch (err) {
      console.log('[MasScreen] cargarDatos: ERROR', err);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // ── Crear Sede ───────────────────────────────────────────

  // Crear sede en Firestore (valida nombre y loguea campos)
  const crearSede = async () => {
    if (!sedeForm.nombre.trim()) {
      Alert.alert('Validación', 'El nombre de la sede es obligatorio');
      return;
    }
    try {
      const data: Omit<Sede, 'id'> = {
        nombre: sedeForm.nombre.trim(),
        direccion: sedeForm.direccion.trim(),
        telefono: sedeForm.telefono.trim() || undefined,
        contacto: sedeForm.contacto.trim() || undefined,
      };

      console.log('[MasScreen] crearSede: datos a enviar:');
      Object.entries(data).forEach(([key, val]) => {
        console.log(`[MasScreen]   ${key}:`, val ?? '(undefined)');
      });

      await addDocument<Sede>(COLLECTIONS.SEDES, data);
      console.log('[MasScreen] crearSede: sede CREADA exitosamente');
      Alert.alert('Éxito', 'Sede creada correctamente');
      setModalSede(false);
      setSedeForm({ nombre: '', direccion: '', telefono: '', contacto: '' });
      await cargarDatos();
    } catch (err) {
      console.log('[MasScreen] crearSede: ERROR', err);
      Alert.alert('Error', 'No se pudo crear la sede');
    }
  };

  // ── Crear TipoEquipo ─────────────────────────────────────

  // Crear tipo de equipo en Firestore (valida nombre y modelo únicos)
  const crearTipo = async () => {
    if (!tipoForm.nombreTipo.trim()) {
      Alert.alert('Validación', 'El nombre del tipo es obligatorio');
      return;
    }
    if (!tipoForm.modelo.trim()) {
      Alert.alert('Validación', 'El modelo es obligatorio y debe ser único');
      return;
    }
    try {
      const data: Omit<TipoEquipo, 'id'> = {
        nombreTipo: tipoForm.nombreTipo.trim(),
        modelo: tipoForm.modelo.trim(),
        descripcion: tipoForm.descripcion.trim() || undefined,
        anchoBanda: tipoForm.anchoBanda.trim() || undefined,
        canales: tipoForm.canales ? Number(tipoForm.canales) : undefined,
        tecnologiaRelevante: tipoForm.tecnologiaRelevante.trim() || undefined,
        datosVarios: tipoForm.datosVarios.trim() || undefined,
      };

      console.log('[MasScreen] crearTipo: datos a enviar:');
      Object.entries(data).forEach(([key, val]) => {
        console.log(`[MasScreen]   ${key}:`, val ?? '(undefined)');
      });

      await addDocument<TipoEquipo>(COLLECTIONS.TIPOS_EQUIPO, data);
      console.log('[MasScreen] crearTipo: tipo CREADO exitosamente');
      Alert.alert('Éxito', 'Tipo de equipo creado correctamente');
      setModalTipo(false);
      setTipoForm({ nombreTipo: '', modelo: '', descripcion: '', anchoBanda: '', canales: '', tecnologiaRelevante: '', datosVarios: '' });
      await cargarDatos();
    } catch (err) {
      console.log('[MasScreen] crearTipo: ERROR', err);
      Alert.alert('Error', 'No se pudo crear el tipo de equipo');
    }
  };

  // ── CRUD Usuarios ────────────────────────────────────────

  // Abrir modal de usuario (crear o editar)
  const abrirModalUsuario = (usuarioId?: string) => {
    console.log('[MasScreen] abrirModalUsuario:', usuarioId ? 'editar' : 'crear');

    if (usuarioId) {
      const usuario = usuarios.find((u) => u.id === usuarioId);
      if (usuario) {
        console.log('[MasScreen] abrirModalUsuario: cargando datos de', usuario.nombre);
        setUsuarioForm({
          nombre: usuario.nombre,
          email: usuario.email,
          password: '',
          rol: usuario.rol,
          sede: usuario.sede,
          activo: usuario.activo,
        });
        setEditandoUsuarioId(usuarioId);
      }
    } else {
      console.log('[MasScreen] abrirModalUsuario: modo creación');
      setUsuarioForm({ nombre: '', email: '', password: '', rol: '', sede: '', activo: true });
      setEditandoUsuarioId(null);
    }
    setModalUsuario(true);
  };

  // Guardar usuario (crea o actualiza según el modo)
  const guardarUsuario = async () => {
    console.log('[MasScreen] guardarUsuario: modo=', editandoUsuarioId ? 'editar' : 'crear');

    if (!usuarioForm.nombre.trim() || !usuarioForm.email.trim() || !usuarioForm.rol.trim()) {
      Alert.alert('Validación', 'Nombre, email y rol son obligatorios');
      console.log('[MasScreen] guardarUsuario: VALIDATION fallida - campos vacíos');
      return;
    }

    try {
      const userData = {
        nombre: usuarioForm.nombre.trim(),
        email: usuarioForm.email.trim(),
        rol: usuarioForm.rol,
        sede: usuarioForm.sede,
        activo: usuarioForm.activo,
      };

      console.log('[MasScreen] guardarUsuario: datos a guardar:', userData);

      if (editandoUsuarioId) {
        // Modo edición: solo actualizar Firestore
        await updateDocument(COLLECTIONS.USUARIOS, editandoUsuarioId, userData);
        console.log('[MasScreen] guardarUsuario: usuario ACTUALIZADO id=', editandoUsuarioId);
        Alert.alert('Éxito', 'Usuario actualizado correctamente');
      } else {
        // Modo creación: 1. Firebase Auth primero, 2. luego Firestore con UID de Auth
        if (!usuarioForm.password.trim()) {
          Alert.alert('Validación', 'Debe ingresar una contraseña para el nuevo usuario');
          return;
        }

        // Capturar credenciales de admin antes de cualquier cambio de sesión
        const adminEmail = user?.email || '';
        const adminPassword = adminCredentials?.password || '';

        // Paso 0: Re-autenticar como admin primero (si hay credenciales guardadas)
        if (adminEmail && adminPassword) {
          console.log('[MasScreen] Re-autenticando como admin ANTES de crear usuario...');
          try {
            await loginWithEmail(adminEmail, adminPassword);
            console.log('[MasScreen] Admin re-autenticado correctamente');
          } catch (err) {
            console.log('[MasScreen] Re-autenticación fallida - el admin debe iniciar sesión de nuevo', err);
            Alert.alert(
              'Sesión expirada',
              `Debe volver a iniciar sesión como administrador para crear usuarios.`
            );
            setModalUsuario(false);
            setModalListaUsuarios(false);
            return;
          }
        }

        // Paso 1: Crear usuario en Firebase Auth (inicia sesión como el nuevo usuario)
        console.log('[MasScreen] Creando usuario en Firebase Auth...');
        const newUid = await createAuthUser(usuarioForm.email.trim(), usuarioForm.password);

        // Paso 2: Guardar documento en Firestore usando el UID de Auth como ID
        console.log('[MasScreen] Guardando documento en Firestore con uid:', newUid);
        await setDocument(COLLECTIONS.USUARIOS, newUid, {
          ...userData,
          uid: newUid,
        });

        // Paso 3: Volver a autenticar como admin (si hay credenciales)
        if (adminEmail && adminPassword) {
          try {
            console.log('[MasScreen] Restaurando sesión de admin...');
            await loginWithEmail(adminEmail, adminPassword);
            console.log('[MasScreen] Sesión de admin restaurada correctamente');
          } catch {
            console.log('[MasScreen] No se pudo restaurar la sesión de admin');
            Alert.alert(
              'Usuario creado',
              `Usuario ${usuarioForm.nombre} creado correctamente.\n\nNo se pudo restaurar la sesión de administrador. Por favor, inicie sesión nuevamente.`
            );
          }
        }

        console.log('[MasScreen] Usuario CREADO exitosamente con uid:', newUid);
        Alert.alert('Éxito', 'Usuario creado correctamente');
      }

      setModalUsuario(false);
      setModalListaUsuarios(false);
      await cargarDatos();
    } catch (err) {
      console.log('[MasScreen] guardarUsuario: ERROR', err);
      Alert.alert('Error', 'No se pudo guardar el usuario');
    }
  };

  // Eliminar usuario de Firestore (pide confirmación)
  const eliminarUsuario = async (usuarioId: string) => {
    const usuario = usuarios.find((u) => u.id === usuarioId);
    console.log('[MasScreen] eliminarUsuario: solicitado para', usuario?.nombre ?? usuarioId);

    Alert.alert('Confirmar eliminación', `¿Eliminar usuario "${usuario?.nombre}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteDocument(COLLECTIONS.USUARIOS, usuarioId);
            console.log('[MasScreen] eliminarUsuario: usuario ELIMINADO id=', usuarioId);
            Alert.alert('Éxito', 'Usuario eliminado');
            await cargarDatos();
          } catch (err) {
            console.log('[MasScreen] eliminarUsuario: ERROR', err);
            Alert.alert('Error', 'No se pudo eliminar el usuario');
          }
        },
      },
    ]);
  };

  // ── Secciones ────────────────────────────────────────────

  const secciones: SeccionConfig[] = [];

  if (esGerencia) {
    secciones.push({
      titulo: 'Administración',
      filas: [
        {
          id: 'sedes',
          label: 'Sedes',
          subtitulo: `${sedes.length} registradas`,
          onPress: () => setModalListaSedes(true),
        },
        {
          id: 'tipos',
          label: 'Tipos de Equipo',
          subtitulo: `${tipos.length} registrados`,
          onPress: () => setModalListaTipos(true),
        },
        {
          id: 'usuarios',
          label: 'Gestión de Usuarios',
          subtitulo: `${usuarios.length} registrados`,
          onPress: () => setModalListaUsuarios(true),
        },
      ],
    });
  }

  secciones.push({
    titulo: 'Exportar',
    filas: [
      {
        id: 'exportar-asistencia',
        label: 'Exportar Asistencia',
        subtitulo: 'CSV',
        onPress: () => Alert.alert('Info', 'Usa el botón 📤 CSV en la pantalla de Asistencia'),
      },
      {
        id: 'exportar-inventario',
        label: 'Exportar Inventario',
        subtitulo: 'Próximamente',
        onPress: () => Alert.alert('Info', 'Exportación de inventario próximamente'),
      },
    ],
  });

  secciones.push({
    titulo: 'Reportes',
    filas: [
      {
        id: 'reporte-asistencia',
        label: 'Reporte de Asistencia',
        subtitulo: 'Próximamente',
        onPress: () => Alert.alert('Info', 'Reportes próximamente'),
      },
    ],
  });

  return (
    <ThemedView style={estilos.contenedor}>
      <ThemedText type="title" style={estilos.tituloPagina}>Más</ThemedText>

      <ScrollView contentContainerStyle={estilos.scrollContenido} showsVerticalScrollIndicator={false}>
        {secciones.map((seccion) => (
          <GrupoSeccion key={seccion.titulo} {...seccion} theme={theme} />
        ))}
        <ThemedView style={estilos.espacioInferior} />
      </ScrollView>

      {/* Modal crear Sede */}
      <Modal visible={modalSede} transparent animationType="slide">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ThemedView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">Nueva sede</ThemedText>
            <TextInput style={estilos.input} placeholder="Nombre *" value={sedeForm.nombre} onChangeText={(t) => setSedeForm((f) => ({ ...f, nombre: t }))} placeholderTextColor="#999" />
            <TextInput style={estilos.input} placeholder="Dirección" value={sedeForm.direccion} onChangeText={(t) => setSedeForm((f) => ({ ...f, direccion: t }))} placeholderTextColor="#999" />
            <TextInput style={estilos.input} placeholder="Teléfono" value={sedeForm.telefono} onChangeText={(t) => setSedeForm((f) => ({ ...f, telefono: t }))} placeholderTextColor="#999" keyboardType="phone-pad" />
            <TextInput style={estilos.input} placeholder="Contacto" value={sedeForm.contacto} onChangeText={(t) => setSedeForm((f) => ({ ...f, contacto: t }))} placeholderTextColor="#999" />
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => setModalSede(false)}><ThemedText>Cancelar</ThemedText></TouchableOpacity>
              <TouchableOpacity style={estilos.botonGuardar} onPress={crearSede}><ThemedText style={estilos.textoGuardar}>Guardar</ThemedText></TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>

      {/* Modal crear TipoEquipo */}
      <Modal visible={modalTipo} transparent animationType="slide">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ThemedView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">Nuevo tipo de equipo</ThemedText>
            <TextInput style={estilos.input} placeholder="Nombre del tipo *" value={tipoForm.nombreTipo} onChangeText={(t) => setTipoForm((f) => ({ ...f, nombreTipo: t }))} placeholderTextColor="#999" />
            <TextInput style={estilos.input} placeholder="Modelo (único) *" value={tipoForm.modelo} onChangeText={(t) => setTipoForm((f) => ({ ...f, modelo: t }))} placeholderTextColor="#999" autoCapitalize="none" />
            <TextInput style={estilos.input} placeholder="Descripción" value={tipoForm.descripcion} onChangeText={(t) => setTipoForm((f) => ({ ...f, descripcion: t }))} placeholderTextColor="#999" />
            <TextInput style={estilos.input} placeholder="Ancho de banda" value={tipoForm.anchoBanda} onChangeText={(t) => setTipoForm((f) => ({ ...f, anchoBanda: t }))} placeholderTextColor="#999" />
            <TextInput style={estilos.input} placeholder="Canales" value={tipoForm.canales} onChangeText={(t) => { const soloDigitos = t.replace(/[^0-9]/g, ''); setTipoForm((f) => ({ ...f, canales: soloDigitos })); }} placeholderTextColor="#999" keyboardType="numeric" />
            <TextInput style={estilos.input} placeholder="Datos Varios" value={tipoForm.datosVarios} onChangeText={(t) => setTipoForm((f) => ({ ...f, datosVarios: t }))} placeholderTextColor="#999" />
            <TextInput style={estilos.input} placeholder="Tecnología relevante" value={tipoForm.tecnologiaRelevante} onChangeText={(t) => setTipoForm((f) => ({ ...f, tecnologiaRelevante: t }))} placeholderTextColor="#999" />
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => setModalTipo(false)}><ThemedText>Cancelar</ThemedText></TouchableOpacity>
              <TouchableOpacity style={estilos.botonGuardar} onPress={crearTipo}><ThemedText style={estilos.textoGuardar}>Guardar</ThemedText></TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>

      {/* Modal lista Sedes */}
      <Modal visible={modalListaSedes} transparent animationType="slide">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ThemedView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">Sedes ({sedes.length})</ThemedText>
            {sedes.length === 0 ? (
              <ThemedText style={estilos.textoVacio}>No hay sedes registradas</ThemedText>
            ) : (
              <FlatList
                data={sedes}
                
                keyExtractor={(s) => s.id || ''}
                removeClippedSubviews={false}
                renderItem={({ item }) => (
                  <ThemedView style={estilos.itemLista}>
                    <ThemedText>{item.nombre}</ThemedText>
                    <ThemedText style={estilos.itemSub}>{item.direccion}</ThemedText>
                  </ThemedView>
                )}
                style={estilos.lista}
              />
            )}
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => setModalListaSedes(false)}><ThemedText>Cerrar</ThemedText></TouchableOpacity>
              <TouchableOpacity style={estilos.botonGuardar} onPress={() => { setModalListaSedes(false); setModalSede(true); }}><ThemedText style={estilos.textoGuardar}>+ Nueva</ThemedText></TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>

      {/* Modal lista Tipos */}
      <Modal visible={modalListaTipos} transparent animationType="slide">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ThemedView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">Tipos de Equipo ({tipos.length})</ThemedText>
            {tipos.length === 0 ? (
              <ThemedText style={estilos.textoVacio}>No hay tipos registrados</ThemedText>
            ) : (
              <FlatList
                data={tipos}
                keyExtractor={(t) => t.id || ''}
                removeClippedSubviews={false}
                renderItem={({ item }) => (
                  <ThemedView style={estilos.itemLista}>
                    <ThemedText>{item.nombreTipo}</ThemedText>
                    <ThemedText style={estilos.itemSub}>Modelo: {item.modelo}</ThemedText>
                  </ThemedView>
                )}
                style={estilos.lista}
              />
            )}
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => setModalListaTipos(false)}><ThemedText>Cerrar</ThemedText></TouchableOpacity>
              <TouchableOpacity style={estilos.botonGuardar} onPress={() => { setModalListaTipos(false); setModalTipo(true); }}><ThemedText style={estilos.textoGuardar}>+ Nuevo</ThemedText></TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>

      {/* Modal lista Usuarios */}
      <Modal visible={modalListaUsuarios} transparent animationType="slide">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ThemedView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">Usuarios ({usuarios.length})</ThemedText>
            {usuarios.length === 0 ? (
              <ThemedText style={estilos.textoVacio}>No hay usuarios registrados</ThemedText>
            ) : (
              <FlatList
                data={usuarios}
                removeClippedSubviews={false}
                keyExtractor={(u) => u.id || ''}
                renderItem={({ item }) => (
                  <ThemedView style={estilos.itemLista}>
                    <ThemedText>{item.nombre}</ThemedText>
                    <ThemedText style={estilos.itemSub}>{item.email} · {item.rol} · {item.sede}</ThemedText>
                    <ThemedView style={estilos.filaBotonesModal}>
                      <TouchableOpacity style={estilos.botonCancelar} onPress={() => {
                        console.log('[MasScreen] Editar usuario:', item.id, item.nombre);
                        abrirModalUsuario(item.id || undefined);
                      }}>
                        <ThemedText>Editar</ThemedText>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => eliminarUsuario(item.id!)}>
                        <ThemedText style={estilos.textoEliminar}>Eliminar</ThemedText>
                      </TouchableOpacity>
                    </ThemedView>
                  </ThemedView>
                )}
                style={estilos.lista}
              />
            )}
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => setModalListaUsuarios(false)}><ThemedText>Cerrar</ThemedText></TouchableOpacity>
              <TouchableOpacity style={estilos.botonGuardar} onPress={() => {
                console.log('[MasScreen] Abrir modal: nuevo usuario');
                abrirModalUsuario();
                setModalListaUsuarios(false);
              }}><ThemedText style={estilos.textoGuardar}>+ Nuevo</ThemedText></TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>

      {/* Modal selector rol/sede */}
      <Modal visible={pickerModal !== null} transparent animationType="fade">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ThemedView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">
              {pickerModal === 'rol' ? 'Seleccionar rol' : 'Seleccionar sede'}
            </ThemedText>

            {pickerModal === 'rol' && ROLES_LIST.map((opcion) => (
              <TouchableOpacity
                key={opcion.value}
                style={[estilos.pickerOption, { backgroundColor: theme.optionBg }, usuarioForm.rol === opcion.value && estilos.pickerOptionActive]}
                onPress={() => {
                  console.log('[MasScreen] Rol seleccionado:', opcion.value);
                  setUsuarioForm((f) => ({ ...f, rol: opcion.value }));
                  setPickerModal(null);
                }}
              >
                <ThemedText style={[estilos.pickerOptionText, usuarioForm.rol === opcion.value && estilos.pickerOptionTextActive]}>
                  {opcion.label}
                </ThemedText>
              </TouchableOpacity>
            ))}

            {pickerModal === 'sede' && sedes.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[estilos.pickerOption, { backgroundColor: theme.optionBg }, usuarioForm.sede === s.id && estilos.pickerOptionActive]}
                onPress={() => {
                  console.log('[MasScreen] Sede seleccionada:', s.nombre);
                  setUsuarioForm((f) => ({ ...f, sede: s.id || '' }));
                  setPickerModal(null);
                }}
              >
                <ThemedText style={[estilos.pickerOptionText, usuarioForm.sede === s.id && estilos.pickerOptionTextActive]}>
                  {s.nombre}
                </ThemedText>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={estilos.botonCerrarSelect} onPress={() => setPickerModal(null)}>
              <ThemedText>Cerrar</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>

      {/* Modal crear/editar Usuario */}
      <Modal visible={modalUsuario} transparent animationType="slide">
        <ThemedView style={[estilos.fondoModal, { backgroundColor: theme.overlay }]}>
          <ThemedView style={[estilos.modalContenido, { backgroundColor: theme.modalBg }]}>
            <ThemedText type="defaultSemiBold">{editandoUsuarioId ? 'Editar usuario' : 'Nuevo usuario'}</ThemedText>
            <TextInput style={estilos.input} placeholder="Nombre *" value={usuarioForm.nombre} onChangeText={(t) => setUsuarioForm((f) => ({ ...f, nombre: t }))} placeholderTextColor="#999" />
            <TextInput style={estilos.input} placeholder="Email *" value={usuarioForm.email} onChangeText={(t) => setUsuarioForm((f) => ({ ...f, email: t }))} placeholderTextColor="#999" autoCapitalize="none" keyboardType="email-address" />
            {!editandoUsuarioId && (
              <TextInput style={estilos.input} placeholder="Contraseña *" value={usuarioForm.password} onChangeText={(t) => setUsuarioForm((f) => ({ ...f, password: t }))} placeholderTextColor="#999" autoCapitalize="none" secureTextEntry />
            )}
            <TouchableOpacity
              style={[estilos.selectTrigger, { backgroundColor: theme.selectBg, borderColor: theme.inputBorder }]}
              onPress={() => setPickerModal('rol')}
            >
              <ThemedText style={estilos.selectTexto}>
                {usuarioForm.rol ? ROLES_LIST.find((r) => r.value === usuarioForm.rol)?.label || usuarioForm.rol : 'Seleccionar rol *'}
              </ThemedText>
              <ThemedText style={estilos.selectFlecha}>▼</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[estilos.selectTrigger, { backgroundColor: theme.selectBg, borderColor: theme.inputBorder }]}
              onPress={() => setPickerModal('sede')}
            >
              <ThemedText style={estilos.selectTexto}>
                {sedes.find((s) => s.id === usuarioForm.sede)?.nombre || 'Seleccionar sede'}
              </ThemedText>
              <ThemedText style={estilos.selectFlecha}>▼</ThemedText>
            </TouchableOpacity>
            {!editandoUsuarioId && (
              <TextInput style={estilos.input} placeholder="Contraseña del administrador *" value={adminCredentials?.password || ''} onChangeText={(t) => setAdminCredentials((prev) => ({ email: user?.email || '', password: t }))} placeholderTextColor="#999" autoCapitalize="none" secureTextEntry />
            )}
            <ThemedView style={estilos.filaBotonesModal}>
              <TouchableOpacity style={estilos.botonCancelar} onPress={() => {
                console.log('[MasScreen] Modal usuario cancelado');
                setModalUsuario(false);
              }}><ThemedText>Cancelar</ThemedText></TouchableOpacity>
              <TouchableOpacity style={estilos.botonGuardar} onPress={guardarUsuario}><ThemedText style={estilos.textoGuardar}>Guardar</ThemedText></TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

// ───────────────────────────── Estilos ─────────────────────────────

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    paddingTop: '8%',
  },
  tituloPagina: {
    marginBottom: 16,
  },
  scrollContenido: {
    gap: 24,
  },
  espacioInferior: {
    height: 40,
  },
  seccionContenedor: {
    gap: 8,
  },
  seccionTitulo: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.6,
    marginLeft: 4,
  },
  grupoTarjetas: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  filaTarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  filaPrimera: {},
  filaUltima: {
    borderBottomWidth: 0,
  },
  filaLabel: {
    flex: 1,
    fontSize: 16,
  },
  filaSubtitulo: {
    fontSize: 14,
    opacity: 0.5,
    marginRight: 8,
  },
  filaChevron: {
    fontSize: 20,
    opacity: 0.3,
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContenido: {
    borderRadius: 10,
    padding: 20,
    gap: 12,
    maxHeight: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  filaBotonesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  botonGuardar: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  textoGuardar: {
    fontWeight: '700',
  },
  botonCancelar: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
  textoCancelar: {
    fontWeight: '700',
  },
  lista: {
    maxHeight: 300,
  },
  itemLista: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    gap: 2,
  },
  itemSub: {
    fontSize: 13,
    opacity: 0.6,
  },
  textoVacio: {
    opacity: 0.5,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  textoEditar: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 13,
  },
  textoEliminar: {
    color: '#C62828',
    fontWeight: '600',
    fontSize: 13,
  },
  botonCerrarSelect: {
    marginTop: 8,
    padding: 10,
    alignItems: 'center',
  },
  selectTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  selectTexto: {
    fontSize: 15,
  },
  selectFlecha: {
    fontSize: 12,
    opacity: 0.5,
  },
  pickerOption: {
    padding: 12,
    borderRadius: 6,
  },
  pickerOptionActive: {
    backgroundColor: '#007AFF',
  },
  pickerOptionText: {
    fontSize: 15,
  },
  pickerOptionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});