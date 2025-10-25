import React, { useEffect, useState } from 'react'
import './MenuList.css';
import { LuSearch } from "react-icons/lu";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { BiSolidDish } from "react-icons/bi";
import { PiPizza } from "react-icons/pi";
import { PiHamburgerFill } from "react-icons/pi";
import { RiDrinksFill } from "react-icons/ri";
import { LuDessert } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch  } from '../../../../Store/Store';
import type {Menu } from '../../../../types';
import { getAllMenuData } from '../../../../Store/DashboardMenuSlice';
import { addToCart } from '../../../../Store/CartDashSlice';

const categories = [
    { label:"All Menu", name: 'All', icon: <BiSolidDish /> },
    { label:"Pizza", name: 'Pizza', icon: <PiPizza /> },
    { label:"Burger", name: 'Burger', icon: <PiHamburgerFill /> },
    { label:"Drinks", name: 'Drinks', icon: <RiDrinksFill /> },
    { label:"Dessert", name: 'Dessert', icon: <LuDessert /> },
];



const MenuList:React.FC = () => {

    const dispatch =useDispatch<AppDispatch>();
    const { menuData } = useSelector((state: RootState) => state.dashboardMenu);
    const [filterMenu, setFilterMenu] = useState<string>('All');
    const [menuQty, setMenuQty ] =useState<{[key: number]: number}>({});
    const [searchFoodName, setSearchFoodName] = useState('');


    useEffect(()=> {
        dispatch(getAllMenuData())
    },[dispatch])

    const increaseQty= (id:number)=> {
        setMenuQty(item => ({...item, [id]:(item[id] || 1) + 1}));
    }

    const decreaseQty = (id: number) => {
        setMenuQty(item => ({ ...item, [id]: item[id] && item[id] > 1 ? item[id] - 1 : 1 }));

    };

    const handleAddToCart = (item: Menu) => {
        const quantity = menuQty[Number(item.id)] || 1;
        dispatch(addToCart({ item, quantity }));
        setMenuQty(prev => ({ ...prev, [item.id]: 1 }));
    };





    return (
        <>
        <div id="menulist">
            <div className="menulist">

                <div className="menulist_head">
                    <h5>Menu List</h5>
                    <div className="menulist_search">
                        <p><i><RiCheckboxMultipleBlankLine /></i>Input manually</p>
                        <div className="input-group" style={{ width: '300px' }}>
                            <span className="input-group-text" style={{background:"rgba(245, 200, 200, 0.268)"}}>
                                <LuSearch />
                            </span>
                            <input
                                type="text"
                                className="form-control menulist_search"
                                placeholder="Search for food"
                                value={searchFoodName}
                                onChange={(e)=> setSearchFoodName(e.target.value)}
                                style={{ outline: "none", boxShadow: "none",borderColor: "rgba(245, 200, 200, 0.268)"  }}

                            />
                        </div>
                    </div>

                </div>

                <div className="menulist_filter">

                    {categories.map((cate)=> {
                        const countCategoryItem = cate.name === 'All' ? menuData.length : menuData.filter(menuItem => menuItem.category === cate.name).length;
                        return (
                        <button 
                        key={cate.name}
                        onClick={() => setFilterMenu(cate.name)}
                        className={filterMenu === cate.name ? 'active' : ''}
                        >
                            <i>{cate.icon}</i>
                            <p> {cate.label} <span>{countCategoryItem} items</span></p>
                        </button>
                        )
                    })}
                </div>



                <div className="menulist_cards">

                    {menuData

                    .filter((menuItem: Menu) => 
                        (filterMenu === 'All' || menuItem.category === filterMenu) &&
                        menuItem.name.toLowerCase().includes(searchFoodName.toLowerCase())
                    )
                    .map((item:Menu)=> (
                        <div className="menulist_card" key={item.id}>
                            <div className="menulist_card_img">
                                <img src={item.image} alt="" />
                            </div>

                            <div className="menulist_inf mt-2">
                                <h6>{item.name}</h6>
                                <p>{item.description?.substring(0,45)}...</p>
                            </div>

                            <div className="menulist_button mt-2">
                                <div className="menulist_counter">
                                    <button onClick={() => decreaseQty(Number(item.id))}>−</button>
                                    <span>{menuQty[Number(item.id)] || 1}</span>
                                    <button onClick={() => increaseQty(Number(item.id))}>+</button>
                                </div>

                                <button onClick={() => handleAddToCart(item)}>Add to cart</button>
                            </div>
                        </div>
                    ))}



                </div>
            </div>
        </div>
        
        
        </>
    )
}

export default MenuList;