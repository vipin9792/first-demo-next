"use client";

import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container className="text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} MyApp | All Rights Reserved
        </p>
      </Container>
    </footer>
  );
}