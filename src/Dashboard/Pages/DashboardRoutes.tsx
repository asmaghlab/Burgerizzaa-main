import './DashboardRoutes.css';
import React, {useState} from "react";
import Sidebar from "../Sidebare/Sidebare";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbare/Navbare";
import DashboardPage from "../DashboardPage/DashboardPage";
import MenuPage from "../MenuDashPage/MenuPage";
import OrdersPage from "../OrdersDashPage/OrdersPage";
import UsersPage from "../UsersDashPage/UsersPage";
import ReportsPage from '../ReportsPage/ReportsPage';


const DashboardRoutes: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (

    <div id="Pages">

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

        <div className={`pages_content ${isOpen ? "sidebar-open" : ""}`}>

            <Navbar />

            <div className="pages_routes">
                <Routes>
                    <Route path="" element={<DashboardPage/>} />
                    <Route path="menuDash" element={<MenuPage/>} />
                    <Route path="ordersDash" element={<OrdersPage/>} />
                    <Route path="usersDash" element={<UsersPage/>} />
                    <Route path="reportspage" element={<ReportsPage/>} />
                </Routes>
            </div>

        </div>
    </div>
    );
};

export default DashboardRoutes;