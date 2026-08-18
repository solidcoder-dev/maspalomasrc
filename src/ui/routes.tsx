import type { RouteRecord } from "vite-react-ssg";
import { loadAulaPage } from "../application/pages/loadAulaPage";
import { loadHomePage } from "../application/pages/loadHomePage";
import { loadJoinPage } from "../application/pages/loadJoinPage";
import { loadRugbyKidsPage } from "../application/pages/loadRugbyKidsPage";
import type { AppDependencies } from "../application/appDependencies";
import HomeSection from "./home/HomeSection";
import AulaSection from "./aula/AulaSection";
import JoinSection from "./JoinSection";
import RugbyKidsSection from "./rugby-kids/RugbyKidsSection";
import ContactSection from "./ContactSection";
import PrivacyPolicy from "./PrivacyPolicy";
import LegalNotice from "./LegalNotice";
import AppLayout from "./AppLayout";
import { AppServicesProvider, useAppServices } from "./AppServicesProvider";
import { useTypedLoaderData } from "./routing/useTypedLoaderData";

function HomeRoute() { const { homeContentPort } = useAppServices(); return <HomeSection homeContentPort={homeContentPort} initialData={useTypedLoaderData<Awaited<ReturnType<typeof loadHomePage>>>()} />; }
function AulaRoute() { const { aulaContentPort } = useAppServices(); return <AulaSection aulaContentPort={aulaContentPort} initialData={useTypedLoaderData<Awaited<ReturnType<typeof loadAulaPage>>>()} />; }
function JoinRoute() { const { joinContentPort } = useAppServices(); return <JoinSection joinContentPort={joinContentPort} initialData={useTypedLoaderData<Awaited<ReturnType<typeof loadJoinPage>>>()} />; }
function RugbyKidsRoute() {
  const { club, rugbyKidsContentPort } = useAppServices();
  const data = useTypedLoaderData<Awaited<ReturnType<typeof loadRugbyKidsPage>>>();
  return club ? <RugbyKidsSection rugbyKidsContentPort={rugbyKidsContentPort} training={club.training} initialData={data} /> : <p className="text-body-secondary mb-3">Cargando información...</p>;
}
function ContactRoute() { const { club, submitContactUseCase } = useAppServices(); return <ContactSection club={club} submitContactUseCase={submitContactUseCase} />; }
function PrivacyRoute() { return <PrivacyPolicy clubEmail={useAppServices().club?.email || "contacto@club.com"} />; }
function LegalRoute() { return <LegalNotice clubEmail={useAppServices().club?.email || "contacto@club.com"} />; }

export function createRoutes(dependencies: AppDependencies): RouteRecord[] {
  return [{
    id: "club",
    path: "/",
    loader: () => dependencies.clubPort.getClub(),
    element: <AppServicesProvider dependencies={dependencies}><AppLayout /></AppServicesProvider>,
    children: [
      { index: true, loader: () => loadHomePage(dependencies.homeContentPort), element: <HomeRoute /> },
      { path: "aula", loader: () => loadAulaPage(dependencies.aulaContentPort), element: <AulaRoute /> },
      { path: "rugby-kids", loader: () => loadRugbyKidsPage(dependencies.rugbyKidsContentPort), element: <RugbyKidsRoute /> },
      { path: "contacto", element: <ContactRoute /> },
      { path: "unete", loader: () => loadJoinPage(dependencies.joinContentPort), element: <JoinRoute /> },
      { path: "privacidad", element: <PrivacyRoute /> },
      { path: "aviso-legal", element: <LegalRoute /> }
    ]
  }];
}
