import { useState, useEffect, useRef } from 'react'
import { ScrollView, View, Text, Pressable, Alert } from 'react-native'
import { useTheme } from '@/theme/useTheme'
import { screenStyles } from '@/theme/screenStyles'
import { BarraSuperior } from '@/components/BarraSuperior'
import { TarjetaInventario } from '@/components/TarjetaInventario'
import { MaterialIcons } from '@expo/vector-icons'
import { ModalFormulario, type CampoFormulario } from '@/components/ModalFormulario'
import { crearUsuario, editarUsuario, eliminarUsuario, obtenerUsuarios, obtenerRoles, obtenerSedesRegistro, type Usuario, type Rol, type Sede } from '@/funciones/funcionesRegistro'
import * as serviceAuth from '@/services/auth'

export default function RegistrarScreen() {
  const theme = useTheme()
  const [cargando, setCargando] = useState(false)
  const [esGerencia, setEsGerencia] = useState(false)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [modal, setModal] = useState(false)

  // opciones guarda roles y sedes tal cual vienen de la db, sin mapear todavia
  const [opciones, setOpciones] = useState<{ roles: Rol[]; sedes: Sede[] }>({ roles: [], sedes: [] })

  // editando es un ref, no un estado, porque no necesitamos que la pantalla se re-renderice cuando cambia
  // solo lo usamos para saber si estamos creando o editando, y para tener el uid del usuario a editar
  const editando = useRef<string | null>(null)

  // form tiene todos los campos del formulario, en vez de tener 7 useState separados
  // setter(k) devuelve una funcion que actualiza solo la clave k del objeto form
  // ej: setter('nombre') devuelve (v) => setForm(p => ({ ...p, nombre: v }))
  const [form, setForm] = useState({ nombre: '', email: '', password: '', adminPass: '', rol: '', sede: '', activo: true })
  const setter = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }))

  // Limpia el formulario y resetea el modo edicion
  const limpiar = () => {
    setForm({ nombre: '', email: '', password: '', adminPass: '', rol: '', sede: '', activo: true })
    editando.current = null
  }

  // Abre el modal en modo creacion
  const abrirNuevo = () => { limpiar(); setModal(true) }

  // Abre el modal en modo edicion, cargando los datos del usuario seleccionado
  const abrirEditar = (u: Usuario) => {
    editando.current = u.id
    setForm({ nombre: u.nombre, email: u.email, password: '', adminPass: '', rol: u.rol, sede: u.sede, activo: u.activo })
    setModal(true)
  }

  // Guarda o actualiza el usuario dependiendo de si estamos en modo edicion o creacion
  const guardar = async () => {
    if (!form.nombre || !form.email || !form.rol || !form.sede) {
      Alert.alert('Error', 'Nombre, Email, Rol y Sede son requeridos')
      return
    }
    setCargando(true)
    try {
      if (editando.current) {
        // Modo edicion: solo actualizamos Firestore, no tocamos Auth
        await editarUsuario(editando.current, { nombre: form.nombre, email: form.email, rol: form.rol, sedeId: form.sede, activo: form.activo })
        Alert.alert('Éxito', 'Usuario actualizado')
      } else {
        // Modo creacion: necesitamos contraseña del nuevo usuario y del admin
        if (!form.password) { Alert.alert('Error', 'Contraseña requerida'); return }
        if (!form.adminPass) { Alert.alert('Error', 'Tu contraseña de admin requerida'); return }
        await crearUsuario({ nombre: form.nombre, email: form.email, password: form.password, rol: form.rol, sedeId: form.sede, activo: form.activo }, form.adminPass)
        Alert.alert('Éxito', 'Usuario creado')
      }
      setModal(false)
      limpiar()
      cargarUsuarios()
    } catch (e: any) { Alert.alert('Error', e.message) }
    finally { setCargando(false) }
  }

  // Pide confirmacion antes de eliminar
  const eliminar = (u: Usuario) => {
    Alert.alert('Confirmar', `¿Eliminar ${u.nombre}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
        setCargando(true)
        try { await eliminarUsuario(u.id); Alert.alert('Éxito', 'Eliminado'); cargarUsuarios() }
        catch (e: any) { Alert.alert('Error', e.message) }
        finally { setCargando(false) }
      }},
    ])
  }

  // Trae la lista de usuarios desde Firestore
  const cargarUsuarios = async () => {
    try { setUsuarios(await obtenerUsuarios()) }
    catch (e) { console.error(e) }
  }

  // Trae roles y sedes para llenar los selectores del modal
  const cargarOpciones = async () => {
    try {
      const [roles, sedes] = await Promise.all([obtenerRoles(), obtenerSedesRegistro()])
      setOpciones({ roles, sedes })
    } catch (e) { console.error(e) }
  }

  // Al montar la pantalla, verificamos si el usuario es gerenciaLocal
  useEffect(() => { serviceAuth.verificarRolUsuario('gerenciaLocal').then(setEsGerencia) }, [])
  // Si es gerencia, cargamos la lista de usuarios
  useEffect(() => { if (esGerencia) cargarUsuarios() }, [esGerencia])
  // Cada vez que se abre el modal, cargamos roles y sedes frescos
  useEffect(() => { if (modal) cargarOpciones() }, [modal])

  // Construimos los campos del formulario para el modal
  // opciones.roles.map(...) convierte los roles crudos al formato que espera ModalFormulario
  const campos: CampoFormulario[] = [
    { label: 'Nombre *', value: form.nombre, onChangeText: setter('nombre'), placeholder: 'Ej: Juan Pérez' },
    { label: 'Email *', value: form.email, onChangeText: setter('email'), placeholder: 'juan@empresa.com', autoCapitalize: 'none' },
    { label: 'Contraseña', value: form.password, onChangeText: setter('password'), placeholder: editando.current ? 'Dejar vacío' : '••••••', autoCapitalize: 'none' },
    { label: 'Rol *', value: form.rol, onChangeText: setter('rol'), placeholder: 'Seleccionar...', opciones: opciones.roles.map(r => ({ label: r.nombre, value: r.id })) },
    { label: 'Sede *', value: form.sede, onChangeText: setter('sede'), placeholder: 'Seleccionar...', opciones: opciones.sedes.map(s => ({ label: `${s.nombre} - ${s.direccion}`, value: s.id })) },
    { label: 'Activo', value: form.activo ? 'true' : 'false', onChangeText: v => setForm(p => ({ ...p, activo: v === 'true' })), placeholder: '' },
  ]
  // Si estamos creando (no editando), pedimos la contraseña del admin para restaurar sesion
  if (!editando.current) {
    campos.push({ label: 'Tu Contraseña (Admin) *', value: form.adminPass, onChangeText: setter('adminPass'), placeholder: '••••••', autoCapitalize: 'none' })
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <BarraSuperior title="TovarSAT" />
      <ScrollView contentContainerStyle={screenStyles.contenidoDesplazamiento} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 12 }}>
          <View style={screenStyles.encabezadoActividad}>
            <Text style={[screenStyles.tituloSeccion, { color: theme.onSurface }]}>Registro de Usuarios</Text>
            <Text style={[screenStyles.subtitulo, { color: theme.onSurfaceVariant }]}>Gestiona los usuarios del sistema.</Text>
          </View>

          {esGerencia && (
            <View style={screenStyles.accionesRapidas}>
              <Pressable style={[screenStyles.botonAccion, { backgroundColor: theme.primary }]} onPress={abrirNuevo}>
                <MaterialIcons name="person-add" size={20} color={theme.onPrimary} />
                <Text style={[screenStyles.etiquetaAccion, { color: theme.onPrimary }]}>Nuevo Usuario</Text>
              </Pressable>
            </View>
          )}

          {!esGerencia && (
            <View style={{ padding: 16, backgroundColor: theme.surfaceContainerLow, borderRadius: 12 }}>
              <Text style={{ color: theme.onSurfaceVariant, textAlign: 'center' }}>No tienes permisos. Contacta a Gerencia Local.</Text>
            </View>
          )}

          {esGerencia && usuarios.map(u => (
            <TarjetaInventario
              key={u.id} name={u.nombre} sku={u.email}
              quantity={u.rol === 'gerenciaLocal' ? 1 : u.rol === 'almacenista' ? 2 : 3}
              location={u.sede} stockPercentage={u.activo ? 100 : 0} isLowStock={!u.activo}
              onPress={() => abrirEditar(u)}
            />
          ))}
        </View>
      </ScrollView>

      <ModalFormulario
        visible={modal}
        titulo={editando.current ? 'Editar Usuario' : 'Nuevo Usuario'}
        campos={campos} cargando={cargando}
        textoBotonConfirmar={editando.current ? 'Guardar Cambios' : 'Crear Usuario'}
        textoBotonCancelar="Cancelar"
        onConfirm={guardar}
        onCancel={() => { setModal(false); limpiar() }}
      />
    </View>
  )
}