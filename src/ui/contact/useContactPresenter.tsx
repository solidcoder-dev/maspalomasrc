import { useMemo, useState, type FormEvent } from "react";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  recipientEmail: string;
};

type ContactPresenterConfig = {
  recipientEmail: string;
  onSubmitContact: (payload: ContactPayload) => Promise<void> | void;
};

export type ContactPresenter = {
  values: {
    name: string;
    email: string;
    message: string;
  };
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
  isSubmitting: boolean;
  status: string | null;
  onChange: (field: "name" | "email" | "message", value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const useContactPresenter = ({
  onSubmitContact,
  recipientEmail
}: ContactPresenterConfig): ContactPresenter => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<ContactPresenter["errors"]>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validate = useMemo(() => {
    const nextErrors: ContactPresenter["errors"] = {};
    if (!values.name.trim()) nextErrors.name = "El nombre es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      nextErrors.email = "Introduce un email válido.";
    }
    if (!values.message.trim()) {
      nextErrors.message = "El mensaje es obligatorio.";
    }
    return nextErrors;
  }, [values]);

  const onChange: ContactPresenter["onChange"] = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit: ContactPresenter["onSubmit"] = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setStatus(null);
    setErrors(validate);
    if (Object.keys(validate).length > 0) return;
    if (!recipientEmail) {
      setStatus("No hemos podido encontrar el email del club.");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmitContact({
        name: values.name,
        email: values.email,
        message: values.message,
        recipientEmail
      });
      setStatus("Mensaje enviado. Te responderemos lo antes posible.");
      setValues({ name: "", email: "", message: "" });
      setErrors({});
      setSubmitAttempted(false);
    } catch {
      setStatus("No se pudo enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleErrors = submitAttempted ? validate : {};

  return {
    values,
    errors: { ...errors, ...visibleErrors },
    isSubmitting,
    status,
    onChange,
    onSubmit
  };
};
