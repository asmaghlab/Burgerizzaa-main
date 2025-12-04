import { useEffect, useState } from 'react';
import './Orders.css';
import type { CartItem, Order } from '../../../../types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../Store/Store';

const Orders = () => {

    const [orders, setOrders]=useState<Order[]>([]);
    const user = useSelector((state:RootState)=> state.user.user);


    useEffect(()=> {
        if (!user) return;

        const getAllOrdersData= async ()=> {
            try {
                const ordersData= await fetch("https://68eec8f4b06cc802829b50f7.mockapi.io/order");
                const data =await ordersData.json()

                const userOrders = data.filter((order: any) => order.userID === user?.id);
                setOrders(userOrders);

            } catch(error) {
                console.log("Error:" , error );
                
            }
        };

        getAllOrdersData()
    },[user])


    const handleCancelOrder = async (orderId: number) => {
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

    };

    if (!user) {
        return (
            <div id="Orders_users" className="login-need-msg">
                <h3>No Orders Yet</h3>
            </div>
        );
    }

    return (
        <>

        <div id="Orders_users">

            <div className="orders_users_cards">

                {orders.map((order)=> (
                    
                    <div className="orders_user_card" key={order.id}>

                        <div className="order_user_data pb-3 d-flex justify-content-between align-items-start ">
                            <div className="order_user_data_head">
                                <h5>Order {order.id}</h5>
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
                                <p className='fw-medium'>EGP{order.checkoutData.total}</p>
                            </div>

                            <div className="order_action_btn">
                                    {order.Status === "Pending" ? (
                                            <button onClick={() => handleCancelOrder(order.id)}>X</button>
                                        ) : order.Status === "Cancelled" ? (
                                            <button disabled style={{ cursor: "not-allowed", color:"#ababaa", border:"2px solid #ababaa" }}>✓</button>
                                        ) : (
                                            <button disabled style={{ cursor: "not-allowed", boxShadow:"none" }}>X</button>
                                    )}
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>
        
        </>
    )
}

export default Orders