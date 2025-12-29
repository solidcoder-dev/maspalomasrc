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
import type { Club } from "./domain/club";

function App() {
  const tenant = (import.meta.env.VITE_TENANT || "default").toLowerCase();
  const clubPort = useMemo(() => createJsonClubAdapter(tenant), [tenant]);
  const sepaMandatePort = useMemo(() => createSepaMandateAdapter(), []);
  const joinRequestStoragePort = useMemo(
    () => createLocalStorageJoinRequestAdapter(),
    []
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
      <NavBar />
      <main className="flex-grow-1 d-flex align-items-start py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              <Routes>
                <Route
                  path="/"
                  element={<ClubWelcome tenant={tenant} club={club} error={error} />}
                />
                <Route path="/contacto" element={<ContactSection />} />
                <Route
                  path="/unete"
                  element={
                    <JoinSection
                      club={club}
                      sepaMandatePort={sepaMandatePort}
                      storagePort={joinRequestStoragePort}
                    />
                  }
                />
                <Route path="/privacidad" element={<PrivacyPolicy />} />
                <Route path="/aviso-legal" element={<LegalNotice />} />
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
