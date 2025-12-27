import type { FormEvent } from "react";

export type JoinFormValues = {
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  dni: string;
  nacimiento: string;
  direccion: string;
  codigoPostal: string;
  localizacion: string;
  importe: string;
  titularMismoQueJugador: boolean;
  titularNombre: string;
  titularEmail: string;
  titularDireccion: string;
  titularCodigoPostal: string;
  titularLocalizacion: string;
  iban: string;
  acceptSepaMandate: boolean;
  justificante: File | null;
  acceptPrivacy: boolean;
};

export type JoinFormHandlers = {
  values: JoinFormValues;
  onChange: (field: keyof JoinFormValues, value: string) => void;
  onFileChange: (file: File | null) => void;
  onToggleChange: (field: keyof JoinFormValues, checked: boolean) => void;
  errors: Partial<Record<keyof JoinFormValues, string>>;
  submitDisabled: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
