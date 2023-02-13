import {useParams} from 'react-router-dom';
import axios from 'axios'
import {useState, useEffect} from 'react'
import {SingleOrderRowContainer, SingleOrderColumContainer, StyledOSelectOrder, SingleOrderButtonContainer} from '../../../Styles/ContainersStyles'
import {SingleOrderHeaders, SingleOrderMainHeader} from '../../../Styles/HeadersStyles'

function SingleOrder(){
    const {orderId} = useParams()
    const [order, setOrder] = useState()
    const [status, setStatus] = useState()

    const statusOptions = ['pending', 'processing', 'sent']

    const getOrder = async () =>{
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get(
            `//localhost:8000/api/v1/order/getSingleOrder/${orderId}`,
            { headers: { 'token': `Bearer ${accessToken}`}} 
        )
        console.log('this is the orderId', orderId)
        console.log(response.data.order)
        setOrder(response.data.order)
    }

    useEffect(() =>{
        getOrder()
    }, [])

    const updateOrder = async () => {
        const accessToken = localStorage.getItem('accessToken')
        const config = {
            headers: { token: `Bearer ${accessToken}` }
        }
        const response = await axios.patch(
            `//localhost:8000/api/v1/order/updateOrder/${orderId}/${status}`,
            {},
            config
        )
    }
    if(!order){
        return <h1>Is not displaying items</h1>
    }

    else{
        return(
            <div>
                <SingleOrderMainHeader>Order ID: {order[0]._id}</SingleOrderMainHeader>
                {order[0].products.map((item, id) => (
                    <SingleOrderRowContainer key={id}>
                        <SingleOrderColumContainer>
                            <SingleOrderHeaders>{item.productName}</SingleOrderHeaders>
                        </SingleOrderColumContainer>

                        <SingleOrderColumContainer>
                            <SingleOrderHeaders>{item.productColor}</SingleOrderHeaders>
                        </SingleOrderColumContainer>
                        
                        <SingleOrderColumContainer>
                            <SingleOrderHeaders>{item.productSize}</SingleOrderHeaders>
                        </SingleOrderColumContainer>

                        <SingleOrderColumContainer>
                            <SingleOrderHeaders>{item.quantity}</SingleOrderHeaders>
                        </SingleOrderColumContainer>
                    </SingleOrderRowContainer>
                ))}
                <SingleOrderMainHeader>Status: {order[0].status}</SingleOrderMainHeader>
                <StyledOSelectOrder onChange={e => setStatus(e.target.value)}>
                        {statusOptions.map((element, id) => 
                            <option value={element} key={id}>{element}</option>
                        )}
                </StyledOSelectOrder>
                <SingleOrderButtonContainer>
                    <button onClick={() => updateOrder()}>Change Status</button>
                </SingleOrderButtonContainer>
            </div>
        )
    }   
}

export default SingleOrder