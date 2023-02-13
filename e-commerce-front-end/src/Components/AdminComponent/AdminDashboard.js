import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {AdminContainerRow, AdminButtonCol, UserDashboardCenterDiv} from'../../Styles/ContainersStyles'

function AdminDashboard() {
    const navigate = useNavigate();

    const navigateToCreateNewItem = () => {
        navigate('/admin/create-new-product')
    }

    const navigateToCreateNewVariant = () => {
        navigate('/admin/create-new-variant')
    }

    const navigateToUpdateDeleteVariant = () => {
        navigate('/admin/update-variant')
    }

    const navigateToDeleteProduct = () => {
        navigate('/admin/delete-product')
    }

    const navigateToDeleteVariant = () => {
        navigate('/admin/delete-variant-search')
    }

    const navigateToManageOrders = () => {
        navigate('/admin/manage-orders')
    }

    const handleLogOut = () =>{
        localStorage.removeItem('userName')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')
        if(localStorage.getItem('isAdmin')){
            localStorage.removeItem('isAdmin')
        }
        navigate(`/login`)
    }
  return (
    <div>
        <AdminContainerRow>
            <AdminButtonCol onClick={navigateToCreateNewItem}>Create New Item</AdminButtonCol>
            <AdminButtonCol onClick={navigateToCreateNewVariant}>Create New Variant</AdminButtonCol>
            <AdminButtonCol onClick={navigateToUpdateDeleteVariant}>Update Variant</AdminButtonCol>
        </AdminContainerRow>

        <AdminContainerRow>
            <AdminButtonCol onClick={navigateToDeleteProduct}>Delete Item</AdminButtonCol>
            <AdminButtonCol onClick={navigateToDeleteVariant}>Delete Variant</AdminButtonCol>
            <AdminButtonCol onClick={navigateToManageOrders}>Manage Orders</AdminButtonCol>
        </AdminContainerRow>

        <UserDashboardCenterDiv>
            <button onClick={handleLogOut}>Log Out</button>
        </UserDashboardCenterDiv>
    </div>
  );
}

export default AdminDashboard;