"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    const data = await res.json();

    if (data.success) {
      localStorage.removeItem("token");

      // 🔥 update navbar
      window.dispatchEvent(new Event("authChange"));

      router.push("/login");
    } else {
      alert("Logout failed ❌");
    }

  } catch (error) {
    console.log("Logout API error:", error);
  }
};

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* 🔥 Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#212529",
          color: "#fff",
          padding: "20px"
        }}
      >
        <h4 className="mb-4">Admin Panel</h4>

        <ul style={{ listStyle: "none", padding: 0 }}>
          <li className="mb-3">
            <Link href="/admin" style={{ color: "#fff" }}>
              Dashboard
            </Link>
          </li>

          {/* <li className="mb-3">
            <Link href="/" style={{ color: "#fff" }}>
              Home
            </Link>
          </li> */}

          <li className="mb-3">
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "red",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* 📄 Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}