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
  signatureDataUrl: string;
  justificante: File | null;
  acceptPrivacy: boolean;
};

export type JoinFormErrors = Partial<Record<keyof JoinFormValues, string>>;
