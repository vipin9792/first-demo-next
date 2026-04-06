"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Table, Button, Form, Modal } from "react-bootstrap";

export default function AdminPage() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [editData, setEditData] = useState({
    id: "",
    name: "",
    email: "",
    message: ""
  });

  // 🔐 Protect page
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, []);

  // 📥 GET (with JWT)
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await res.json();
      setData(result.data || []);

    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await fetch("/api/contact", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    });

    fetchData();
  };

  // ✏️ Edit
  const handleEdit = (item) => {
    setEditData({
      id: item._id,
      name: item.name,
      email: item.email,
      message: item.message
    });
    setShow(true);
  };

  // ✏️ UPDATE
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    await fetch("/api/contact", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editData)
    });

    setShow(false);
    fetchData();
  };

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEdit(item)}
                  className="me-2"
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-2"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <Form.Control
              className="mb-2"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />

            <Form.Control
              as="textarea"
              value={editData.message}
              onChange={(e) =>
                setEditData({ ...editData, message: e.target.value })
              }
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}