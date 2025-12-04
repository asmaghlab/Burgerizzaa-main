import React, { useEffect } from "react";
import './CheckOut.css';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../Store/Store';
import { saveCheckOutPersonalData, sumTotals} from "../../../../Store/CheckOutSlice";
import type { CheckOutData } from "../../../../types";
import { getAllDataCart } from "../../../../Store/CartSlice";
import { CheckoutSchema } from "../../../../Store/CheckoutSchema";
import axios from "axios";

// SweetAlert 
import { orderSuccessAlert } from "../../../Sweet/SweetAlert";



function CheckOut() {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const checkout = useSelector((state: RootState) => state.checkout);
    const user = useSelector((state: RootState) => state.user.user);


    useEffect(() => {
        dispatch(getAllDataCart())
    }, [dispatch]);

    useEffect(() => {
        if (cart.length > 0) {
            dispatch(sumTotals(cart));
        }
    }, [cart, dispatch]);


    const handelInputValidation = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        

        const allInput: (keyof CheckOutData)[] = [
            "firstName", "lastName", "email", "phone", "address", "city"
        ];

        for (const input of allInput) {
            const value = checkout[input as keyof CheckOutData];
            if (!value) {
                const element = document.getElementById(input) as HTMLInputElement;
                if (element) {
                    element.focus();
                    element.placeholder = `${input} (Required)`;
                }
                return;
            }
        }

        const validation =CheckoutSchema.safeParse(checkout);

        if (!validation.success) {
            const errors = validation.error.flatten().fieldErrors;
            const firstErrorField = Object.keys(errors)[0] as keyof CheckOutData;
            const firstErrorMessage = errors[firstErrorField]?.[0];

            const element = document.getElementById(firstErrorField) as HTMLInputElement;

            if (element) {
                element.focus();
                element.value = ""; 
                element.placeholder = firstErrorMessage ?? "Invalid field";
            }

            return;
        }

        if (!user) return;

        const newOrder = {
            date: new Date().toLocaleString(),
            Status:"Pending",
            items: cart,
            checkoutData: checkout,
            userID: user.id,
        };


        try {
            await axios.post("https://68eec8f4b06cc802829b50f7.mockapi.io/order", newOrder);

            orderSuccessAlert()

            console.log(newOrder);

        } catch (error) {
            console.error("Error:", error);
        }

    };



    return (
        <>
            <div id="background_home">
                <section id="checkout" className="section2">
                    <div className="container_box form-billing-data">

                        <form id="form-checkout">

                            <div className="form-billing-input">
                                <h4 className="box_title">Checkout</h4>
                                <h5>Billing Information</h5>

                                <div className="form-input">
                                    <div className="input_box">
                                        <label htmlFor="firstName">First Name <span>*</span></label>
                                        <input type="text" id="firstName" name="firstName" 
                                            value={checkout.firstName}
                                            onChange={(e)=>
                                                
                                                dispatch(saveCheckOutPersonalData({
                                                name:e.target.name as keyof CheckOutData,
                                                value:e.target.value
                                            }))}
                                        />
                                    </div>
                                    <div className="input_box">
                                        <label htmlFor="lastName">Last Name <span>*</span></label>
                                        <input type="text" id="lastName" name="lastName" 
                                            value={checkout.lastName}
                                            onChange={(e)=>dispatch(saveCheckOutPersonalData({
                                                name:e.target.name as keyof CheckOutData,
                                                value:e.target.value
                                            }))}
                                        />
                                    </div>
                                </div>

                                <div className="form-input">
                                    <div className="input_box">
                                        <label htmlFor="phone">Phone <span>*</span></label>
                                        <input type="tel" id="phone" name="phone" 
                                            value={checkout.phone}
                                            onChange={(e)=>dispatch(saveCheckOutPersonalData({
                                                name:e.target.name as keyof CheckOutData,
                                                value:e.target.value
                                            }))}
                                        />
                                    </div>

                                    <div className="input_box">
                                        <label htmlFor="email">Email <span>*</span></label>
                                        <input type="email" id="email" name="email" 
                                            value={checkout.email}
                                            onChange={(e)=>dispatch(saveCheckOutPersonalData({
                                                name:e.target.name as keyof CheckOutData,
                                                value:e.target.value
                                            }))}
                                        />
                                    </div>
                                </div>

                                <div className="form-input">
                                    <div className="input_box">
                                        <label htmlFor="address">Address <span>*</span></label>
                                        <input type="text" id="address" name="address" 
                                            value={checkout.address}
                                            onChange={(e)=>dispatch(saveCheckOutPersonalData({
                                                name:e.target.name as keyof CheckOutData,
                                                value:e.target.value
                                            }))}
                                        />
                                    </div>

                                    <div className="input_box">
                                        <label htmlFor="city">City/Town<span>*</span></label>
                                        <input type="text" id="city" name="city" 
                                            value={checkout.city}
                                            onChange={(e)=>dispatch(saveCheckOutPersonalData({
                                                name:e.target.name as keyof CheckOutData,
                                                value:e.target.value
                                            }))}
                                        />
                                    </div>
                                </div>

                                <div className="input_box">
                                    <textarea id="otherInformation" name="otherInformation" rows={4} placeholder="Additional Information"
                                        value={checkout.otherInformation}
                                        onChange={(e)=>dispatch(saveCheckOutPersonalData({
                                            name:e.target.name as keyof CheckOutData,
                                            value:e.target.value
                                        }))}
                                    ></textarea>
                                </div>

                            </div>
                        </form>

                        <div className="checkout-request">
                            <div className="checkout-items">
                                {cart.map((product)=> (
                                    <div className="checkout-item" key={product.id}>
                                        <div className="checkout-item-col">
                                            <div className="checkout-img">
                                                <img src={product.image} alt="" />
                                            </div>
                                            <div className="checkout-cart-data">
                                                <p>{product.description?.substring(0,30)}...</p>
                                                <h6>{product.name.substring(0,15)} (x{product.quantity})</h6>
                                            </div>
                                        </div>
                                        <p>EGP {product.price} </p>
                                    </div>
                                ))}
                            </div>

                            <div className="Checkout-price">
                                <div className="checkout-price-col">
                                    <p>SubTotal</p>
                                    <span> EGP {checkout.subTotal.toFixed(2)} </span>
                                </div>
                                <div className="checkout-price-col">
                                    <p>Shipping</p>
                                    <span>{checkout.shipping}</span>
                                </div>
                                <div className="checkout-price-col">
                                    <p>Total</p>
                                    <span>EGP {checkout.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button type="button" className='btn_order' onClick={handelInputValidation}>Place Order</button>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
};

export default CheckOut;