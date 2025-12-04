import { useEffect, useState } from "react";
import axios from "axios";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

interface Order {
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  userID: string;
  items: OrderItem[];
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function ReportsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, ordersRes] = await Promise.all([
          axios.get("https://68e4e1228e116898997d6e79.mockapi.io/signup"),
          axios.get("https://68eec8f4b06cc802829b50f7.mockapi.io/order"),
        ]);
        setUsers(usersRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  // --- Prepare Tables per Category ---
  const categories = ["Pizza", "Burger", "Dessert", "Drinks"];
  const tables = categories.map((category) => {
    const categoryItems: { item: string; sales: string; orders: number }[] = [];
    orders.forEach((order) => {
      order.items
        .filter((it) => it.category === category)
        .forEach((it) => {
            categoryItems.push({
              item: it.name,
              sales: `$${it.price * it.quantity}`,
              orders: it.quantity, 
            });
        });
    });
    return { title: category, data: categoryItems };
  });

  // --- Top Selling Items ---
  const topSelling: { rank: number; name: string; category: string; orders: number; revenue: string }[] = [];
  const itemMap: Record<string, { name: string; category: string; totalOrders: number; totalRevenue: number }> = {};

  orders.forEach((order) => {
    order.items.forEach((it) => {
      if (!itemMap[it.name]) itemMap[it.name] = { name: it.name, category: it.category, totalOrders: 0, totalRevenue: 0 };
      itemMap[it.name].totalOrders += it.quantity;
      itemMap[it.name].totalRevenue += it.quantity * it.price;
    });
  });

  Object.values(itemMap)
    .sort((a, b) => b.totalOrders - a.totalOrders)
    .forEach((it, idx) => {
      topSelling.push({
        rank: idx + 1,
        name: it.name,
        category: it.category,
        orders: it.totalOrders,
        revenue: `$${it.totalRevenue}`,
      });
    });

  // --- Most Active Users (Top 3) ---
  const userMap: Record<string, { userName: string; email: string; totalOrders: number }> = {};
  orders.forEach((order) => {
    const user = users.find((u) => u.id === order.userID);
    if (!user) return;
    if (!userMap[user.id]) userMap[user.id] = { userName: user.username, email: user.email, totalOrders: 0 };
    order.items.forEach((it) => (userMap[user.id].totalOrders += it.quantity));
  });

  const userOrdersTop3 = Object.values(userMap)
    .sort((a, b) => b.totalOrders - a.totalOrders)
    .slice(0, 3);

  // --- Sticky header style ---
  const stickyHeaderStyle = {
    position: "sticky" as const,
    top: 0,
    backgroundColor: "#fff3f3",
    zIndex: 10,
    color: "#ad343e",
    fontSize: "0.9rem",
  };

  return (
    <div className="min-vh-100 py-5" style={{ fontFamily: "DM Sans, sans-serif", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        {/* Header */}
        <div className="text-left mb-4">
          {/* <h2 className="fw-bold" style={{ color: "#2C2F24" }}>Burgerizza Reports</h2> */}
          <h5 style={{color:"#2C2F24"}} >Sales & Performance Overview</h5>
        </div>

        {/* Tables per Category */}
        <div className="row g-4 mb-5">
          {tables.map((table, index) => (
            <div key={index} className="col-lg-6 col-md-12">
              <div className="card shadow-sm border-0 rounded-4" style={{ backgroundColor: "#ffffff", border: "1px solid #e7adb2b6" }}>
                <div className="card-body">
                  <h6 className="fw-bold mb-3 text-center" style={{ color: "#ad343e" }}>{table.title}</h6>
                  <div className="table-responsive" style={{ maxHeight: "250px", overflowY: "auto" }}>
                    <table className="table table-sm text-center mb-0">
                      <thead style={stickyHeaderStyle}>
                        <tr>
                          <th>Item</th>
                          <th>Sales</th>
                          <th>Orders</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.data.length > 0 ? table.data.map((row, i) => (
                          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f8f8" }}>
                            <td>{row.item}</td>
                            <td>{row.sales}</td>
                            <td>{row.orders}</td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={3} className="text-muted">No items in this category</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Selling Items */}
        <div className="card shadow-sm border-0 rounded-4 p-3 mb-4" style={{ border: "1px solid #e7adb2b6" }}>
          <h5 className="fw-bold mb-3 text-center" style={{ color: "#ad343e" }}> Top Selling Items</h5>
          <div className="table-responsive" style={{ maxHeight: "250px", overflowY: "auto" }}>
            <table className="table table-striped text-center align-middle mb-0">
              <thead style={stickyHeaderStyle}>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topSelling.length > 0 ? topSelling.map((item, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f8f8" }}>
                    <td>{item.rank}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.orders}</td>
                    <td>{item.revenue}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="text-muted">No items sold yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Active Users Top 3 */}
        <div className="card shadow-sm border-0 rounded-4 p-3 mb-4" style={{ border: "1px solid #e7adb2b6" }}>
          <h5 className="fw-bold mb-3 text-center" style={{ color: "#ad343e" }}> Most Active Users</h5>
          <div className="table-responsive" style={{ maxHeight: "250px", overflowY: "auto" }}>
            <table className="table table-striped text-center align-middle mb-0">
              <thead style={stickyHeaderStyle}>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Total Orders</th>
                </tr>
              </thead>
              <tbody>
                {userOrdersTop3.length > 0 ? userOrdersTop3.map((user, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f8f8" }}>
                    <td>{i + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.totalOrders}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="text-muted">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-4 text-muted">
          <small>
            © 2025 <b style={{ color: "#ad343e" }}>Burgerizza</b> — Crafted with 🍕 & ❤
          </small>
        </div> */}
      </div>
    </div>
);
}



