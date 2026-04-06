"use client";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Features() {
  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col md={4}>
            <Card className="p-3 text-center">Fast</Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 text-center">Responsive</Card>
          </Col>
          <Col md={4}>
            <Card className="p-3 text-center">Easy</Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}