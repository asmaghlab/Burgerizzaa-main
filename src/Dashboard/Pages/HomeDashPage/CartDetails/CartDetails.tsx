import React,{useState} from 'react'
import './CartDetails.css';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch,RootState } from "../../../../Store/Store";
import { setCustomerInfo, clearCart, clearItems } from "../../../../Store/CartDashSlice";
import { addToCart } from '../../../../Store/CartDashSlice';
import { type CartDashItem } from '../../../../types';


const CartDetails:React.FC = () => {
    const { items, customerName, location } = useSelector((state: RootState) => state.cartDash);
    const dispatch = useDispatch<AppDispatch>();
    const [, setError] = useState<{ customerName?: string; location?: string }>({});


    const subTotal: number = items?.reduce((sum: number, item: CartDashItem) => {
        return sum + item.price * item.quantity}, 0) || 0;
    const shipping = 50;
    const total = subTotal + shipping;


    // Puch Order To API
    const handleOrderPlace = async() => {

    if (!customerName || !/^[A-Z][a-zA-Z ]*$/.test(customerName)) {
        setError(prev => ({ ...prev, customerName: "Enter Name" }));
        const element = document.getElementById("customerName") as HTMLInputElement;
        if (element) {
            element.focus();
            element.value = "";
            element.placeholder = "Invalid Name";
        }

    }

    if (!location || location.trim().length < 3) {
        setError(prev => ({ ...prev, location: "Enter Address" }));
        const element = document.getElementById("location") as HTMLInputElement;
        if (element) {
            element.focus();
            element.value = "";
            element.placeholder = "Invalid Address";
        }
    }

        // if (!customerName || !location) return;

        if (!items || items.length === 0) return;

        const orderData = {
            date: new Date().toLocaleString(),
            Status: "Pending",
            customerName,
            location,
            items,       
            total,
            source: "dashboard",
        };
        

    const orderDataPost = await axios.post("https://68eec8f4b06cc802829b50f7.mockapi.io/order", orderData);
        console.log(orderDataPost.data);
        dispatch(clearCart());

    };

    const handleIncrease = (id: number) => {
        const item = items.find(item => Number(item.id) === Number(id));
        if (item) dispatch(addToCart({ item, quantity: 1 }));
    };

    const handleDecrease = (id: number) => {
        const item = items.find(item => Number(item.id) === Number(id));
        if (!item) return;
        if (item.quantity === 1) return; 
        dispatch(addToCart({ item, quantity: -1 }));
    };



    return (
        <>
        <div id="cart_details">
            <div className="cart_details">
                <h5 className='mb-2'>Cart Details</h5>

                <div className="cart_details_form">
                    <form className='cart_details_form_card'>
                        <div className='cart_details_form_input'>
                            <label htmlFor="customerName">Customer Name</label>
                            <input type="text" id="customerName" name="customerName" 
                                placeholder="Enter Name"
                                value={customerName}
                                onChange={e => dispatch(setCustomerInfo({ name: e.target.value, location }))}
                            />
                        </div>

                        <div className='cart_details_form_input'>
                            <label htmlFor="location">Location</label>
                            <input type="text" id="location" name="location"
                                placeholder="Enter Address"
                                value={location}
                                onChange={e => dispatch(setCustomerInfo({ name: customerName, location: e.target.value }))}
                            />
                        </div>

                    </form>
                </div>

                <div className="cart_details_order_items mt-3">
                    <div className="cart_details_order_items_head">
                        <h6>Order Items</h6>
                        <button onClick={() => dispatch(clearItems())}>Clear all items</button>
                    </div>

                    <div className="cart_details_orders">
                        <div className="cart_details_order mt-3" >

                            {items && items.length === 0 ?(
                                <p></p>
                            ):(
                                items.map((item:CartDashItem) => (

                                        <div className="cart_details_order_box" key={item.id}>

                                                <div className="cart_details_order_box1 mb-3">
                                                    <div className="cart_details_order_img">
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <div className='cart_details_order_info'>
                                                        <h6>{item.name} x{item.quantity}</h6>
                                                        <p>{item.description?.substring(0, 45)}...</p>
                                                    </div>
                                                </div>

                                                <div className="cart_details_order_box2">
                                                    <p>EGP{item.price * item.quantity}</p>
                                                    <div className="menulist_counter">
                                                        <button onClick={() => handleDecrease(Number(item.id))}>−</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => handleIncrease(Number(item.id))}>+</button>
                                                    </div>
                                                </div>
                                        </div>
                                        
                                ))

                            )}
                        </div>

                    </div>
                </div>

            </div>

            <div className="cart_details_checkout">
                <div className="cart_details_checkout_price">
                    <div className="cart_details-price-col">
                        <p>SubTotal</p>
                        <span> EGP{subTotal}</span>
                    </div>
                    <div className="cart_details-price-col">
                        <p>Shipping</p>
                        <span>{shipping}</span>
                    </div>
                    <div className="cart_details-price-col fs-bold">
                        <p>Total</p>
                        <span>EGP{total}</span>
                    </div>
                </div>

                <button onClick={handleOrderPlace}>Order Place</button>
            </div>
        </div>
        </>
    )
}

export default CartDetails;
