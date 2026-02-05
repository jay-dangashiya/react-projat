function Contact() {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Contact Us</h2>

      <form className="row g-3">
        <div className="col-md-6">
          <input type="text" className="form-control" placeholder="Your Name" />
        </div>
        <div className="col-md-6">
          <input type="email" className="form-control" placeholder="Your Email" />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            rows="4"
            placeholder="Your Message"
          ></textarea>
        </div>
        <div className="col-12">
          <button className="btn btn-primary">Send Message</button>
        </div>
      </form>
    </div>
  )
}

export default Contact
