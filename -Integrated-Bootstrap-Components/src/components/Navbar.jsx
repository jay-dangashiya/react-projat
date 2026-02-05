import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          React Bootstrap UI
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>

            <li className="nav-item">
              <button className="btn btn-outline-light btn-sm ms-lg-3">
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
