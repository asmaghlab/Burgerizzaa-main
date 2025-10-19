import './Orders.css';



const Orders = () => {
    return (
        <>

        <div id="Orders_users">
            <div className="orders_users_cards">



                <div className="orders_user_card">

                    <div className="order_user_data pb-3">
                        <h5>Order 352</h5>
                        <p>23 Feb 2021, 08:28 PM</p>
                    </div>



                    <div className="order_user_items">
                        <div className="order_user_item">
                            <img src="/src/assets/Images/menu_img/burger_img1.png" alt="" />
                            <div className="order_card_item_des">
                                <h6>Vegetable Mixups</h6>
                                <p>Mixups With Egg Vegetable </p>

                                <div className="order_item_price pb-2 fw-medium">
                                    <p>EGP3.30</p>
                                    <p>Qty:1</p>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="order_action pt-2 mt-3">
                        <div className="order_action_data">
                            <p>x2 items</p>
                            <p className='fw-medium'>EGP10.60</p>
                        </div>

                        <div className="order_action_btn">
                            <button>X</button>
                        </div>
                    </div>
                </div>



            </div>
        </div>
        
        </>
    )
}

export default Orders