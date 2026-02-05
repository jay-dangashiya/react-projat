function Home() {
  return (
    <>
      <div className="bg-light py-5 text-center">
        <h1 className="display-5 fw-bold">Welcome to Our Website</h1>
        <p className="lead">Bootstrap + React + Vite</p>
      </div>

      <div className="container my-5">
        <div className="row g-4">
          {["Fast", "Reliable", "Secure"].map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5 className="card-title">{item}</h5>
                  <p className="card-text">
                    High quality {item.toLowerCase()} services.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
