import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import {UserDashboardContainer, UserDashboardContainerRow, UserDashboardColumns, UserDashboardCenterDiv} from '../Styles/ContainersStyles'
import {UserDashobardOrderHeaders} from '../Styles/HeadersStyles'

function UserDashboard() {
    const [userName, setUserName] =useState()
    const [orders, setOrders] = useState()
    const getOrders = async() => {
        const userId = localStorage.getItem('userId')
        const accessToken = localStorage.getItem('accessToken')
        console.log(userId)
        const config = {
                headers: { token: `Bearer ${accessToken}` }
            }
        const response = await axios.get(
            `//localhost:8000/api/v1/order/${userId}`,
            { headers: {'token': `Bearer ${accessToken}`}}   
        )
        console.log(response.data.order)
        setOrders(response.data.order)
        console.log(orders)
    }

    useEffect(() => {
        const name = localStorage.getItem('userName')
        if(name){
            setUserName(name)
            getOrders()
        }
    }, [])
    const navigate = useNavigate();

    const handleClick = () =>{
        localStorage.removeItem('userName')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')
        if(localStorage.getItem('isAdmin')){
            localStorage.removeItem('isAdmin')
        }
        navigate(`/login`)
    }
    return(
        <div>
            <UserDashboardCenterDiv>
                <h1>Hello {userName}</h1>
                <button onClick={handleClick}>Log Out</button>
            </UserDashboardCenterDiv>
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
                    <UserDashboardContainer>
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
export default UserDashboard