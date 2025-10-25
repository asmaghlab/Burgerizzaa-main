import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllMenuData,
    deleteMenuItem,
    addMenuItem,
    updateMenuItem,
} from "../../../Store/MenuSlice";
import type { RootState, AppDispatch } from "../../../Store/Store";
import type { Menu } from "../../../types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteConfirmationAlert } from "../../../Components/Sweet/SweetAlert";

const ITEMS_PER_PAGE = 12;

const DashboardMenu: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { menuData, loading, error } = useSelector(
        (state: RootState) => state.menu
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Menu | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    // Price range state [min, max]
    const [priceRange, setPriceRange] = useState<[number, number]>([1, 1000]);

    const minProductPrice = useMemo(() => {
        if (menuData.length === 0) return 1;
        return Math.min(...menuData.map(item => item.price));
    }, [menuData]);

    const maxProductPrice = useMemo(() => {
        if (menuData.length === 0) return 1000;
        return Math.max(...menuData.map(item => item.price));
    }, [menuData]);

    useEffect(() => {
        setPriceRange([minProductPrice, maxProductPrice]);
    }, [minProductPrice, maxProductPrice]);

    useEffect(() => {
        dispatch(getAllMenuData());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterCategory, priceRange]);

    const handleDelete = async (id: number) => {
        const confirmed = await deleteConfirmationAlert();
        if (confirmed) {
            dispatch(deleteMenuItem(id));
        }
    };

    const handleOpenModal = (item?: Menu) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                price: item.price.toString(),
                image: item.image || "",
                category: item.category || "",
                description: item.description || "",
            });
        } else {
            setEditingItem(null);
            setFormData({ name: "", price: "", image: "", category: "", description: "" });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // const handleSubmit = (e: React.FormEvent<Element>) => {
    //     e.preventDefault();
    //     const priceValue = Math.max(1, Number(formData.price));
    //     const itemData = { ...formData, price: priceValue };

    //     if (editingItem) {
    //         dispatch(updateMenuItem({ ...itemData, id: editingItem.id } as Menu));
    //     } else {
    //         dispatch(addMenuItem(itemData));
    //     }

    //     handleCloseModal();
    // };

    const categories = useMemo(() => {
        const set = new Set<string>();
        menuData.forEach((m) => {
            if (m.category) set.add(m.category);
        });
        return ["All", ...Array.from(set)];
    }, [menuData]);

    const filtered = useMemo(() => {
        return menuData.filter((item) => {
            const matchesSearch =
                !searchQuery ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.id.toString() === searchQuery.trim();

            const matchesCategory = filterCategory === "All" || item.category === filterCategory;

            const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [menuData, searchQuery, filterCategory, priceRange]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (p: number) => {
        const page = Math.min(Math.max(1, p), totalPages);
        setCurrentPage(page);
    };

    return (
        <div className="container mt-3">
            {/* Filters Row */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-3 mb-2"
                style={{ background: "#ffffff", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
            >
                <div className="d-flex flex-wrap align-items-center gap-3">
                    {/* Search */}
                    <div
                        className="d-flex align-items-center shadow-sm px-3 py-1"
                        style={{
                            background: "#f8f9fa",
                            borderRadius: "10px",
                            border: "1px solid #dee2e6",
                            width: "230px",
                            transition: "border 0.2s ease-in-out",
                        }}
                    >
                        <i className="bi bi-search text-secondary me-2"></i>
                        <input
                            type="text"
                            placeholder="Search by ID or Name"
                            className="form-control border-0 bg-transparent"
                            style={{
                                width: "100%",
                                fontSize: "0.9rem",
                                color: "#495057",
                                outline: "none",
                                boxShadow: "none",
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={(e) =>
                                (e.currentTarget.parentElement!.style.border = "1px solid #ad343e")
                            }
                            onBlur={(e) =>
                                (e.currentTarget.parentElement!.style.border = "1px solid #dee2e6")
                            }
                        />
                    </div>


                    {/* Category */}
                    <div
                        className="shadow-sm"
                        style={{
                            borderRadius: "10px",
                            overflow: "hidden",
                            border: "1px solid #dee2e6",
                            transition: "border 0.2s ease-in-out",
                            width: "160px",
                            background: "#f8f9fa",
                        }}
                    >
                        <select
                            className="form-select border-0 bg-transparent"
                            style={{
                                fontSize: "0.9rem",
                                color: "#495057",
                                cursor: "pointer",
                                boxShadow: "none",
                                outline: "none",
                            }}
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            onFocus={(e) =>
                                (e.currentTarget.parentElement!.style.border = "1px solid #ad343e")
                            }
                            onBlur={(e) =>
                                (e.currentTarget.parentElement!.style.border = "1px solid #dee2e6")
                            }
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Price Range Slider */}
                    <div className="d-flex flex-column shadow-sm p-2"
                        style={{ borderRadius: "10px", background: "#f8f9fa", width: "230px" }}
                    >
                        <div className="d-flex justify-content-between mb-1">
                            <span className="text-muted fw-semibold">{priceRange[0]}</span>
                            <span className="text-muted fw-semibold">{priceRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min={minProductPrice}
                            max={priceRange[1]}
                            value={priceRange[0]}
                            onChange={(e) => {
                                const newMin = Math.min(Number(e.target.value), priceRange[1] - 1);
                                setPriceRange([newMin, priceRange[1]]);
                            }}
                            style={{ width: "100%", accentColor: "#ad343e" }}
                        />
                        <input
                            type="range"
                            min={priceRange[0]}
                            max={maxProductPrice}
                            value={priceRange[1]}
                            onChange={(e) => {
                                const newMax = Math.max(Number(e.target.value), priceRange[0] + 1);
                                setPriceRange([priceRange[0], newMax]);
                            }}
                            style={{ width: "100%", accentColor: "#ad343e" }}
                        />
                    </div>

                    {/* Reset */}
                    <button className="btn btn-light border-0 shadow-sm px-3 fw-semibold"
                        style={{ color: "#6c757d", background: "#f1f3f5", transition: "all 0.2s ease-in-out" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#e9ecef")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#f1f3f5")}
                        onClick={() => { setSearchQuery(""); setFilterCategory("All"); setPriceRange([minProductPrice, maxProductPrice]); }}
                    >
                        <i className="bi bi-arrow-clockwise me-1"></i> Reset
                    </button>
                </div>

                {/* Add Product */}
                <button className="btn d-flex align-items-center gap-2 fw-semibold px-3 py-2"
                    style={{ background: "#ad343e", color: "#fff", borderRadius: "10px", boxShadow: "0 0 6px 2px rgba(0,0,0,0.5)", transition: "all 0.2s ease-in-out" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#000000ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#ad343e")}
                    onClick={() => handleOpenModal()}
                >
                    <i className="bi bi-plus-circle fs-5"></i> Add Product
                </button>
            </div>

            {/* Products Grid */}
            {loading && <p className="text-center text-secondary">Loading menu...</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            <div className="row g-4">
                {currentItems.map((item) => (
                    <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={item.id}>
                        <div
                            className="card d-flex flex-column justify-content-between p-2 position-relative h-100"
                            style={{
                                borderRadius: "16px",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                background: "#fff",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"; }}
                        >
                            <span style={{ position: "absolute", top: "8px", right: "10px", fontSize: "0.75rem", fontWeight: "500", color: "#6c757d", zIndex: 1 }}>
                                ID: {item.id}
                            </span>
                            <div style={{ width: "100%", height: "160px", borderRadius: "12px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={item.image} alt={item.name} style={{ width: "80%", height: "80%", objectFit: "cover" }} />
                            </div>
                            <div className="text-center   mb-1">
                                <h6 className="fw-semibold text-truncate " style={{ fontSize: "0.85rem" }} title={item.name}>{item.name}</h6>
                                <p className="text-muted mb-1" style={{ fontSize: "0.8rem" }}></p>
                                <p className="fw-bold mb-1" style={{ color: "#ad343e", fontSize: "0.85rem" }}>{item.price} <span className="text-muted fw-semibold">EGP</span></p>
                            </div>
                            <div className="d-flex justify-content-center gap-2 my-1">
                                <button
                                    title="Edit"
                                    onClick={() => handleOpenModal(item)}
                                    className="btn border-0 d-flex align-items-center justify-content-center"
                                    style={{
                                        borderRadius: "8px",
                                        padding: "6px 5px",
                                        background: "#495057",
                                        color: "#fff",
                                        width: "25%",
                                        transition: "all 0.25s ease",
                                        boxShadow: "0 2px 6px rgba(173, 52, 62, 0.3)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#c94b54";
                                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(173, 52, 62, 0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "#495057";
                                        e.currentTarget.style.boxShadow = "0 2px 6px rgba(173, 52, 62, 0.3)";
                                    }}
                                >
                                    <EditIcon fontSize="small" />
                                </button>

                                <button
                                    title="Delete"
                                    onClick={() => handleDelete(Number(item.id))}
                                    className="btn border-0 d-flex align-items-center justify-content-center"
                                    style={{
                                        borderRadius: "8px",
                                        padding: "6px 5px",
                                        background: "#b80917ff",
                                        color: "#fff",
                                        width: "25%",
                                        transition: "all 0.25s ease",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#495057";
                                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.25)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "#b80917ff";
                                        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {!loading && filtered.length > 0 && (
                <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap pb-3">
                    <button className="btn btn-outline-danger btn-sm" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>Prev</button>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button key={index} className={`btn btn-sm ${currentPage === index + 1 ? "btn-danger" : "btn-outline-danger"}`} onClick={() => goToPage(index + 1)}>{index + 1}</button>
                    ))}
                    <button className="btn btn-outline-danger btn-sm" disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>Next</button>
                </div>
            )}

            {!loading && filtered.length === 0 && <p className="text-center text-muted mt-5">No menu items found.</p>}

            {/* Modal */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        background: "#00000080",
                        backdropFilter: "blur(3px)",
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div
                            className="modal-content border-0 overflow-hidden"
                            style={{ borderRadius: "12px" }}
                        >
                            <div
                                className="modal-header text-white"
                                style={{ background: "#ad343e", borderBottom: "none" }}
                            >
                                <h5 className="modal-title fw-semibold">
                                    {editingItem ? "Edit Product" : "Add Product"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>

                            <form
                                noValidate
                                className="needs-validation"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.currentTarget;
                                    if (!form.checkValidity()) {
                                        form.classList.add("was-validated");
                                        return;
                                    }

                                    const priceValue = Number(formData.price);

                                    const itemData = {
                                        ...formData,
                                        price: priceValue,
                                        description: formData.description.trim(),
                                    };

                                    if (editingItem) {
                                        dispatch(updateMenuItem({ ...itemData, id: editingItem.id } as Menu));
                                    } else {
                                        dispatch(addMenuItem(itemData));
                                    }

                                    handleCloseModal();
                                }}
                            >
                                <div className="modal-body p-4">
                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Product Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter product name"
                                            required
                                            pattern="^[A-Za-z\s]+$"
                                        />
                                        <div className="invalid-feedback">
                                            Name cannot be empty or contain numbers.
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Price (EGP)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            min="1"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="Enter product price"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Price must be a positive number.
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Image URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                            placeholder="Enter image URL"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Please enter a valid image URL.
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Category</label>
                                        <select
                                            className="form-select"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a category.
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Description</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows={3}
                                            placeholder="Enter description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            // pattern="^[A-Za-z\s]+$"
                                        ></textarea>
                                        <div className="invalid-feedback">
                                            Description cannot be empty or contain numbers.
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="modal-footer border-0"
                                    style={{ background: "#ad343e", justifyContent: "center" }}
                                >
                                    <button
                                        type="submit"
                                        className="btn fw-semibold"
                                        style={{
                                            background: "transparent",
                                            border: "2px solid #fff",
                                            borderRadius: "8px",
                                            padding: "6px 20px",
                                            transition: "0.2s",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#fffdfdff";
                                            e.currentTarget.style.color = "#ad343e";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "#ad343e";
                                            e.currentTarget.style.color = "#fff";
                                        }}
                                    >
                                        {editingItem ? "Save Changes" : "Add Product"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DashboardMenu;
