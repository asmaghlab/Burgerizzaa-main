import React from "react";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
    
    const location = useLocation();

    const path = location.pathname.split("/").filter(Boolean); 

    const Pcapital = path.map(path =>
        path.charAt(0).toUpperCase() + path.slice(1)
    );

    const currentRoute =  Pcapital.join(" / ") || "Dashboard";

    return (
        <div id="navbar">
            {currentRoute}
        </div>
    );
};

export default Navbar;