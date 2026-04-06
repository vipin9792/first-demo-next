"use client";
import { Container, Row, Col } from "react-bootstrap";

export default function AboutContent() {
  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md={6}>
            <h2>Who We Are</h2>
            <p>
              We are a team of developers building modern web applications.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="https://via.placeholder.com/400"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}