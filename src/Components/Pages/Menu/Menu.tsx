import './Menu.css';
import type { Menu as MenuType } from '../../../types';
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../Store/Store';
import { getAllMenuData } from '../../../Store/MenuSlice';
import { add, increase, decrease } from '../../../Store/CartSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { addToCartAlert, loginPromptAlert } from "../../Sweet/SweetAlert";

function Menu() {

    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();
    const { menuData, loading, error } = useSelector((state: RootState) => state.menu);
    const navigate = useNavigate();
    const cart = useSelector((state: RootState) => state.cart);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 12;

    const location = useLocation();
    const initialCategory = location.state?.category || "Menu";
    const [activeFilter, setActiveFilter] = useState<string>(initialCategory);

    useEffect(() => {
        dispatch(getAllMenuData());
    }, [dispatch]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleAddClick = (item: MenuType) => {
        if (!user) {
            loginPromptAlert(() => navigate("/login"));
            return;
        }
        dispatch(add(item));
        addToCartAlert(item.name);
    };


    const handleIncrement = (id: number) => {
        dispatch(increase(id));
    };

    const handleDecrement = (id: number) => {
        dispatch(decrease(id));
    };

    const handleProductClick = (id: number) => {
        navigate(`/menu/${id}`);
    };

    // ✅ لازم ييجي بعد تعريف activeFilter
    const filteredMenuData = activeFilter === "Menu"
        ? menuData
        : menuData.filter((item) => item.category === activeFilter);

    const totalPages = Math.ceil(filteredMenuData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredMenuData.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div id="menus">
            <div className="menus_container container_box">
                <div className="menu_title">
                    <h1>Our Menu</h1>
                </div>

                <div className="Menu_btns">
                    {["Menu", "Burger", "Pizza", "Drinks", "Dessert"].map((category) => (
                        <button
                            key={category}
                            className={activeFilter === category ? "active" : ""}
                            onClick={() => setActiveFilter(category)}
                        >
                            <span className="emoji">
                                {category === "Menu" && "📜"}
                                {category === "Burger" && "🍔"}
                                {category === "Pizza" && "🍕"}
                                {category === "Drinks" && "🍹"}
                                {category === "Dessert" && "🍰"}
                            </span>
                            <p>{category}</p>
                        </button>
                    ))}
                </div>

                <div className="menu_items">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        currentItems.map((item: MenuType) => (
                            <div className="menu_item" key={item.id}>
                                <div
                                    className="menu_item_img"
                                    onClick={() => handleProductClick(item.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <img src={item.image} alt="" />
                                </div>

                                <div className="menu_item_data">
                                    <div
                                        className="menu_item_col1"
                                        onClick={() => handleProductClick(item.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <h3>{item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}</h3>
                                    </div>
                                    <div className="item_star">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaRegStar />
                                    </div>
                                    <div className="menu_item_col2">
                                        <p>{item.description?.substring(0, 25)}...</p>
                                    </div>

                                    <div className="menu_item_col3">
                                        {(() => {
                                            const cartItem = cart.find((cartItem) => cartItem.id === item.id);

                                            if (cartItem) {
                                                return (
                                                    <div className="counter_item_btn">
                                                        <button onClick={() => handleDecrement(item.id)}>−</button>
                                                        <span>{cartItem.quantity}</span>
                                                        <button onClick={() => handleIncrement(item.id)}>+</button>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <button
                                                        className="menu_item_btn"
                                                        onClick={() => handleAddClick(item)}
                                                    >
                                                        <BsCart3 />
                                                    </button>
                                                );
                                            }
                                        })()}
                                        <p>{item.price}<span>EGP</span></p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ✅ Pagination */}
                {totalPages > 1 && (
                    <div
                        className="pagination-container"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '40px',
                            gap: '10px',
                        }}
                    >
                        <button
                            className="btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #ad343e',
                                backgroundColor: currentPage === 1 ? 'rgba(255, 255, 255, 0.346)' : 'transparent',
                                color: currentPage === 1 ? '#6c757d' : '#ad343e',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className="btn"
                                onClick={() => handlePageChange(page)}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ad343e',
                                    backgroundColor: currentPage === page ? '#ad343e' : 'transparent',
                                    color: currentPage === page ? 'white' : '#ad343e',
                                    cursor: 'pointer',
                                    minWidth: '40px',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className="btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: '1px solid #ad343e',
                                backgroundColor: currentPage === totalPages ? 'rgba(255, 255, 255, 0.346)' : 'transparent',
                                color: currentPage === totalPages ? '#6c757d' : '#ad343e',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}

                {totalPages > 1 && (
                    <div
                        className="page-info"
                        style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            color: '#6c757d',
                            fontSize: '14px',
                        }}
                    >
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredMenuData.length)} of {filteredMenuData.length} items
                    </div>
                )}
            </div>
        </div>
    );
}

export default Menu;
