export function handleSubmitRegistration(data: { fullName: string; idNumber: string; email: string; assistanceType: string }) {
  console.log('Enviando registro:', data)
}

export function handleAssistanceTypeChange(value: string) {
  console.log('Tipo de asistencia cambiado:', value)
}