import type { NotificationPort } from "../../ports/notification-port";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  recipientEmail: string;
};

export const submitContactUseCase = async (
  payload: ContactMessage,
  notificationPort: NotificationPort
) => {
  await notificationPort.notify({
    title: "Solicitud de contacto",
    message: `Nombre: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
    recipientEmail: payload.recipientEmail
  });
};
