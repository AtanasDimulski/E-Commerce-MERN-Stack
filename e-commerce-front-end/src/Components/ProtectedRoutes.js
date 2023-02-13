import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {

    return(
        localStorage.getItem('userName') ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes;