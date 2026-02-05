function Services() {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Our Services</h2>

      <div className="row g-4">
        {["Web Design", "Web Development", "Deployment"].map((service, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title">{service}</h5>
                <p className="card-text">
                  Professional {service.toLowerCase()} solutions.
                </p>
                <button className="btn btn-outline-primary">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
