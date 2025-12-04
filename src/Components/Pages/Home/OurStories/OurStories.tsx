import React from 'react';
import './OurStoriers.css';

const OurStories:React.FC = () => {
    return (
        <>
        <div id="ourstories">
            <div className="container_box ourstories">

                <div className='ourstories_img_box'>

                    <div className='outstories_img_box'>
                        <div className="ourstories_img">
                            <img src="/src/assets/Images/ourstories.png" alt="" />
                        </div>
                    </div>

                </div>


                <div className="ourstories_box">
                    <div className="ourstiries_desc">
                        <p className='mb-3'>Our Experience</p>
                        <h3>Our <span>Stories</span> Have <br /> Adventures.</h3>
                        <p className='mb-3'>There are many variations of passages of Lorem Ipsum available,
                            but the majority have suffered alteration in some form by injected humour.</p>
                    </div>

                    <div className="ourstories_cards">
                        <div className="ourstories_card">
                            <h4>12k+</h4>
                            <p>Success Food</p>
                        </div>

                        <div className="ourstories_card">
                            <h4>16k+</h4>
                            <p>Awards Winning</p>
                        </div>


                        <div className="ourstories_card">
                            <h4>20+</h4>
                            <p>Years of Experience</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default OurStories