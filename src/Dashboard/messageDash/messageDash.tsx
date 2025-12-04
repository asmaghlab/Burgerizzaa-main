import React, { useEffect, useState } from "react";
import './MessageDash.css';
import axios from "axios";
import {
  Container,
  // Row,
  // Col,
  // Card,
  Form,
  Button,
  Spinner,
  Toast,
  ToastContainer,
  OverlayTrigger,
  Tooltip,
  // Badge,
  Alert,
} from "react-bootstrap";
import { FaTrash, FaSave, FaTimes, FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiEdit2Fill } from "react-icons/ri";


interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

const MessageDash: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState("");
  const [toast, setToast] = useState<{ show: boolean; message: string; bg: string }>({
    show: false,
    message: "",
    bg: "#95A5A6", // Gray for update
  });


  const avatarGray = "#7b7f80d7";
  const apiUrl = "https://68eaad7b76b3362414cbea0d.mockapi.io/messages";
  const noOutlineStyle = { outline: "none", boxShadow: "none" };

  const fetchMessages = () => {
    setLoading(true);
    axios
      .get<Message[]>(apiUrl)
      .then((res) => {
        const messagesWithDate = res.data.map((msg) => ({
          ...msg,
          createdAt: msg.createdAt || new Date().toISOString(),
        }));
        setMessages(messagesWithDate);
        setFilteredMessages(messagesWithDate);
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
    if (!searchTerm) setFilteredMessages(messages);
    else {
      const filtered = messages.filter(
        (msg) =>
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
          setMessages((prev) => prev.filter((msg) => msg.id !== id));
          setDeletingId(null);
          setToast({ show: true, message: "Message deleted!", bg: "#3498DB" });
        })
        .catch(() => {
          setDeletingId(null);
          setToast({ show: true, message: "Error deleting message.", bg: "#E74C3C" });
        });
    }
  };



  const handleEditClick = (msg: Message) => {
    setEditingId(msg.id);
    setEditMessage(msg.message);
  };



  const handleSaveEdit = (id: string) => {
    const originalMessage = messages.find((m) => m.id === id)?.message;
    if (!editMessage.trim() || editMessage === originalMessage) {
      setEditingId(null);
      return;
    }
    axios
      .put(`${apiUrl}/${id}`, { message: editMessage })
      .then(() => {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, message: editMessage } : msg))
        );
        setEditingId(null);
        setToast({ show: true, message: "Message updated!", bg: "#95A5A6" });
      })
      .catch(() => {
        setToast({ show: true, message: "Error updating message.", bg: "#E74C3C" });
      });
  };


  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  const isNewMessage = (dateString?: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  // const getAvatarLetter = (name: string) => name.charAt(0).toUpperCase();

  return (
    <Container className="mt-5">

      <div className="review_Message_head">
        <h5 className="mb-3 text-center">Recent Feedbacks</h5>

        {/* Search */}
        <Form className="mb-4" style={{ position: "relative"}}>
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              left: 12,
              transform: "translateY(-50%)",
              color: avatarGray,
            }}
          />
          <Form.Control
            type="search"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: 10,
              border: "none",
              padding: "10px 40px",
              ...noOutlineStyle,
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

        {!loading && filteredMessages.length === 0 && (
          <Alert
            variant="light"
            className="text-center"
            style={{ backgroundColor: "#f2f2f2", color: "#555", fontWeight: 500 }}
          >
            No messages found matching your search.
          </Alert>
        )}
      </div>


      <div className="g-3 feedback_cards">

        {!loading &&
          filteredMessages.map((msg) => (
            <div key={msg.id}  className=" feedback_card">
              <div
                className="p-3"
                style={{
                  borderRadius: 10,
                  backgroundColor: "rgba(245, 200, 200, 0.268)",
                  // boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "transform 0.15s",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  border: "none",
                  
                }}
              >
                <div className="d-flex align-items-start gap-3">
                  {/* Avatar */}
                  {/* <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: avatarGray,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      flexShrink: 0,
                    }}
                  >
                    {getAvatarLetter(msg.name)}
                  </div> */}

                  <div className="flex-grow-1">
                    {/* {isNewMessage(msg.createdAt) && (
                      <Badge
                        style={{
                          backgroundColor: "#3498DB",
                          color: "#fff",
                        }}
                        className="mb-1"
                      >
                        New
                      </Badge>
                    )} */}

                    {editingId === msg.id ? (
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)}
                        className="mb-2"
                        style={{ resize: "none", color: "#414536", ...noOutlineStyle }}
                      />
                    ) : (
                      <div
                      className="message_text">
                        {msg.message}
                      </div>
                    )}

                    <div className="feedbacks_data mt-4">
                      <p style={{  color: "#333" }}><span >Name : </span> {msg.name}</p>
                      <p style={{  color: "#555" }}><span>Email : </span>{msg.email}</p>
                    </div>


                  </div>
                </div>

                <div className="d-flex justify-content-between  mt-2 feedback_control">
                  <div style={{ fontSize: "1rem", color: "#999", marginTop: "0.25rem" }}>
                      {formatDate(msg.createdAt)}
                  </div>

                  <div className="d-flex g-2">
                    {editingId === msg.id ? (
                      <>
                        <OverlayTrigger overlay={<Tooltip>Update</Tooltip>}>
                          <Button className="feedback_btn1 ms-2" variant="warning" onClick={() => handleSaveEdit(msg.id)}>
                            <FaSave />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Cancel</Tooltip>}>
                          <Button className="feedback_btn2 ms-2" variant="secondary" onClick={() => setEditingId(null)}>
                            <FaTimes />
                          </Button>
                        </OverlayTrigger>
                      </>
                    ) : (
                      <>
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button className="feedback_btn1 ms-2"  variant="" onClick={() => handleEditClick(msg)}>
                            <RiEdit2Fill />
                          </Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            
                            variant=""
                            disabled={deletingId === msg.id}
                            onClick={() => handleDelete(msg.id)}
                            className="feedback_btn2 ms-2"
                          >
                            <FaTrash />
                          </Button>
                        </OverlayTrigger>
                      </>
                    )}
                  </div>



                </div>
              </div>
            </div>
          ))}
      </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
          style={{
            backgroundColor: toast.bg,
            color: "#fff",
            fontWeight: "500",
            minWidth: "200px",
          }}
        >
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default MessageDash;
