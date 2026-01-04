import type { JoinFormErrors, JoinFormValues } from "./joinRequestTypes";
import { isValidIban, normalizeIban } from "./iban";

export const syncHolderFromPlayer = (
  values: JoinFormValues
): JoinFormValues => {
  if (!values.titularMismoQueJugador) return values;
  return {
    ...values,
    titularNombre: `${values.nombre} ${values.apellidos}`.trim(),
    titularEmail: values.email,
    titularDireccion: values.direccion,
    titularCodigoPostal: values.codigoPostal,
    titularLocalizacion: values.localizacion
  };
};

export const validateJoinRequest = (form: JoinFormValues): JoinFormErrors => {
  const nextErrors: JoinFormErrors = {};
  const emailPattern = /\S+@\S+\.\S+/;
  const phoneDigits = form.telefono.replace(/\D/g, "");

  if (!form.nombre.trim()) nextErrors.nombre = "El nombre es obligatorio.";
  if (!form.apellidos.trim()) {
    nextErrors.apellidos = "Los apellidos son obligatorios.";
  }
  if (phoneDigits.length < 7) {
    nextErrors.telefono = "Introduce un teléfono válido.";
  }
  if (!emailPattern.test(form.email)) {
    nextErrors.email = "Introduce un email válido (ej. ejemplo@dominio.com).";
  }
  if (!form.dni.trim()) nextErrors.dni = "El DNI es obligatorio.";
  if (!form.nacimiento) nextErrors.nacimiento = "La fecha es obligatoria.";
  if (!form.importe) nextErrors.importe = "Selecciona un importe.";
  if (form.titularMismoQueJugador) {
    if (!form.direccion.trim()) {
      nextErrors.direccion = "La dirección es obligatoria.";
    }
  } else {
    if (!form.titularNombre.trim()) {
      nextErrors.titularNombre = "El nombre del titular es obligatorio.";
    }
    if (!emailPattern.test(form.titularEmail)) {
      nextErrors.titularEmail = "Introduce un email válido del titular.";
    }
    if (!form.titularDireccion.trim()) {
      nextErrors.titularDireccion = "La dirección del titular es obligatoria.";
    }
    if (!form.titularCodigoPostal.trim()) {
      nextErrors.titularCodigoPostal =
        "El código postal del titular es obligatorio.";
    }
    if (!form.titularLocalizacion.trim()) {
      nextErrors.titularLocalizacion =
        "La localidad del titular es obligatoria.";
    }
  }
  const ibanClean = normalizeIban(form.iban);
  if (!ibanClean) {
    nextErrors.iban = "El IBAN es obligatorio.";
  } else if (!isValidIban(ibanClean)) {
    nextErrors.iban = "Introduce un IBAN válido.";
  }
  if (!form.acceptSepaMandate) {
    nextErrors.acceptSepaMandate = "Debes aceptar el mandato SEPA.";
  }
  if (!form.signatureDataUrl) {
    nextErrors.signatureDataUrl = "La firma es obligatoria.";
  }
  if (!form.acceptPrivacy) {
    nextErrors.acceptPrivacy =
      "Debes aceptar la política de privacidad y el aviso legal.";
  }

  return nextErrors;
};
