import { Link, NavLink } from "react-router-dom";
import "bootstrap/js/dist/collapse";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Club
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
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
                }
              >
                Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/unete"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active fw-semibold" : ""}`
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
