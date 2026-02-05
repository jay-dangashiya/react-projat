
import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-primary bg-gradient text-white py-5">
      <div className="container text-center py-4">
        <h1 className="display-4 fw-bold mb-3">
          React + Bootstrap Website
        </h1>

        <p className="lead mb-4">
          Build fast, responsive, and modern interfaces using Bootstrap components.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-light btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#demoModal"
          >
            Open Modal
          </button>

          <button className="btn btn-outline-light btn-lg">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-6">
          Modern React Website
        </h1>

        <p className="text-lg opacity-90 mb-8">
          Fully responsive UI built with React and Tailwind CSS.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Get Started
          </button>

          <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

