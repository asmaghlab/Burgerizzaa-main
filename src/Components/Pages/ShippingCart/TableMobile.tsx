import React from "react";
import "./ShippingCart.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch} from 'react-redux';
import { increase,  decreaseCart, remove } from '../../../Store/CartSlice';
import type { AppDispatch } from "../../../Store/Store";


const TableMobile: React.FC = ({product}) => {
    const dispatch =useDispatch<AppDispatch>();

    
    return (
        <>
        <tr className="tbody_icon">
            <td>         
            <i onClick={()=> dispatch(remove(product.id))}><RxCross2 /></i>
            </td>
        </tr>
        <tr>
            <th rowSpan={2} className="table_product_img_response">
            <img src={product.image} alt="" />
            </th>
            <td colSpan={2} className="product_info_res">
            <h4>{product.name ? product.name.substring(0,6): ""}</h4>
            <p>{product.description ? product.description.substring(0,10): ""} </p>
            </td>
        </tr>
        <tr>
            <th>Price</th>
            <td className="td_price">EGP {product.price}</td>
        </tr>


        <tr>
            <th></th>
            <th>Quantity</th>
            <td className='table_quantity'>
                <div className='table_quantity_td'>
                    <button onClick={()=> dispatch(decreaseCart(product.id))}>-</button>
                    <button>{product.quantity}</button>
                    <button onClick={()=> dispatch(increase(product.id))}>+</button>
                </div>
            </td>
        </tr>
        </>
    );
};

export default TableMobile;
