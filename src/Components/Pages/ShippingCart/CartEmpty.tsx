import { Link } from "react-router-dom";
import './ShippingCart.css';

function CartEmpty() {
    return (
        <>
            <div id="background_home">
                <section style={{ height: "100vh" }} className="section2">
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "2rem", marginTop: "7rem" }}>
                        <div style={{ color: "#ad343e" }}>
                            <img src="/SVG.png" alt="" />
                        </div>
                        <p style={{ textAlign: "center", fontSize: "40px", color: "#414536" }}>
                            Your cart is currently empty.
                        </p>
                        <div style={{ textAlign: "center" }}>
                            <Link to="/menu">
                                <button style={{ border: "none", padding: "9px 13px", background: "#ad343e", color: "white", borderRadius: "10px" }}>Back to Menu</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default CartEmpty;