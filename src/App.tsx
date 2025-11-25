import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ClubWelcome from "./components/ClubWelcome";
import ContactSection from "./components/ContactSection";
import JoinSection from "./components/JoinSection";
import NavBar from "./components/NavBar";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LegalNotice from "./components/LegalNotice";
import { createJsonClubAdapter } from "./adapters/jsonClubAdapter";
import type { Club } from "./domain/club";

function App() {
  const tenant = (import.meta.env.VITE_TENANT || "default").toLowerCase();
  const clubPort = useMemo(() => createJsonClubAdapter(tenant), [tenant]);
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
    <>
      <NavBar />
      <main className="min-vh-100 d-flex align-items-start py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              <Routes>
                <Route
                  path="/"
                  element={<ClubWelcome tenant={tenant} club={club} error={error} />}
                />
                <Route path="/contacto" element={<ContactSection />} />
                <Route path="/unete" element={<JoinSection />} />
                <Route path="/privacidad" element={<PrivacyPolicy />} />
                <Route path="/aviso-legal" element={<LegalNotice />} />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
