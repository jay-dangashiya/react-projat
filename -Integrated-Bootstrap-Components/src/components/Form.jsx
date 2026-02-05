import React, { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4 fw-bold">Contact Us</h3>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <textarea
            name="message"
            rows="4"
            className="form-control"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary px-4">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
