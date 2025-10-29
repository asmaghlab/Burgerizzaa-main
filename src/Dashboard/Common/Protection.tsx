import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../Store/Store";

interface Protection {
    allowedRoles: string[]; 
}

const Protection: React.FC<Protection> = ({ allowedRoles }) => {
    const user = useSelector((state: RootState) => state.user.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default Protection;