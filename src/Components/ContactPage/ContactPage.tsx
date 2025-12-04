import './ContactPage.css';
import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { showSuccessAlert } from '../Sweet/SweetAlert';

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
        border-radius: 10px !important;
        border:none;
        background-color: #ad343e2c;
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
        background-color: #ad343e2c;
        outline: none !important;
        box-shadow: 0 4px 8px 0 #e7adb2b6, 0 6px 20px 0 #e7adb2b6 !important;
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

        showSuccessAlert("Your review has been submitted successfully!");
        setFormData({ name: "", email: "", message: "" });
        } catch (error) {
        // toast.error("Failed to send message. Please try again.");
        // console.error(error);
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <>
        <Helmet>
           <title>Contact  </title>
                <meta
                    name="description"
                    content="Welcome to Burgerizza! Discover our delicious burgers, exclusive deals, and amazing stories."
                />
        </Helmet>
        <style>{inputStyle}</style>

        <div id="background_home">
            <section className=" section">
                <div className="container_box contant_container pt-5">
                    <div className="review_head text-center mb-4">
                        <h2  className="fs-1">
                        Add a Review Message
                        </h2>
                    </div>

                    <div className="contact_boxs mt-5" >
                        {/* Left side */}
                        <div className="review_box">

                            <div className="review_box_data">
                                <h3 className="fw-semibold mb-4" style={{ color:  "#2C2F24" }}>
                                    Get In Touch
                                </h3>
                                <p className="text-muted mb-4">
                                    Share your experience with us! Tell us what you loved about our pizzas, your favorite toppings, 
                                    or anything else about your visit. We’d love to hear your honest review.
                                </p>

                                <ul className="list-unstyled mb-4" style={{ fontSize: "0.9rem" }}>
                                    <li className="d-flex align-items-center mb-3">
                                    <FaMapMarkerAlt
                                        className="fs-6 me-3"
                                        style={{ color: "#ad343e" }}
                                    />
                                    <p className='fs-6'>123 El-Masryeen St, Nasr City, Cairo, Egypt</p>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                    <FaPhoneAlt
                                        className="fs-6 me-3"
                                        style={{ color: "#ad343e"}}
                                    />
                                    <p className='fs-6'>+010 345 856 76</p>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                    <FaEnvelope
                                        className="fs-6 me-3"
                                        style={{ color: "#ad343e" }}
                                    />
                                    <p className='fs-6'>burgerizza@gmail.com</p>
                                    </li>
                                </ul>

                                {/* <div className="d-flex gap-3">
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
                                </div> */}
                            </div>


                        </div>

                        {/* Right Side (Form) */}
                        <div className="contact_box2">

                            <div className=" p-4 rounded-3 shadow-sm review_box_form">

                                {/* <h5 className="fw-semibold mb-3" style={{ color: accentColor }}>
                                Send a Message
                                </h5> */}
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
                                        placeholder="Review"
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
                                        borderRadius: "10px",
                                        padding: "10px 0",
                                        }}
                                    >
                                        {isSubmitting ? "Sending..." : "Submit"}
                                    </Button>
                                </Form>
                            </div>
                        </div>





                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default ContactPage;
