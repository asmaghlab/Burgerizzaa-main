import React from 'react';
import './Footer.css';
import SmartLink from '../Common/SmartLink';
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhoneInTalk } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import {useNavigate } from "react-router-dom";


const Footer:React.FC = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        navigate("/menu", { state: { category } });
    };

    return (

        <>
            <footer id='footer'>
                <div className="container_box footer">
                    <div className="footer_top">

                        <div className="footer_col">
                            <h2>Burgerizza</h2>
                            <p>Savor our freshly made burgers and cheesy pizzas,
                                crafted with the finest ingredients.</p>
                            <div className="footer_media mt-2">
                                <i><FaFacebookF /></i>
                                <i><RiInstagramFill /></i>
                                <i><FaTwitter /></i>
                            </div>
                        </div>


                        <div className="footer_col_links">
                            <h5>Quick Links</h5>
                            <SmartLink to="/home">Home</SmartLink>
                            <SmartLink to="/menu">Menu</SmartLink>
                            <SmartLink to="/contactus">Contact</SmartLink>
                        </div>

                        <div className="footer_col_links">
                            <h5>Our Menu</h5>
                                <p onClick={() => handleCategoryClick("Pizza")}>
                                    Pizza
                                </p>
                                <p onClick={() => handleCategoryClick("Burger")}>
                                    Burgers
                                </p>
                                <p onClick={() => handleCategoryClick("Dessert")}>
                                    Desserts
                                </p>
                                <p onClick={() => handleCategoryClick("Drinks")}>
                                    Drinks
                                </p>
                        </div>


                        <div className="footer_col_call">
                            <h5>Get In Touch</h5>
                            <p>
                                <i><IoLocationSharp /></i>
                                <span>3847 Hummingird Way </span>
                            </p>
                            <p>
                                <i><MdPhoneInTalk /></i>
                                <span>+1-555-157899087</span>
                            </p>
                            <p>
                                <i><MdEmail /></i>
                                <span>burgerizzag@gmail.com</span>
                            </p>
                        </div>
                    </div>



                    <div className="footer_bottom">
                        <p>copyright 2025 burgerizzag foods. All Rights Reserved</p>
                        <p>Privacy Policy | Terms of Use</p>
                    </div>
                </div>

            </footer>

        </>




    )
}

export default Footer;