import './Heading.css'
import { useEffect } from 'react';
// import { IoLogInOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { RiMenu2Line } from "react-icons/ri";
import { NavLink,Link } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";

import { LuUserPen } from "react-icons/lu";
// import { GoChecklist } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";


import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";

function Heading() {

    const [responsive, setResponsive] = useState(false);
    const cart = useSelector((state: RootState) => state.cart);
    const user =useSelector((state: RootState)=> state.user.user);

    const [openDropdown, setOpenDropdown] = useState(false);
    const [headingScrolled, setHeadingScrolled] = useState(false);

    useEffect(() => {
        const handleHeadingScroll = () => {
            setHeadingScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleHeadingScroll);
        return () => window.removeEventListener("scroll", handleHeadingScroll);
    }, []);

    const cartQuantity =cart.reduce((total, item) => total + item.quantity, 0)

    return (
        <>
        <nav id="heading" className={headingScrolled ? "headingScrolled":""}>
            <div className="heading container_box">

                <div className="heading_logo">
                    <div className="logo_text">
                        <NavLink to="/"><h1>Burgerizza</h1></NavLink>
                    </div>
                </div>

                <div className="heading_menu" >
                    <NavLink to="/home" className="menu">Home</NavLink>
                    <NavLink to="/menu"  className="menu">Menu</NavLink>
                    <NavLink to="/contactus" className="menu">Contact</NavLink>
                </div>

                <div className="heading_icons">
                    {user? (
                        <div className="profile_drop">
                            <button
                            onClick={() => setOpenDropdown(!openDropdown)}
                            className='user_icon'>

                                <i className={openDropdown ? "icon_rotate active" : "icon_rotate"}><IoIosArrowDown /></i>
                                <h5>Hi, {user.username.split("")}</h5>
                            </button>

                                {openDropdown && (
                                    <div className="dropdown_menu">
                                        <Link to="/useraccount" onClick={() => setOpenDropdown(false)}>
                                            <LuUserPen />
                                            Profile
                                        </Link>
                                        <Link to="/login" onClick={() => setOpenDropdown(false)}>
                                            <FiLogIn />
                                            LogOut
                                        </Link>
                                </div>
                                )}
                        </div>
                    ):(

                        <Link to="/login">
                            <button className='user_login'>Login</button>
                        </Link>

                    )}



                    <Link to="shippingcart" className='cart'>
                        {/* <i><BsCart3 /> {cart.length > 0 && <span>{cart.length}</span>}</i> */}
                        <i><BsCart3 /> {cartQuantity > 0 && <span>{cartQuantity}</span>}</i>
                    </Link>

                    <i className='toggle' onClick={() => setResponsive(true)}><RiMenu2Line /></i>

                </div>

            </div>


            {/* Mobile Menu */}
            {responsive && (
                <div className="mobile_menu">
                    <div className="mobile_close" onClick={() => setResponsive(false)}>
                        <RiCloseLine />
                    </div>
                    <NavLink to="/home" className="mobile_menu_link" onClick={() => setResponsive(false)}>Home</NavLink>
                    <NavLink to="/menu" className="mobile_menu_link" onClick={() => setResponsive(false)}>Menu</NavLink>
                    <NavLink to="/contactus" className="mobile_menu_link" onClick={() => setResponsive(false)}>Contact</NavLink>

                    {/* <Link to="/login" className="mobile_account" onClick={() => setResponsive(false)}>
                        <h4>Login</h4>
                    </Link> */}

                    <div className="mobile_account">

                        {user? (

                        <h5>Hi, {user.username.split("")}</h5>

                        ):(
                            <Link to="/login">
                                <button className='user_login'>Login</button>
                            </Link>
                        )}
                        
                    </div>

                </div>
            )}


        </nav>
        </>
    )
}

export default Heading;