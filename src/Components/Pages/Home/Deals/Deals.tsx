import React from 'react'
import './Deals.css';
import { Link } from 'react-router-dom';
// import { IoIosArrowForward } from "react-icons/io";
import { GiRoundStar } from "react-icons/gi";


const Deals:React.FC = () => {
    return (
        <>
        <div id="deals">
            <div className="container_box">

                <div className="deals_header">
                    <h3>Deals Of The Day</h3>
                    {/* <Link to="/menu" className='deals_btn'>
                        All Deals
                        <i><IoIosArrowForward /></i> 
                    </Link> */}
                </div>


                <div className="deals_cards">


                    <div className="deal_card">
                        <div className="deal_card_box">

                            <div className="deal_card-desc">
                                <h5>McDonald's - Dubai</h5>
                                <p>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                </p>

                                <div className="deals_items mt-3">
                                    <p>🍔 2 McDnanald's Burger</p>
                                    <p>🍹 2 Hard Drinks -250ml</p>
                                    <p>🍟 1 Franch Fries - Regular</p>
                                </div>

                                <div className="deals_price mt-3">
                                        {/* <span>Total Coast:</span> */}
                                        <span>EGP500</span>
                                        <span>EGP600</span>
                                </div>
                            </div>

                            <div className="deal_img">
                                <img src="/src/assets/Images/Deals/pizza_burgers2.png" alt="" />
                            </div>



                            <Link to="/menu" className='deal_card_btn'>
                            Order Now
                            </Link>
                        </div>
                    </div>


                    <div className="deal_card">
                        <div className="deal_card_box">

                            <div className="deal_card-desc">
                                <h5>McDonald's - Dubai</h5>
                                <p>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                </p>

                                <div className="deals_items mt-3">
                                    <p>🍕 2 McDnanald's Burger</p>
                                    <p>🍹 2 Hard Drinks -250ml</p>
                                    <p>🍟 1 Franch Fries - Regular</p>
                                </div>

                                <div className="deals_price mt-3">
                                        {/* <span>Total Coast:</span> */}
                                        <span>EGP500</span>
                                        <span>EGP600</span>
                                </div>
                            </div>

                            <div className="deal_img">
                                <img src="/src/assets/Images/Deals/Pizza.png" alt="" />
                            </div>



                            <Link to="/menu" className='deal_card_btn'>
                            Order Now
                            </Link>
                        </div>
                    </div>



                    <div className="deal_card">
                        <div className="deal_card_box">

                            <div className="deal_card-desc">
                                <h5>McDonald's - Dubai</h5>
                                <p>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                    <i><GiRoundStar/></i>
                                </p>

                                <div className="deals_items mt-3">
                                    <p>🍕 2 McDnanald's Burger</p>
                                    <p>🍹 2 Hard Drinks -250ml</p>
                                    <p>🍟 1 Franch Fries - Regular</p>
                                </div>

                                <div className="deals_price mt-3">
                                        {/* <span>Total Coast:</span> */}
                                        <span>EGP500</span>
                                        <span>EGP600</span>
                                </div>
                            </div>

                            <div className="deal_img">
                                <img src="/src/assets/Images/Deals/Burger1.png" alt="" />
                            </div>



                            <Link to="/menu" className='deal_card_btn'>
                            Order Now
                            </Link>
                        </div>
                    </div>


                </div>

            </div>
        </div>
        
        </>
    )
}

export default Deals;