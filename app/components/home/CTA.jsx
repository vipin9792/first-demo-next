"use client";
import { Container, Button } from "react-bootstrap";

export default function CTA() {
  return (
    <section className="bg-primary text-light text-center py-5">
      <Container>
        <h2>Start Your Project</h2>
        <Button variant="light">Contact Us</Button>
      </Container>
    </section>
  );
}