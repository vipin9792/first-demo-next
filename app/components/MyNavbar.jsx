"use client";

import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // 🔍 Check login status
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    // 🔥 listen custom event
    window.addEventListener("authChange", checkLogin);

    return () => {
      window.removeEventListener("authChange", checkLogin);
    };
  }, []);

  // 🔓 Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      localStorage.removeItem("token");

      // 🔥 trigger update
      window.dispatchEvent(new Event("authChange"));

      router.push("/login");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">
          MyApp
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          {/* Left Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/about">About</Nav.Link>
            <Nav.Link as={Link} href="/contact">Contact</Nav.Link>

            {isLoggedIn && (
              <Nav.Link as={Link} href="/admin">Admin</Nav.Link>
            )}
          </Nav>

          {/* Right Buttons */}
          <div className="d-flex gap-2">
            {isLoggedIn ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>

                <Button
                  variant="light"
                  onClick={() => router.push("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}