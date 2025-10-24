
import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

import { toast } from "react-toastify";


type Message  = {
    name?:string,
    email?:string,
    message?:string
}

const ContactPage: React.FC = () => {
    const accentColor = "#AD343E";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState<Message>({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputStyle = `
        .form-control {
        border: 1px solid #d6a6a1 !important;
        border-radius: 20px !important;
        background-color: transparent !important;
        color: #333 !important;
        font-size: 0.95rem;
        padding: 12px 15px;
        box-shadow: none !important;
        transition: box-shadow 0.3s ease;
        }

        .form-control::placeholder {
        color: #777 !important;
        }

        .form-control:focus {
        border: 1px solid ${accentColor} !important;
        outline: none !important;
        background-color: #fff !important;
        }
    `;

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        let isValid = true;
        const newErrors:Message  = {};

        if (!formData.name.trim()) {
        newErrors.name = "Name is required.";
        isValid = false;
        }

        if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
        isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid.";
        isValid = false;
        }

        if (!formData.message.trim()) {
        newErrors.message = "Message is required.";
        isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
        setIsSubmitting(true);

        const response = await axios.post(
            "https://68eaad7b76b3362414cbea0d.mockapi.io/messages",
            formData
        );
        console.log("Response:", response);

        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        } catch (error) {
        toast.error("Failed to send message. Please try again.");
        console.error(error);
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <>
        <style>{inputStyle}</style>

        <div id="background_home">
            <section className=" section">
            {/* <Container> */}
            <div className="container_box pt-3">
                <div className="text-center mb-5">
                    <h2 style={{ color: "#2C2F24"}} className="fs-1">
                    Contact Us
                    </h2>
                    {/* <p
                    className="text-muted w-75 mx-auto mt-3"
                    style={{ fontSize: "0.95rem" }}
                    >
                    We'd love to hear from you! Whether it's feedback, a special
                    request, or just to say hi — drop us a message.
                    </p> */}
                </div>

                <Row className="d-flex align-items-start justify-content-center bg-success ">
                    {/* Left side */}
                    <Col md={6}>
                        <h4 className="fw-semibold mb-4" style={{ color: accentColor }}>
                            Get In Touch
                        </h4>
                        <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                            Our team is always ready to serve you the best slices in town!
                        </p>

                        <ul className="list-unstyled mb-4" style={{ fontSize: "0.9rem" }}>
                            <li className="d-flex align-items-center mb-3">
                            <FaMapMarkerAlt
                                className="fs-5 me-3"
                                style={{ color: accentColor }}
                            />
                            <span>London Eye, London, UK</span>
                            </li>
                            <li className="d-flex align-items-center mb-3">
                            <FaPhoneAlt
                                className="fs-5 me-3"
                                style={{ color: accentColor }}
                            />
                            <span>+44 123 456 7890</span>
                            </li>
                            <li className="d-flex align-items-center mb-3">
                            <FaEnvelope
                                className="fs-5 me-3"
                                style={{ color: accentColor }}
                            />
                            <span>mail@yourhub.com</span>
                            </li>
                        </ul>

                        <div className="d-flex gap-3">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                            (Icon, index) => (
                                <Link
                                to="#"
                                key={index}
                                style={{
                                    color: accentColor,
                                    fontSize: "1.3rem",
                                    transition: "0.3s",
                                }}
                                onMouseOver={(e) =>
                                    ((e.target as HTMLElement).style.color = "#8f2c36")
                                }
                                onMouseOut={(e) =>
                                    ((e.target as HTMLElement).style.color = accentColor)
                                }
                                >
                                <Icon />
                                </Link>
                            )
                            )}
                        </div>
                    </Col>

                    {/* Right Side (Form) */}
                    <Col md={6}>
                    <div
                        className="bg-white p-4 rounded-4 shadow-sm mx-auto"
                        style={{ maxWidth: "400px" }}
                    >
                        <h5 className="fw-semibold mb-3" style={{ color: accentColor }}>
                        Send a Message
                        </h5>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Control
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMessage">
                            <Form.Control
                            as="textarea"
                            rows={4}
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            isInvalid={!!errors.message}
                            />
                            <Form.Control.Feedback type="invalid">
                            {errors.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-100 fw-semibold text-white border-0"
                            style={{
                            backgroundColor: accentColor,
                            transition: "0.3s",
                            borderRadius: "20px",
                            padding: "10px 0",
                            }}
                        >
                            {isSubmitting ? "Sending..." : "Submit"}
                        </Button>
                        </Form>
                    </div>
                    </Col>
                </Row>
                </div>
            {/* </Container> */}
            </section>
        </div>
        </>
    );
};

export default ContactPage;
