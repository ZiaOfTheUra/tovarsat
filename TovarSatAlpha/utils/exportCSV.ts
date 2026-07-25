// Genera CSV con BOM UTF-8 y lo comparte
export async function exportarCSV(
  nombreArchivo: string,
  encabezados: string[],
  filas: (string | number | undefined | null)[][]
): Promise<void> {
  console.log(`[exportCSV] Iniciando exportación: ${nombreArchivo}`);
  console.log(`[exportCSV] Encabezados:`, encabezados);
  console.log(`[exportCSV] Total filas: ${filas.length}`);

  try {
    // Construir CSV con BOM UTF-8 para que Excel lo abra correctamente
    const encabezadoCSV = '\uFEFF' + encabezados.join(';') + '\n';
    const filasCSV = filas
      .map((fila) => fila.map((campo) => campo ?? '').join(';'))
      .join('\n');

    const contenidoCSV = encabezadoCSV + filasCSV;

    console.log(`[exportCSV] CSV generado, longitud: ${contenidoCSV.length} caracteres`);

    // Guardar archivo
    const expoFS = await import('expo-file-system/legacy');
    const { writeAsStringAsync } = expoFS;
    const FileSystem = expoFS.default;
    const fileUri = `${FileSystem.documentDirectory}${nombreArchivo}`;
    await writeAsStringAsync(fileUri, contenidoCSV, { encoding: 'utf8' });

    console.log(`[exportCSV] Archivo guardado en: ${fileUri}`);

    // Compartir archivo
    const expoSharing = await import('expo-sharing');
    await expoSharing.default.shareAsync(fileUri, {
      mimeType: 'text/csv',
      dialogTitle: `Exportar ${nombreArchivo}`,
    });

    console.log(`[exportCSV] Compartido exitosamente`);
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : String(error);
    console.log(`[exportCSV] ERROR: ${mensaje}`);
    throw new Error(`No se pudo exportar el CSV: ${mensaje}`);
  }
}