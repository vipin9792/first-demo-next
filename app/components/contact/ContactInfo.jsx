"use client";
import { Container } from "react-bootstrap";

export default function ContactInfo() {
  return (
    <section className="py-5 text-center">
      <Container>
        <h2>Contact Info</h2>
        <p>Email: support@myapp.com</p>
        <p>Phone: +91 9876543210</p>
      </Container>
    </section>
  );
}