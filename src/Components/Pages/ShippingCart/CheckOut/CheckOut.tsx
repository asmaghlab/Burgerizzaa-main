import React from "react";
import { useEffect } from "react";
import './CheckOut.css';
import {  useSelector, useDispatch  } from 'react-redux';
import type { RootState } from '../../../../Store/Store';
import { saveCheckOutPersonalData, sumTotals } from "../../../../Store/CheckOutSlice";
import type { CheckOutData } from "../../../../types";
import BillOrder from "./BillOrder";


function CheckOut() {

    const cart =useSelector((state: RootState)=> state.cart);
    const dispatch = useDispatch();
    const checkout = useSelector((state: RootState) => state.checkout);

    const [showBill, setShowBill] = React.useState(false);


    useEffect(() => {
        dispatch(sumTotals(cart));
    }, [cart, dispatch]);


    // const handelInputValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();

    //     const allInput: (keyof CheckOutData)[] = [
    //         "firstName",
    //         "lastName",
    //         "email",
    //         "phone",
    //         "address",
    //         "city",
    //         "radioBox",
    //     ];


    //     for (let input of allInput) {
    //         const value = checkout[input];

    //     if (!value) {
    //         const element = document.getElementById(input) as HTMLInputElement | HTMLTextAreaElement  | null;
    //         if (element) {
    //             element.focus();

    //             const fieldName = input.charAt(0).toUpperCase() + input.slice(1);
    //             element.placeholder = `${fieldName} (Required)`;

    //         } 
    //         return; 
    //         }
            
    //     }
        
    //     setShowBill(true);
    //     console.log(checkout); 
        
    // };



    const handelInputValidation = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const allInput: (keyof CheckOutData)[] = [
            "firstName", "lastName", "email", "phone", "address", "city", "radioBox"
        ];

        for (let input of allInput) {
            const value = checkout[input];
            if (!value) {
                const element = document.getElementById(input) as HTMLInputElement;
                if (element) {
                    element.focus();
                    element.placeholder = `${input} (Required)`;
                }
                return;
            }
        }

        const newOrder = {
            date: new Date().toLocaleString(),
            items: cart,
            checkoutData: checkout
        };

        try {
            await fetch("https://68eec8f4b06cc802829b50f7.mockapi.io/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder)
            });

            setShowBill(true);

        } catch (error) {
            console.error("Error saving order:", error);
        }
    };










    function closeBill() {
        setShowBill(false);
    }

    return (
        <>
            <div id="background_home">

                <section id="checkout">
                    <div className="container_box form-billing-data">

                        <form id="form-checkout">

                            <div className="form-billing-input">

                                <h4 className="box_title">Checkout</h4>

                                <h5> Billing Information</h5>

                                <div className="form-input">
                                    <div className="input_box">
                                        <label htmlFor="firstName">First Name <span>*</span></label>
                                        <input type="text" id="firstName" name="firstName" 
                                        value={checkout.firstName}
                                        onChange={(e)=>dispatch(saveCheckOutPersonalData({
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
                                        required />
                                    </div>
                                </div>

                                <div className="input_box">
                                    <textarea id="otherInformation" name="otherInformation" rows="4" placeholder="Additional Information"
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

                                {
                                    cart.map((product)=> (
                                        <div className="checkout-item" key={product.id} >                                        
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
                                    ))
                                }

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


                                {/* <div className="input_radio input_box">
                                    <h5> Payment</h5>
                                    <label>
                                        <input type="radio" name="radioBox" 
                                        checked={checkout.radioBox}
                                        onChange={()=>
                                            dispatch(saveCheckOutPersonalData({ name: "radioBox", value: true }))
                                        }
                                        />
                                        Cash on Delivery
                                    </label>
                                </div> */}

                            <button className='btn_order' onClick={handelInputValidation}>Place Order</button>

                        </div>

                    </div>
                </section>

            </div>


            {showBill && (
                <BillOrder onClose={closeBill}/>
            )}

        </>
    );
};

export default CheckOut;
