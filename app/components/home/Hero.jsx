"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((resData) => setData(resData));
  }, []);

  if (!data) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div>

      {/* 🔥 Hero Section */}
      <section className="bg-dark text-light py-5 text-center">
        <Container>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </Container>
      </section>

      {/* ⭐ Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">Features</h2>
          <Row>
            {data.features.map((item, index) => (
              <Col md={4} key={index}>
                <Card className="p-3 text-center shadow">
                  <h4>{item}</h4>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

    </div>
  );
}