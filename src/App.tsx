import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ClubWelcome from "./ui/ClubWelcome";
import ContactSection from "./ui/ContactSection";
import JoinSection from "./ui/JoinSection";
import NavBar from "./ui/NavBar";
import PrivacyPolicy from "./ui/PrivacyPolicy";
import LegalNotice from "./ui/LegalNotice";
import Footer from "./ui/Footer";
import { createJsonClubAdapter } from "./infrastructure/jsonClubAdapter";
import { createSepaMandateAdapter } from "./infrastructure/sepaMandateAdapter";
import { createLocalStorageJoinRequestAdapter } from "./infrastructure/localStorageJoinRequestAdapter";
import { createBrowserClientContextAdapter } from "./infrastructure/browserClientContextAdapter";
import { createSepaMandatePdfAdapter } from "./infrastructure/sepaMandatePdfAdapter";
import { createEmailNotificationAdapter } from "./infrastructure/emailNotificationAdapter";
import type { Club } from "./domain/club";
import { createSubmitContactUseCase } from "./application/contact/submitContactUseCase";
import { createSubmitJoinRequestUseCase } from "./application/join/submitJoinRequestUseCase";

function App() {
  const tenant = (import.meta.env.VITE_TENANT || "default").toLowerCase();
  const clubPort = useMemo(() => createJsonClubAdapter(tenant), [tenant]);
  const sepaMandatePort = useMemo(() => createSepaMandateAdapter(), []);
  const joinRequestStoragePort = useMemo(
    () => createLocalStorageJoinRequestAdapter(),
    []
  );
  const clientContextPort = useMemo(
    () => createBrowserClientContextAdapter(),
    []
  );
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
  const mandatePdfPort = useMemo(() => createSepaMandatePdfAdapter(), []);
  const submitJoinRequestUseCase = useMemo(
    () =>
      createSubmitJoinRequestUseCase({
        sepaMandatePort,
        storagePort: joinRequestStoragePort,
        clientContextPort,
        mandatePdfPort
      }),
    [sepaMandatePort, joinRequestStoragePort, clientContextPort, mandatePdfPort]
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
      <NavBar clubName={club?.name} logoUrl={club?.logoUrl} />
      <main className="flex-grow-1 d-flex align-items-start py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              <Routes>
                <Route
                  path="/"
                  element={<ClubWelcome tenant={tenant} club={club} error={error} />}
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
                    <JoinSection
                      club={club}
                      submitJoinRequestUseCase={submitJoinRequestUseCase}
                    />
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
