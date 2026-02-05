import React from "react";

const services = [
  {
    title: "Design",
    description: "Creative UI/UX design with a user-first approach.",
  },
  {
    title: "Development",
    description: "Scalable web apps built using modern frameworks.",
  },
  {
    title: "Deployment",
    description: "Secure and fast deployment on cloud platforms.",
  },
];

export default function Card() {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {services.map((service, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{service.title}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {service.description}
                </p>
                <button className="btn btn-primary mt-3 align-self-start">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
