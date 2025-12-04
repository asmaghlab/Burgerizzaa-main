import './Heading.css'
import { useEffect } from 'react';
// import { IoLogInOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";

import { RiMenu2Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri";
// import { RiUser3Line } from "react-icons/ri";

import { LuUserPen } from "react-icons/lu";
// import { GoChecklist } from "react-icons/go";
import { FiLogIn } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";

import { clearCartAll } from "../../Store/CartSlice";
import { logout } from '../../Store/Userslice';
import SmartLink from '../Common/SmartLink';


function Heading() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

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


    const handleLogout= async ()=> {
        setOpenDropdown(false);
            
        dispatch(clearCartAll());
        dispatch(logout()) 
        navigate("/home"); 
    }

    return (
        <>
        <nav id="heading" className={headingScrolled ? "headingScrolled":""}>
            <div className="heading container_box">

                <div className="heading_logo">
                    <div className="logo_text">
                        <SmartLink to="/"><h1>Burgerizza</h1></SmartLink>
                    </div>
                </div>

                <div className="heading_menu" >
                    <SmartLink to="/home" className="menu">Home</SmartLink>
                    <SmartLink to="/menu"  className="menu">Menu</SmartLink>
                    <SmartLink to="/review" className="menu">Review</SmartLink>
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
                                        <Link to="/home" onClick={handleLogout}>
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



                    <Link to="/shippingcart" className='cart'>
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
                    <SmartLink to="/home" className="mobile_menu_link" onClick={() => setResponsive(false)}>Home</SmartLink>
                    <SmartLink to="/menu" className="mobile_menu_link" onClick={() => setResponsive(false)}>Menu</SmartLink>
                    <SmartLink to="/review" className="mobile_menu_link" onClick={() => setResponsive(false)}>ReviewUs</SmartLink>

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