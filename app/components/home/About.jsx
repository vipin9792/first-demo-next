"use client";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function About() {
  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md={6}>
            <h2>About Us</h2>
            <p>We build scalable apps</p>
            <Button>Learn More</Button>
          </Col>
          <Col md={6}>
            <img src="https://via.placeholder.com/400" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}