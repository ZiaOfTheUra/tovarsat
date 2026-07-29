import {onCall as onCallV1, HttpsError} from "firebase-functions/v1/https";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";

admin.initializeApp();

export const crearUsuario = onCallV1(async (data: unknown, context: any) => {
  try {
    if (!context.auth) {
      throw new HttpsError("unauthenticated", "Usuario no autenticado");
    }

    const callerId = context.auth.uid;
    const callerDoc = await admin
      .firestore()
      .collection("usuarios")
      .doc(callerId)
      .get();

    const callerData = callerDoc.data();

    if (!callerData || callerData.rol !== "gerenciaLocal") {
    logger.error(
      "Intento de crear usuario desde rol no autorizado",
      { uid: callerId, rol: callerData?.rol }
    );
      throw new HttpsError(
        "permission-denied",
        "Permisos insuficientes: se requiere rol gerenciaLocal"
      );
    }

    const {
      nombre,
      email,
      password,
      rol,
      sedeId,
      activo,
    } = data as {
      nombre: string;
      email: string;
      password: string;
      rol: string;
      sedeId: string;
      activo?: boolean;
    };

    if (!nombre || !email || !password || !rol || !sedeId) {
      throw new HttpsError(
        "invalid-argument",
        "Faltan campos requeridos: nombre, email, password, rol, sedeId"
      );
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: nombre,
      disabled: !activo,
    });

    await admin
      .firestore()
      .collection("usuarios")
      .doc(userRecord.uid)
      .set({
        nombre,
        email,
        rol,
        sede: sedeId,
        activo: activo !== false,
      });

    logger.info("Usuario creado exitosamente", {
      uid: userRecord.uid,
      email,
      rol,
    });

    return {
      success: true,
      uid: userRecord.uid,
      email,
      message: "Usuario creado correctamente",
    };
  } catch (error: any) {
    logger.error("Error al crear usuario", {error: error.message});
    throw new HttpsError("internal", error.message || "Error al crear usuario");
  }
});

export const editarUsuario = onCallV1(async (data: unknown, context: any) => {
  try {
    if (!context.auth) {
      throw new HttpsError("unauthenticated", "Usuario no autenticado");
    }

    const callerId = context.auth.uid;
    const callerDoc = await admin
      .firestore()
      .collection("usuarios")
      .doc(callerId)
      .get();

    const callerData = callerDoc.data();

    if (!callerData || callerData.rol !== "gerenciaLocal") {
      throw new HttpsError("permission-denied", "Permisos insuficientes");
    }

    const {
      uid,
      nombre,
      email,
      rol,
      sedeId,
      activo,
    } = data as {
      uid: string;
      nombre?: string;
      email?: string;
      rol?: string;
      sedeId?: string;
      activo?: boolean;
    };

    if (!uid) {
      throw new HttpsError("invalid-argument", "Falta el UID del usuario");
    }

    const updateData: Record<string, any> = {};
    if (nombre !== undefined) updateData.nombre = nombre;
    if (email !== undefined) updateData.email = email;
    if (rol !== undefined) updateData.rol = rol;
    if (sedeId !== undefined) updateData.sede = sedeId;
    if (activo !== undefined) updateData.activo = activo;

    await admin
      .firestore()
      .collection("usuarios")
      .doc(uid)
      .update(updateData);

    return { success: true, message: "Usuario actualizado correctamente" };
  } catch (error: any) {
    throw new HttpsError(
      "internal",
      error.message || "Error al editar usuario"
    );
  }
});

export const eliminarUsuario = onCallV1(async (data: unknown, context: any) => {
  try {
    if (!context.auth) {
      throw new HttpsError("unauthenticated", "Usuario no autenticado");
    }

    const callerId = context.auth.uid;
    const callerDoc = await admin
      .firestore()
      .collection("usuarios")
      .doc(callerId)
      .get();

    const callerData = callerDoc.data();

    if (!callerData || callerData.rol !== "gerenciaLocal") {
      throw new HttpsError("permission-denied", "Permisos insuficientes");
    }

    const { uid } = data as { uid: string };

    if (!uid) {
      throw new HttpsError("invalid-argument", "Falta el UID del usuario");
    }

    await admin.auth().deleteUser(uid);
    await admin.firestore().collection("usuarios").doc(uid).delete();

    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error: any) {
    throw new HttpsError(
      "internal",
      error.message || "Error al eliminar usuario"
    );
  }
});
