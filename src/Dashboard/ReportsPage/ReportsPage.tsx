import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../Store/Store"; 
import "bootstrap/dist/css/bootstrap.min.css";

import type { CartItem } from "../../types"; 
import { getAllDataCart } from "../../Store/CartSlice";

export default function ReportsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart as CartItem[]);

  // Fetch cart data on mount
  useEffect(() => {
    dispatch(getAllDataCart());
  }, [dispatch]);

  // Categories for tables
  const categories: string[] = ["Pizza", "Burger", "Dessert", "Drinks"];

  // Prepare tables per category
  const tables = categories.map((category) => ({
    title: category,
    data: cartItems
      .filter((item) => item.category === category)
      .map((item) => ({
        item: item.name,
        sales: `$${item.price * item.quantity}`,
        orders: item.quantity,
      })),
  }));

  // Prepare Top Selling
  const topSelling = [...cartItems]
    .sort((a, b) => b.quantity - a.quantity)
    .map((item, index) => ({
      rank: index + 1,
      name: item.name,
      category: item.category,
      orders: item.quantity,
      revenue: `$${item.price * item.quantity}`,
    }));

  return (
    <div className="min-vh-100 py-5" style={{ fontFamily: "var(--font-text, 'DM Sans', sans-serif)" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold" style={{ color: "#2C2F24" }}>
            Burgerizza Reports
          </h2>
          <p className="text-muted">Sales & Performance Overview</p>
        </div>

        {/* Tables Grid */}
        <div className="row g-4 mb-5">
          {tables.map((table, index) => (
            <div key={index} className="col-lg-6 col-md-12">
              <div className="card shadow-sm border-0 rounded-4" style={{ backgroundColor: "#ffffff", border: "1px solid #e7adb2b6" }}>
                <div className="card-body">
                  <h6 className="fw-bold mb-3 text-center" style={{ color: "#ad343e" }}>
                    {table.title}
                  </h6>
                  <table className="table table-sm text-center mb-0">
                    <thead style={{ backgroundColor: "#fff3f3", color: "#ad343e", fontSize: "0.9rem" }}>
                      <tr>
                        <th>Item</th>
                        <th>Sales</th>
                        <th>Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.data.length > 0 ? (
                        table.data.map((row, i) => (
                          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f8f8" }}>
                            <td>{row.item}</td>
                            <td>{row.sales}</td>
                            <td>{row.orders}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-muted">
                            No items in this category
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Selling Section */}
        <div className="card shadow-sm border-0 rounded-4 p-3 mb-4" style={{ border: "1px solid #e7adb2b6" }}>
          <h5 className="fw-bold mb-3 text-center" style={{ color: "#ad343e" }}>
            🔥 Top Selling Items
          </h5>
          <div className="table-responsive">
            <table className="table table-striped text-center align-middle mb-0">
              <thead style={{ backgroundColor: "#fff3f3", color: "#ad343e", fontSize: "0.9rem" }}>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topSelling.length > 0 ? (
                  topSelling.map((item, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f8f8" }}>
                      <td>{item.rank}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.orders}</td>
                      <td>{item.revenue}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-muted">
                      No items sold yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 text-muted">
          <small>
            © 2025 <b style={{ color: "#ad343e" }}>Burgerizza</b> — Crafted with 🍕 & ❤️
          </small>
        </div>
      </div>
    </div>
  );
}
