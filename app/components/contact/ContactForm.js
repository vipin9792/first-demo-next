"use client";

import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [msg, setMsg] = useState("");

  // input handle
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit handle
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json(); // 👈 ab safe hai

    if (data.success) {
      alert("Message sent ✅");
    }

  } catch (err) {
    console.log("Error:", err);
  }
};

  return (
    <section className="bg-light py-5">
      <Container>
        <h2 className="text-center mb-4">Contact Us</h2>

        {msg && <p className="text-success text-center">{msg}</p>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit">Send Message</Button>
          </div>
        </Form>
      </Container>
    </section>
  );
}