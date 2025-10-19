import React from "react";
import type { CartItem } from "../../../types";
import "./ShippingCart.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch} from 'react-redux';
import { decreaseCart, increase, remove } from '../../../Store/CartSlice';
import type { AppDispatch } from "../../../Store/Store";

interface TableDesctopProduct {
    product: CartItem;
}


const TableDesctop: React.FC<TableDesctopProduct> = ({product}) => {
    const dispatch =useDispatch<AppDispatch>();



    return (
        <>
        <tbody className="table_tbody_left">
            <tr>
            <td>
                <i onClick={()=> dispatch(remove(product.id))}><RxCross2 /></i>
            </td>

            <td className="table_product_img">
                <img src={product.image} alt="" />
            </td>
            <td className="product_info">
                <h4>{product.name}</h4>
                <p>{product.description.substring(0,19)}...</p>
            </td>

            <td className="td_price">EGP {product.price}</td>

            <td>
                <div className="table_quantity">
                <div className="table_quantity_td">
                    <button onClick={()=> dispatch(decreaseCart(product.id))}>-</button>
                    <button>{product.quantity}</button>
                    <button onClick={()=> dispatch(increase(product.id))}>+</button>
                </div>
                </div>
            </td>

            <td className="td_subtotal">EGP {product.price * product.quantity}</td>
            </tr>
        </tbody>
        </>
    );
};

export default TableDesctop;
