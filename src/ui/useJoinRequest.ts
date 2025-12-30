import { useMemo, useState, type FormEvent } from "react";
import type { JoinRequestValues } from "../application/join/joinRequestPresenter";
import type { JoinRequestHandlers } from "../application/join/joinRequestPresenter";
import {syncHolderFromPlayer, validateJoinRequest} from "../domain/join/joinRequest.ts";
import {normalizeIban} from "../domain/join/iban.ts";

const initialValues: JoinRequestValues = {
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
  signatureDataUrl: "",
  justificante: null,
  acceptPrivacy: false
};

type UseJoinFormConfig = {
  onSubmitRequest: (values: JoinRequestValues) => Promise<unknown> | void;
};

export const useJoinRequestPresenter = ({
  onSubmitRequest
}: UseJoinFormConfig) => {
  const [values, setValues] = useState<JoinRequestValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<
    Partial<Record<keyof JoinRequestValues, boolean>>
  >({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = useMemo(() => validateJoinRequest(values), [values]);
  const submitDisabled = isSubmitting || Object.values(errors).some(Boolean);

  const handleChange = (field: keyof JoinRequestValues, value: string) => {
    setValues((prev) => {
      const next = {
        ...prev,
        [field]: field === "iban" ? normalizeIban(value) : value
      } as JoinRequestValues;
      return syncHolderFromPlayer(next);
    });
  };

  const handleFileChange = (file: File | null) => {
    setValues((prev) => ({ ...prev, justificante: file }));
  };

  const handleToggleChange = (
    field: keyof JoinRequestValues,
    checked: boolean
  ) => {
    setValues((prev) => {
      const next = { ...prev, [field]: checked } as JoinRequestValues;
      return syncHolderFromPlayer(next);
    });
  };

  const handleSignatureChange = (dataUrl: string) => {
    setTouched((prev) => ({ ...prev, signatureDataUrl: true }));
    setValues((prev) => ({ ...prev, signatureDataUrl: dataUrl }));
  };

  const handleSignatureClear = () => {
    setTouched((prev) => ({ ...prev, signatureDataUrl: true }));
    setValues((prev) => ({ ...prev, signatureDataUrl: "" }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (Object.values(errors).some(Boolean)) return;
    setIsSubmitting(true);
    try {
      await onSubmitRequest(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlurField = (field: keyof JoinRequestValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const shouldShowError = (field: keyof JoinRequestValues) => {
    return Boolean(touched[field] || submitAttempted);
  };

  const handlers: JoinRequestHandlers = {
    values,
    onChange: handleChange,
    onFileChange: handleFileChange,
    onToggleChange: handleToggleChange,
    onBlurField: handleBlurField,
    onSignatureChange: handleSignatureChange,
    onSignatureClear: handleSignatureClear,
    errors,
    submitDisabled,
    isSubmitting,
    shouldShowError,
    onSubmit: handleSubmit
  };

  return handlers;
};
