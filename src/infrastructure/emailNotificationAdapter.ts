import emailjs from "@emailjs/browser";
import type {
  NotificationPayload,
  NotificationPort
} from "../ports/notification-port";

type EmailNotificationConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

export function createEmailNotificationAdapter(
  config: EmailNotificationConfig
): NotificationPort {
  const notify = async ({
    title,
    message,
    recipientEmail
  }: NotificationPayload) => {
    if (!config.serviceId || !config.templateId || !config.publicKey) return;

    await emailjs.send(
      config.serviceId,
      config.templateId,
      {
        title,
        message,
        to_email: recipientEmail
      },
      { publicKey: config.publicKey }
    );
  };

  return { notify };
}
