"use client";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Services() {
  return (
    <section className="bg-light py-5">
      <Container>
        <Row>
          <Col md={4}><Card className="p-3">Web Dev</Card></Col>
          <Col md={4}><Card className="p-3">Design</Card></Col>
          <Col md={4}><Card className="p-3">SEO</Card></Col>
        </Row>
      </Container>
    </section>
  );
}