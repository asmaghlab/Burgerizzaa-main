import "./ProductDetails.css"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Store/Store";
import { getAllMenuData } from "../../../Store/MenuSlice";
import { add, increase, decrease } from "../../../Store/CartSlice";
// import Loading from "./Loading";
import { loginPromptAlert, addToCartAlert } from "../../Sweet/SweetAlert";


export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { menuData, loading } = useSelector((state: RootState) => state.menu);
  const user = useSelector((state: RootState) => state.user.user);
  const cart = useSelector((state: RootState) => state.cart);
  const [count, setCount] = useState(1);

  const product = menuData.find((item) => item.id === Number(id));
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [id]);
  useEffect(() => {
    if (menuData.length === 0) {
      dispatch(getAllMenuData());
    }
  }, [dispatch, menuData.length]);

  const handleAddToCart = () => {
    if (!user) {
      loginPromptAlert(() => navigate("/login"));
      return;
    }

    if (product) {
      for (let i = 0; i < count; i++) {
        dispatch(add(product));
      }
      addToCartAlert(product.name);
      navigate("/shippingcart");
    }
  };


  const relatedProducts = product
    ? menuData
      .filter(item => item.category === product.category && item.id !== product.id)
      .slice(0, 4)
    : [];

  // if (loading) return <Loading />;

  if (!product) return <div className="text-center mt-5">Product not found</div>;

  return (
    <div className="container py-5" style={{ marginTop: "100px" }}>
      <div className="row align-items-center details">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "15px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-6">
          <h2 className="fw-bold mb-3" style={{ color: "#2c3e50" }}>{product.name}</h2>
          <div className="text-warning mb-3" style={{ fontSize: "1.2rem" }}>
            <FaStar /> <FaStar /> <FaStar /> <FaRegStar />
          </div>
          <p className="text-muted mb-4" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{product.description}</p>
          <h4 className="text-danger mb-4" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{product.price} EGP</h4>

          <div className="d-flex align-items-center gap-3 mb-4">

            <button
              onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #ad343e",
                backgroundColor: "transparent",
                color: "#ad343e",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ad343e";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#ad343e";
              }}
            >
              −
            </button>
            <span style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2c3e50",
              minWidth: "50px",
              textAlign: "center"
            }}>
              {count}
            </span>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #ad343e",
                backgroundColor: "transparent",
                color: "#ad343e",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ad343e";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#ad343e";
              }}
            >
              +
            </button>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn px-4 py-3"
              onClick={handleAddToCart}
              style={{
                backgroundColor: "#ad343e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                transition: "all 0.3s ease"
              }}
            >
              <BsCart3 className="me-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <h3 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "bolder" }}>
                Related Products
              </h3>
              <div className="menu_items">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    className="menu_item"
                    key={relatedProduct.id}
                    style={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <div
                      className="menu_item_img"
                      onClick={() => navigate(`/menu/${relatedProduct.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={relatedProduct.image} alt="" />
                    </div>

                    <div className="menu_item_data">
                      <div
                        className="menu_item_col1"
                        onClick={() => navigate(`/menu/${relatedProduct.id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <h3>{relatedProduct.name.length > 12 ? relatedProduct.name.slice(0, 12) + "..." : relatedProduct.name}</h3>
                        <div className="item_star">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaRegStar />
                        </div>
                      </div>
                      <div className="menu_item_col2">
                        <p>{relatedProduct.description?.substring(0, 25)}...</p>
                      </div>
                      <div className="menu_item_col3">
                        {(() => {
                          const cartItem = cart.find(
                            (cartItem) => cartItem.id === relatedProduct.id
                          );

                          return cartItem ? (
                            <div className="counter_item_btn">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(decrease(relatedProduct.id));
                                }}
                              >
                                −
                              </button>
                              <span>{cartItem.quantity}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(increase(relatedProduct.id));
                                }}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="menu_item_btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!user) {
                                  if (!user) {
                                    loginPromptAlert(() => navigate("/login"));
                                    return;
                                  }
                                  navigate("/login");
                                  return;
                                }
                                dispatch(add(relatedProduct));
                                addToCartAlert(relatedProduct.name);
                              }}
                            >
                              <BsCart3 />
                            </button>
                          );
                        })()}
                        <p>{relatedProduct.price}<span>EGP</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
