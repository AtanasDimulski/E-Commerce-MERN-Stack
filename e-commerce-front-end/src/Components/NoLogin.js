import { Outlet, Navigate } from "react-router-dom";

function NoLogin() {

    return(
        localStorage.getItem('userName') ?<Navigate to="/dashboard"/> : <Outlet /> 
    )
}

export default NoLogin;