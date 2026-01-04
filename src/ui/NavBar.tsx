import { Link, NavLink } from "react-router-dom";
import "bootstrap/js/dist/collapse";

type NavBarProps = {
  clubName?: string;
  logoUrl?: string;
};

function NavBar({ clubName = "Club", logoUrl }: NavBarProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={clubName}
              height={50}
              className="me-2"
            />
          )}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
          aria-controls="navContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold text-white" : ""}`
                }
              >
                Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/aula"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold text-white" : ""}`
                }
              >
                Aula
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/unete"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold text-white" : ""}`
                }
              >
                Únete
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
