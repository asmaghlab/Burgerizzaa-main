import '../../../DashboardPage/DashboardPages.css';
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import type {Order } from "../../../../types";

const DashStats:React.FC = () => {

  // const [orders, setOrders] = useState<Order[]>([]);
  // const [menu, setMenu] = useState<CartItem[]>([]);

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalItemsSold, setTotalItemsSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {

    const getData = async () => {
      try {

        const getOrders = await axios.get<Order[]>("https://68eec8f4b06cc802829b50f7.mockapi.io/order");
        // const getMenu = await axios.get<CartItem[]>("https://68e3e5f38e116898997a5f72.mockapi.io/items");

        // setOrders(getOrders.data);
        // setMenu(getMenu.data);

        const totalOrders = getOrders.data.length;
        setTotalOrders(totalOrders);


        let itemsCount = 0;
        let totalRevenue = 0;

        getOrders.data.forEach(order => {

          if (Array.isArray(order.items)) {

            order.items.forEach(item => {
              const quantity = Number(item.quantity) || 0; 
              const price = Number(item.price) || 0;

              itemsCount += quantity;
              totalRevenue += quantity * price;
            });
          }
        });

        setTotalItemsSold(itemsCount);
        setTotalRevenue(totalRevenue);

      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (


    <div className="dashboard-stats">
      <div className="row g-4">
    
        <div className="col-md-4">
          <div className="bg-white stats-card stats-orders d-flex align-items-center justify-content-between p-3 shadow-sm rounded-4">
            <div>
              <h5>Total Orders</h5>
              <h2>{totalOrders} <span className="fs-5">Orders</span></h2>
            </div>
            <div style={{ width: 60, height: 60 }}>
              <CircularProgressbar 
                value={totalOrders ? 64 : 0} 
                text="64%" 
                styles={buildStyles({
                  textColor: "#e7adb2f2",
                  pathColor: "#e7adb2f2",
                  trailColor: "#e7adb271"
                })}
              />
            </div>
          </div>
        </div>




        <div className="col-md-4">
          <div className="bg-white stats-card stats-items d-flex align-items-center justify-content-between p-3 shadow-sm rounded-4">
            <div>
              <h5>Total Items Sold</h5>
              <h2>{totalItemsSold} <span className="fs-5">Items</span></h2>
            </div>
            <div style={{ width: 60, height: 60 }}>
              <CircularProgressbar 
                value={totalItemsSold ? 72 : 0} 
                text="72%" 
                styles={buildStyles({
                  textColor: "#00B69B",
                  pathColor: "#00B69B",
                  trailColor: "#c6f3e7"
                })}
              />
            </div>
          </div>
        </div>




        <div className="col-md-4">
          <div className="bg-white stats-card stats-revenue d-flex align-items-center justify-content-between p-3 shadow-sm rounded-4">
            <div>
              <h5>Total Revenue</h5>
              <h2>{totalRevenue.toLocaleString()} <span className="currency fs-5">EGP</span></h2>
            </div>
            <div style={{ width: 60, height: 60 }}>
              <CircularProgressbar 
                value={totalRevenue ? 80 : 0} 
                text="80%" 
                styles={buildStyles({
                  textColor: "#ad343e",
                  pathColor: "#ad343e",
                  trailColor: "#ad343e5c"
                })}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashStats;
