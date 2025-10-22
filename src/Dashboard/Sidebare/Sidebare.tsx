import "./Sidebare.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
    { icon: "home", label: "Home", path: "/dashboard" },
    { icon: "restaurant_menu", label: "Menu", path: "/dashboard/menuDash" },
    { icon: "receipt_long", label: "Orders", path: "/dashboard/ordersDash" },
    { icon: "group", label: "Users", path: "/dashboard/usersDash" },
    { icon: "mail", label: "Message", path: "/dashboard/messageDash" },
    { icon: "insert_chart", label: "Report", path: "/dashboard/reportspage" },

    {
        icon: "settings",
        label: "Settings",
        submenu: [
            // { icon: "person", label: "Profile", path: "/profile" },
            { icon: "logout", label: "Logout", path: "/logout" }
        ]
    }
];

const Sidebar:React.FC<{isOpen: boolean, setIsOpen: (v:boolean) => void}> = ({isOpen, setIsOpen}) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    return (
        <div className="page sidebar-page">
            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="inner">
                    <header>

                        <button
                        type="button"
                        className="sidebar-burger"
                        onClick={() => setIsOpen(!isOpen)}
                        >
                        <span className="material-symbols-outlined">
                            {isOpen ? "close" : "menu"}
                        </span>
                        </button>
                        {/* <img src="" /> */}
                    </header>

                    <nav>
                        {navItems.map((item) =>
                            item.submenu ? (
                                <div key={item.label}>
                                    <button
                                        className="sidebar-link submenu-btn"
                                        onClick={() =>
                                            setOpenMenu(openMenu === item.label ? null : item.label)
                                        }
                                    >
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                        <p>{item.label}</p>
                                    </button>



                                    <div className={`submenu ${openMenu === item.label && isOpen ? "show" : ""}`}>
                                        {item.submenu.map((sub) => (
                                            <Link key={sub.label} to={sub.path} className="submenu-link">
                                                <span className="material-symbols-outlined submenu-icon">{sub.icon}</span>
                                                <p>{sub.label}</p>
                                            </Link>
                                        ))}
                                    </div>


                                </div>
                            ) : (
                                <Link key={item.label} to={item.path} className="sidebar-link">
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                    <p>{item.label}</p>
                                </Link>
                            )
                        )}
                    </nav>



                </div>
            </aside>
        </div>
    );

};


export default Sidebar;