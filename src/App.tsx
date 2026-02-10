import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomeSection from "./ui/home/HomeSection";
import AulaSection from "./ui/aula/AulaSection";
import ContactSection from "./ui/ContactSection";
import JoinSection from "./ui/JoinSection";
import NavBar from "./ui/NavBar";
import PrivacyPolicy from "./ui/PrivacyPolicy";
import LegalNotice from "./ui/LegalNotice";
import Footer from "./ui/Footer";
import ScrollToTop from "./ui/ScrollToTop";
import { createJsonClubAdapter } from "./infrastructure/jsonClubAdapter";
import { createEmailNotificationAdapter } from "./infrastructure/emailNotificationAdapter";
import { createJsonAulaContentAdapter } from "./infrastructure/jsonAulaContentAdapter";
import { createJsonHomeContentAdapter } from "./infrastructure/jsonHomeContentAdapter";
import { createJsonJoinContentAdapter } from "./infrastructure/jsonJoinContentAdapter";
import type { Club } from "./domain/club";
import { createSubmitContactUseCase } from "./application/contact/submitContactUseCase";

function App() {
  const tenant = (import.meta.env.VITE_TENANT || "default").toLowerCase();
  const clubPort = useMemo(() => createJsonClubAdapter(tenant), [tenant]);
  const homeContentPort = useMemo(() => createJsonHomeContentAdapter(), []);
  const aulaContentPort = useMemo(() => createJsonAulaContentAdapter(), []);
  const joinContentPort = useMemo(() => createJsonJoinContentAdapter(), []);
  const contactNotificationPort = useMemo(
    () =>
      createEmailNotificationAdapter({
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
      }),
    []
  );
  const submitContactUseCase = useMemo(
    () => createSubmitContactUseCase(contactNotificationPort),
    [contactNotificationPort]
  );
  const [club, setClub] = useState<Club | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setError(null);
    setClub(null);

    clubPort
      .getClub()
      .then((data) => {
        if (active) setClub(data);
      })
      .catch(() => {
        if (active) setError("No pudimos cargar los datos del club.");
      });

    return () => {
      active = false;
    };
  }, [clubPort]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <NavBar clubName={club?.name} logoUrl={club?.logoUrl} />
      <main className="flex-grow-1 d-flex align-items-start py-4">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomeSection homeContentPort={homeContentPort} />}
            />
            <Route
              path="/aula"
              element={<AulaSection aulaContentPort={aulaContentPort} />}
            />
            <Route
              path="/contacto"
              element={
                <ContactSection
                  club={club}
                  submitContactUseCase={submitContactUseCase}
                />
              }
            />
            <Route
              path="/unete"
              element={
                <JoinSection joinContentPort={joinContentPort} />
              }
            />
            <Route
              path="/privacidad"
              element={
                <PrivacyPolicy clubEmail={club?.email || "contacto@club.com"} />
              }
            />
            <Route
              path="/aviso-legal"
              element={
                <LegalNotice clubEmail={club?.email || "contacto@club.com"} />
              }
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
