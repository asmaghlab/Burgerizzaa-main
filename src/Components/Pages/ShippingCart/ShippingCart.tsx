import React, { useEffect } from 'react';
import './ShippingCart.css';
import { Link } from 'react-router-dom';
import TableDesctop from './TableDesctop';
import TableMobile from './TableMobile';
import { useDispatch, useSelector } from 'react-redux';
import type {  AppDispatch, RootState} from '../../../Store/Store';
import CartEmpty from './CartEmpty';
import { getAllDataCart } from '../../../Store/CartSlice';


const ShippingCart:React.FC = () => {

    const cart =useSelector((state: RootState)=> state.cart);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartQuantity =cart.reduce((total, item) => total + item.quantity, 0)

    const dispatch=useDispatch<AppDispatch>();

    // useEffect(() => {
    //     dispatch(getAllDataCart());
    // }, [dispatch]);

    useEffect(()=> {
        dispatch(getAllDataCart());
    }, [dispatch])




    if (cart.length === 0) {
        return <CartEmpty/>
    }




    return (
    <div id="background_home">
        <section id="cart" className='section2'>


            <div className="cart_container container_box">
                <div className="cart_title">
                    <h1>Menu Cart</h1>
                </div>
            </div>


            <div id="cart_shipping">

                <div className="cart_shipping_container container_box">

                    <table className="cart_table_left">
                        
                        <thead  className='table_head'>
                            <tr>
                                <th></th>
                                <th colSpan={2}>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>


                        {/* Table Desktop */}
                        {
                            cart.map((product)=> (
                                <TableDesctop  product={product} key={product.id}/> 
                            ))
                        }
                            
                                            

                    </table>

                    <table className="responsive_table">
                        <tbody className='tbody_response'>

                            {
                                cart.map((product) => (
                                    <TableMobile  product={product} key={product.id}/>
                                ))
                            }

                            <tr>
                                <th></th>
                                <th>Subtotal</th>
                                <td className="td_subtotal">
                                    EGP {totalPrice}
                                </td>
                            </tr>
                        </tbody>    
                    </table>





                    <table className="cart_table_right">
                        <thead className='table_head_right'>
                            <tr>
                                <th>Order Summary</th>
                            </tr>
                        </thead>
                        <tbody className='table_tbody_right'>
                            <tr><td>Items : <span>{cartQuantity}</span></td></tr>
                            <tr><td> SubTotal : <span>EGP {totalPrice}</span></td></tr>
                            <tr><td>Shipping : <span>50</span> </td></tr>
                        </tbody>
            
                        <tbody  className='total'>
                            <tr><td> Total : <span>EGP {totalPrice + 50}</span></td></tr>
                        </tbody>
            
                        <tfoot>
                            <tr>
                                <td>
                                    <Link to="checkout">
                                    <button className='btn_cart'>Proceed to Checkout</button>
                                    </Link>
                                </td>
                            </tr>
                        </tfoot>
                    </table>





                </div>
            </div>
        </section>
    </div>
    )
}

export default ShippingCart;
