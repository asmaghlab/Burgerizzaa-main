import React from "react";
import '../Pages/DashboardRoutes.css';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../Store/Store";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
    
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user.user); 

    const path = location.pathname.split("/").filter(Boolean); 

    const Pcapital = path.map(path =>
        path.charAt(0).toUpperCase() + path.slice(1)
    );

    const currentRoute =  Pcapital.join(" / ") || "Dashboard";

    return (
        <div id="navbar" className="d-flex justify-content-between align-items-center">

            <div>{currentRoute}</div>

            <div className=" d-flex align-items-center nav_link">
                <Link to="/" style={{marginRight:"10px", color:"#2C2F24"}}>Home</Link>
                {user && (
                        <img src={`https://ui-avatars.com/api/?name=${user.username}&background=ad343e&color=fff&size=128`} alt="" 
                        style={{width:"30px", borderRadius:"50%",marginRight:"5px"}}/>
                )}
            
            </div>




            
        </div>
    );
};

export default Navbar;