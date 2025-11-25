import type { Club } from "../domain/club";

type ClubWelcomeProps = {
  tenant: string;
  club: Club | null;
  error: string | null;
};

function ClubWelcome({ tenant, club, error }: ClubWelcomeProps) {
  const isLoading = !club && !error;

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <p className="text-uppercase text-muted fw-semibold mb-0 small">
            Club
          </p>
          <span className="badge bg-primary text-uppercase">{tenant}</span>
        </div>
        {isLoading && (
          <p className="card-text text-secondary mb-0">Cargando club...</p>
        )}
        {error && (
          <p className="card-text text-danger mb-0" role="alert">
            {error}
          </p>
        )}
        {club && !error && (
          <>
            <h1 className="card-title h3 fw-bold mb-2">{club.name}</h1>
            <p className="text-secondary fw-semibold mb-3">{club.tagline}</p>
            <p className="card-text text-secondary mb-0">{club.description}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default ClubWelcome;
