"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Form, Button } from "react-bootstrap";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {
      alert("Registered Successfully ✅");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Register</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </Form.Group>

        <Button type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
}