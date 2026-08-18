import { ViteReactSSG } from "vite-react-ssg";
import { createRoutes } from "./ui/routes";
import { createJsonClubAdapter } from "./infrastructure/jsonClubAdapter";
import { createJsonHomeContentAdapter } from "./infrastructure/jsonHomeContentAdapter";
import { createJsonAulaContentAdapter } from "./infrastructure/jsonAulaContentAdapter";
import { createJsonJoinContentAdapter } from "./infrastructure/jsonJoinContentAdapter";
import { createJsonRugbyKidsContentAdapter } from "./infrastructure/jsonRugbyKidsContentAdapter";
import { createEmailNotificationAdapter } from "./infrastructure/emailNotificationAdapter";
import { createSubmitContactUseCase } from "./application/contact/submitContactUseCase";
import { createSiteConfig } from "./application/siteConfig";
import "@tenant-theme";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

const tenant = (import.meta.env.VITE_TENANT || "default").toLowerCase();
const dependencies = {
  siteConfig: createSiteConfig(import.meta.env),
  clubPort: createJsonClubAdapter(tenant),
  homeContentPort: createJsonHomeContentAdapter(),
  aulaContentPort: createJsonAulaContentAdapter(),
  joinContentPort: createJsonJoinContentAdapter(),
  rugbyKidsContentPort: createJsonRugbyKidsContentAdapter(),
  submitContactUseCase: createSubmitContactUseCase(createEmailNotificationAdapter({
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
  }))
};

export const createRoot = ViteReactSSG({
  routes: createRoutes(dependencies),
  basename: dependencies.siteConfig.basePath.replace(/\/$/, "")
});
