import React from 'react'
import './Test.css';

const Test:React.FC = () => {
    return (
        <>
        <div id="test">
            <div className="test_container container_box">
                <div className="test_box_img">
                    <img src="/src/assets/Images/testpizza.png" alt="" />
                </div>



                <div className="test_desc_boxs">
                    <h3 className='mb-3'>Why People Choose us?</h3>

                    <div className="test_desc_box">
                        <div className="test_desc_img">
                            <img src="/public/01.png" alt="" />
                        </div>
                        <div className="test_desc_text">
                            <h6>Convenient and Reliable</h6>
                            <p>Whether you dine in, take out, or order delivery,
                                our service is convenient, fast, and reliable, 
                                making mealtime hassle-free.</p>
                        </div>
                    </div>


                    <div className="test_desc_box">
                        <div className="test_desc_img">
                            <img src="/public/02.png" alt="" />
                        </div>
                        <div className="test_desc_text">
                            <h6>Variety of Options</h6>
                            <p>From hearty meals to light snacks,
                                we offer a wide range of options to suit every taste and craving.</p>
                        </div>
                    </div>

                    <div className="test_desc_box">
                        <div className="test_desc_img">
                            <img src="/public/03.png" alt="" />
                        </div>
                        <div className="test_desc_text">
                            <h6>Eat Burger</h6>
                            <p>Our burgers are grilled to perfection, with juicy 
                                patties and flavorful toppings that make every bite a delicious 
                                experience.</p>
                        </div>
                    </div>



                </div>



            </div>
        </div>
        
        
        </>
    )
}

export default Test