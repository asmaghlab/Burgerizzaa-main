import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert, Card, Form, Button, Toast, ToastContainer } from "react-bootstrap";

const MessageDash: React.FC = () => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [toast, setToast] = useState<{ show: boolean; message: string; bg: string }>({
        show: false,
        message: "",
        bg: "success",
});

  const accentColor = "#AD343E";
  const apiUrl = "https://68eaad7b76b3362414cbea0d.mockapi.io/messages";

  const fetchMessages = () => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        setMessages(res.data);
        setFilteredMessages(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load messages.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter((msg: any) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [searchTerm, messages]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setDeletingId(id);
      axios
        .delete(`${apiUrl}/${id}`)
        .then(() => {
          setMessages((prev) => prev.filter((msg: any) => msg.id !== id));
          setDeletingId(null);
          setToast({ show: true, message: "Message deleted successfully!", bg: "success" });
        })
        .catch(() => {
          setDeletingId(null);
          setToast({ show: true, message: "Error deleting the message. Please try again.", bg: "danger" });
        });
    }
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container className="mt-5">
      <Card className="shadow rounded-4 p-4" style={{ border: `1px solid ${accentColor}` }}>
        <h2 className="mb-4 text-center fw-bold" style={{ color: accentColor }}>
          📬 Customer Messages
        </h2>

        <Form className="mb-4">
          <Form.Control
            type="search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: "20px",
              border: `1px solid ${accentColor}`,
              padding: "10px 15px",
              fontSize: "1rem",
            }}
          />
        </Form>

        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="danger" />
            <div className="mt-2 text-muted">Loading messages...</div>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && filteredMessages.length === 0 && (
          <Alert variant="info">No messages found matching your search.</Alert>
        )}

        {!loading && filteredMessages.length > 0 && (
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead style={{ backgroundColor: "#f8d7da" }}>
                <tr>
                  <th style={{ color: accentColor }}>#</th>
                  <th style={{ color: accentColor }}>Name</th>
                  <th style={{ color: accentColor }}>Email</th>
                  <th style={{ color: accentColor }}>Message</th>
                  <th style={{ color: accentColor }}>Time</th>
                  <th style={{ color: accentColor, width: "100px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((msg: any, index: number) => (
                  <tr key={msg.id}>
                    <td>{index + 1}</td>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.message}</td>
                    <td>{msg.createdAt ? formatDate(msg.createdAt) : "-"}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={deletingId === msg.id}
                        onClick={() => handleDelete(msg.id)}
                      >
                        {deletingId === msg.id ? "Deleting..." : "Delete"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
          bg={toast.bg}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default MessageDash;