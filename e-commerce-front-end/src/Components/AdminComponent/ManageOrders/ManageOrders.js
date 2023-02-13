import axios from 'axios'
import {useState, useEffect} from 'react'
import {UserDashboardContainer, UserDashboardContainerRow, UserDashboardColumns} from '../../../Styles/ContainersStyles'
import {UserDashobardOrderHeaders} from '../../../Styles/HeadersStyles'
import {useNavigate} from 'react-router-dom';

function ManageOrders() {
    const [orders, setOrders] = useState()

    const navigate = useNavigate();
    const navigateToOrder = (orderId) => {
        navigate(`/admin/manage-orders/${orderId}`)
    }

    const getOrders = async () =>{
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get(
            `//localhost:8000/api/v1/order/find/allOrders`,
            { headers: { 'token': `Bearer ${accessToken}`}} 
        )
        setOrders(response.data.orders)
    }
    useEffect(() =>{
        getOrders()
    }, [])

    return(
        <div>
            <div>
                <UserDashboardContainerRow>
                    <UserDashboardColumns borderStyle='none'>
                        <UserDashobardOrderHeaders>ORDER ID</UserDashobardOrderHeaders>
                    </UserDashboardColumns>
                    <UserDashboardColumns borderStyle='none'>
                        <UserDashobardOrderHeaders>STATUS</UserDashobardOrderHeaders>
                    </UserDashboardColumns>
                    <UserDashboardColumns borderStyle='none'>
                        <UserDashobardOrderHeaders>AMOUNT</UserDashobardOrderHeaders>
                    </UserDashboardColumns>
                </UserDashboardContainerRow>
                {orders?.map((item) => (
                    <UserDashboardContainer onClick={() => (navigateToOrder(item._id))}>
                        <UserDashboardColumns borderStyle='solid'>
                            <UserDashobardOrderHeaders>{item._id}</UserDashobardOrderHeaders>
                        </UserDashboardColumns>
                        <UserDashboardColumns borderStyle='solid'>
                            <UserDashobardOrderHeaders>{item.status}</UserDashobardOrderHeaders>
                        </UserDashboardColumns>
                        <UserDashboardColumns borderStyle='solid'>
                            <UserDashobardOrderHeaders>{item.amount}</UserDashobardOrderHeaders>
                        </UserDashboardColumns>
                    </UserDashboardContainer>
                ))}
            </div>
        </div>
    )
}

export default ManageOrders