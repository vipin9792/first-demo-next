"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Form, Button } from "react-bootstrap";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem("token", data.token);

    // 🔥 trigger navbar update
    window.dispatchEvent(new Event("authChange"));

    router.push("/admin");
  } else {
    alert("Login Failed ❌");
  }
};

  return (
    <Container className="py-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Admin Login</h2>

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
          Login
        </Button>
      </Form>
    </Container>
  );
}