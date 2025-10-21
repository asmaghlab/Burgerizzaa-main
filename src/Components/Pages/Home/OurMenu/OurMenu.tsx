
import '../../Menu/Menu.css';
import './OurMenu.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { CartItem, Menu as MenuType } from "../../../../types";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { add, increase, decrease, getAllDataCart } from "../../../../Store/CartSlice";
import type { RootState, AppDispatch } from "../../../../Store/Store";

import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";


import { FaArrowRightLong } from "react-icons/fa6";
import { getAllMenuData } from '../../../../Store/MenuSlice';


const OurMenu = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart);
    // const user = useSelector((state: RootState) => state.user);

    const {menuData} = useSelector((state: RootState) => state.menu);
    const AllMenuData = menuData.slice(0, 8);

    useEffect(() => {
        dispatch(getAllMenuData());
        dispatch(getAllDataCart());
    }, [dispatch]);

    // Get MenuData Using ReactQuary

    // const { data} = useQuery<MenuType[]>({
    //     queryKey: ["menuData"],
    //     queryFn: async () => {
    //     const getAllMenuData = await fetch("https://68e3e5f38e116898997a5f72.mockapi.io/items");
    //     return getAllMenuData .json();
    //     },
    // });

    // const AllMenuData = data?.slice(0, 8) || [];

    const handleAddClick = (product: MenuType) => {
        // if (!user) {
        // alert("You need to login first!");
        // navigate("/login");
        // return;
        // }

        const object = {
            ...product,
            id: String(product.id)
        };
        dispatch(add(object));
    };


    const handleIncrement = (cartItem:CartItem) => {
        dispatch(increase(cartItem));
        console.log(cartItem);
    };

    const handleDecrement = (cartItem:CartItem) => {
        dispatch(decrease(cartItem));
    };

    const handleProductClick = (id: number) => {
        navigate(`/menu/${id}`);
    };


    return (
        <>
        
        <div id="ourmenu" className='pb-5 '>
            <div className="ourmenu container_box">

                <div className="ourmenu_header">
                    <Link to="/menu">
                        <button className='ourmenu_btn'>View All Menu
                            <i className='p-2'><FaArrowRightLong /></i>
                        </button>
                    </Link>
                    
                </div>
                

                <div className=" menu_items ourmenu_item">

                    {
                        AllMenuData.map((item:MenuType)=> (
                            <div className="menu_item" key={item.id}>
                                <div 
                                    className="menu_item_img"
                                    onClick={() => handleProductClick(Number(item.id))} 
                                    style={{ cursor: "pointer" }}
                                >
                                    <img src={item.image} alt="" />
                                </div>

                                <div className="menu_item_data">
                                    <div 
                                        className="menu_item_col1"
                                        onClick={() => handleProductClick(Number(item.id))}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <h3>{item.name.length > 12 ? item.name.slice(0, 12) + "..." : item.name}</h3>
                                        <div className="item_star">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaRegStar />
                                        </div>
                                    </div>
                                    <div className="menu_item_col2">
                                        <p>{item.description ? item.description.substring(0, 25) : ''}...</p>
                                    </div>


                                    <div className="menu_item_col3">
                                        {
                                            (() => {
                                                const cartItem = cart.find((cartItem) => Number(cartItem.id) === Number(item.id));

                                                return cartItem ? (
                                                    <div className="counter_item_btn">
                                                        <button onClick={() => handleDecrement(cartItem)} >−</button>
                                                        <span>{cartItem.quantity}</span>
                                                        <button onClick={() => handleIncrement(cartItem)}>+</button>
                                                    </div>
                                                ):(
                                                    <button className='menu_item_btn' onClick={() => handleAddClick(item)}  >
                                                        <BsCart3 />
                                                    </button>
                                                );
                                                
                                            }
                                        
                                        )()
                                        }

                                        <p>{item.price}<span>EGP</span></p>
                                    </div>
                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
        
        
        </>
    )
}

export default OurMenu