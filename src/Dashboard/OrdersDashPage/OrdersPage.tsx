import React, {useState, useEffect} from 'react'
import './OrdersPage.css';
import { LuSearch } from "react-icons/lu";
import type { CartItem, Order } from '../../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Store/Store';

const OrdersPage:React.FC = () => {
        const [orders, setOrders]=useState<Order[]>([]);
        const [searchOrder, setsearchOrder] = useState('');
        const [hoveredOrderUserInfo, setHoveredOrderuserInfo] = useState<number | null>(null);
        const user = useSelector((state: RootState) => state.user.user);
        const { customerName, location }  = useSelector((state: RootState) => state.cartDash);


        const getAllOrdersData= async ()=> {
            try {
                const ordersData= await fetch("https://68eec8f4b06cc802829b50f7.mockapi.io/order");
                const data =await ordersData.json()

                const object = data.map((order:Order) => ({
                    ...order,
                    id: Number(order.id),
                    source: order.source || "website"
                }));

                const newOrders: Order[] = [];
                object.forEach((order:Order) => newOrders.unshift(order));
                setOrders(newOrders);
                console.log(newOrders );
                

            } catch(error) {
                console.log( error );
                
            }
        };



        const handleUpdateStatus = async (orderId:number) => {
            try {

                const currentOrderStatus = orders.find(order => order.id === orderId);
                if (!currentOrderStatus) return;

                let newStatus = "Pending";
                if (currentOrderStatus.Status === "Pending") newStatus = "Shipped";
                else if (currentOrderStatus.Status === "Shipped") newStatus = "Completed";
                else if (currentOrderStatus.Status === "Completed") newStatus = "Completed";

                await fetch(`https://68eec8f4b06cc802829b50f7.mockapi.io/order/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Status: newStatus }),
                });


                setOrders(item =>
                item.map(order =>
                    order.id === orderId ? { ...order, Status: newStatus } : order
                )
                );

            } catch (error) {
                console.log(error , orderId);
            }
        };



        const handleCancelOrder = async (orderId: number) => {
            try {
                const newStatus = "Cancelled";

                await fetch(`https://68eec8f4b06cc802829b50f7.mockapi.io/order/${orderId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ Status: newStatus }),
                });

                setOrders(item =>
                    item.map(order =>
                        order.id === orderId ? { ...order, Status: newStatus } : order
                    )
                );

            } catch (error) {
                console.log(error, orderId);
            }
        };

        const fOrders = orders.filter(order => 
        order.id.toString().includes(searchOrder)
        );

        useEffect(() => {
            getAllOrdersData();
        }, []);


    return (
        <>
        <div id="OrdersPage">
            <div className="orderPage">
                    <div className="menulist_head px-3">
                        <h5>Menu List</h5>
                        <div className="menulist_search">
                            <div className="input-group" style={{ width: '300px' }}>
                                <span className="input-group-text" style={{background:"rgba(245, 200, 200, 0.268)"}}>
                                    <LuSearch />
                                </span>
                                <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Search by Order ID"
                                    value={searchOrder}
                                    onChange={(e) => setsearchOrder(e.target.value)}
                                    style={{ outline: "none", boxShadow: "none",borderColor: "rgba(245, 200, 200, 0.268)"  }}
                                />
                            </div>
                        </div>
    
                    </div>

                    <div className="orders_users_cards ordars_page_cards mt-5">
                        
                            {fOrders.map((order)=> (
                                
                                <div className={`orders_user_card ordars_page_card ${order.Status.toLowerCase()}`} key={order.id}>
            
                                    <div className="order_user_data d-flex justify-content-between align-items-start pb-3">
                                        <div className="order_user_data_head">
                                            <h5
                                                onMouseEnter={() => setHoveredOrderuserInfo(order.id)}
                                                onMouseLeave={() => setHoveredOrderuserInfo(null)}
                                            >Order {order.id}  <span className="order_source" style={{display:"none"}}>({order.source})</span></h5>


                                            {hoveredOrderUserInfo === order.id && (
                                                <div className="user_info_box">
                                                    {order.source === "website" && user && (
                                                        <>
                                                            <p><strong>Name:</strong> {user.username}</p>
                                                            <p><strong>Email:</strong> {user.email}</p>
                                                            <p><strong>Phone:</strong> {user.phone}</p>
                                                        </>
                                                    )}

                                                    {order.source === "dashboard" && (
                                                        <>
                                                            <p><strong>Name:</strong> {order.customerName}</p>
                                                            <p><strong>Location:</strong> {order.location}</p>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                                                                        

                                            

                                            <p>{order.date}</p>
                                        </div>
                                        <span className={`order_status ${order.Status.toLowerCase()}`}>
                                            {order.Status}
                                        </span>
                                    </div>
            
            
            
                                    <div className="order_user_items">
            
                                        {order.items.map((item:CartItem)=> (

                                            <div className="order_user_item" key={item.id}>
                                                <img src={item.image} alt={item.name} />
                                                <div className="order_card_item_des">
                                                    <h6>{item.name.substring(0, 20)}</h6>
                                                    <p>{item.description?.substring(0, 25)}...</p>
            
                                                    <div className="order_item_price pb-2 fw-medium">
                                                        <p>{item.price}</p>
                                                        <p>Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
            
                                            </div>
                                        ))}
            
            
                                    </div>
            
            
                                    <div className="order_action pt-2 mt-3">
                                        <div className="order_action_data">
                                            <p>x{order.items.length} items</p>
                                            <p className='fw-medium'>EGP{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 50}</p>
                                        </div>
            
                                        <div className="order_action_btn orders_page_btn">
                                            <button onClick={() => handleCancelOrder(order.id)}>X</button>
            
                                            {order.Status !== "Completed" && (
                                                <button onClick={() => handleUpdateStatus(order.id)}
                                            >✓</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>



            </div>
        </div>

        </>
    )
}

export default OrdersPage