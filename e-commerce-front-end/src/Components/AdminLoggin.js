import { Outlet, Navigate } from "react-router-dom";
function AdminLogin() {

        return(
            localStorage.getItem('isAdmin') ? <Outlet /> : <Navigate to="/dashboard" />
        )
}

export default AdminLogin;