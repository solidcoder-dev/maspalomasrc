import { useEffect, useMemo, useState } from "react";
import ClubWelcome from "./components/ClubWelcome.tsx";
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
    <main className="min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <ClubWelcome tenant={tenant} club={club} error={error} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
