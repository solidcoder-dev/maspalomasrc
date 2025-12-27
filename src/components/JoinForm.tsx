import { useState, type FormEvent, type ReactNode } from "react";
import type { JoinFormHandlers, JoinFormValues } from "./join-form.types";

const initialValues: JoinFormValues = {
  nombre: "",
  apellidos: "",
  telefono: "",
  email: "",
  dni: "",
  nacimiento: "",
  direccion: "",
  codigoPostal: "",
  localizacion: "",
  importe: "",
  titularMismoQueJugador: true,
  titularNombre: "",
  titularEmail: "",
  titularDireccion: "",
  titularCodigoPostal: "",
  titularLocalizacion: "",
  iban: "",
  acceptSepaMandate: false,
  justificante: null,
  acceptPrivacy: false
};

type JoinFormProps = {
  children: (handlers: JoinFormHandlers) => ReactNode;
};

function JoinForm({ children }: JoinFormProps) {
  const [values, setValues] = useState<JoinFormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof JoinFormValues, string>>
  >({});

  const handleChange = (field: keyof JoinFormValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value } as JoinFormValues;
      if (next.titularMismoQueJugador) {
        next.titularNombre = `${next.nombre} ${next.apellidos}`.trim();
        next.titularEmail = next.email;
        next.titularDireccion = next.direccion;
        next.titularCodigoPostal = next.codigoPostal;
        next.titularLocalizacion = next.localizacion;
      }
      setErrors(validate(next));
      return next;
    });
  };

  const handleFileChange = (file: File | null) => {
    setValues((prev) => {
      const next = { ...prev, justificante: file };
      setErrors(validate(next));
      return next;
    });
  };

  const handleToggleChange = (field: keyof JoinFormValues, checked: boolean) => {
    setValues((prev) => {
      const next = { ...prev, [field]: checked } as JoinFormValues;
      if (field === "titularMismoQueJugador" && checked) {
        next.titularNombre = `${next.nombre} ${next.apellidos}`.trim();
        next.titularEmail = next.email;
        next.titularDireccion = next.direccion;
        next.titularCodigoPostal = next.codigoPostal;
        next.titularLocalizacion = next.localizacion;
      }
      setErrors(validate(next));
      return next;
    });
  };

  const validate = (form: JoinFormValues) => {
    const nextErrors: Partial<Record<keyof JoinFormValues, string>> = {};
    const emailPattern = /\S+@\S+\.\S+/;
    const phoneDigits = form.telefono.replace(/\D/g, "");
    const normalizeIban = (value: string) => value.replace(/\s+/g, "").toUpperCase();
    const isValidIban = (value: string) => {
      const iban = normalizeIban(value);
      if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false;
      const rearranged = `${iban.slice(4)}${iban.slice(0, 4)}`;
      let remainder = 0;
      for (const char of rearranged) {
        const digit = char >= "A" && char <= "Z"
          ? (char.charCodeAt(0) - 55).toString()
          : char;
        for (const digitChar of digit) {
          remainder = (remainder * 10 + Number(digitChar)) % 97;
        }
      }
      return remainder === 1;
    };

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
    if (form.importe === "10" && !form.justificante) {
      nextErrors.justificante =
        "Adjunta el justificante si eres estudiante.";
    }
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
    if (!form.acceptPrivacy) {
      nextErrors.acceptPrivacy =
        "Debes aceptar la política de privacidad y el aviso legal.";
    }
    return nextErrors;
  };

  const submitDisabled = Object.values(validate(values)).some(Boolean);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const liveSnapshot = validate(values);
    setErrors(liveSnapshot);
    const liveHasErrors = Object.values(liveSnapshot).some(Boolean);
    if (liveHasErrors) return;

    // Aquí podrías llamar a un puerto/adaptador para enviar los datos.
    console.log("Solicitud de alta", values);
  };

  return children({
    values,
    onChange: handleChange,
    onFileChange: handleFileChange,
    onToggleChange: handleToggleChange,
    errors,
    submitDisabled,
    onSubmit: handleSubmit
  });
}

export default JoinForm;
