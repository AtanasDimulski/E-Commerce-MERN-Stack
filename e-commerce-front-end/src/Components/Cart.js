import { useSelector, useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeItem, removeAllItems} from '../store/cartSlice'
import {CartDescriptionRow, CartProductContainer, CartProductDetailsContainer,
        CartProductDeailtsImage, CartProductDetailsContainerLeft, CartProductDetailsContainerRight,
        CartPriceContainer, CartQuantityContainer, CartQuantityButton, CartDeleteButtonContainer,
        CartDeleteButton, CartOrderButton, CartOrderDiv, CartLoginLink} from '../Styles/ContainersStyles'
import {CartMainHeader, CartDescriptionHeader, CartProductDeatilsHeader, CartItemQuantityInput,
    CartErrMsgHeader} from '../Styles/HeadersStyles'
import axios from 'axios'
import React, { useState} from 'react';
import {useNavigate} from 'react-router-dom';
function Cart() {
    const [errMsg, setErrMsg] = useState()
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate(`/login`)
    }
    const createOrder = async() => {      
        const userId = localStorage.getItem('userId')
        const accessToken = localStorage.getItem('accessToken')
        console.log(accessToken)
        if(userId){
            let totalPrice = 0
            cart.forEach((item) => {
                let productPrice = item.quantity * item.price
                totalPrice = totalPrice + productPrice
            })
            const config = {
                headers: { token: `Bearer ${accessToken}` }
            }
            console.log('Here is the total price ' + totalPrice)
            await axios.post(
                "//localhost:8000/api/v1/order",
                {
                    userId:userId,
                    products:cart,
                    amount:totalPrice
                }, 
                { headers: {'token': `Bearer ${accessToken}`}}   
            )
            await axios.patch(
                "//localhost:8000/api/v1/products/update/quantity/sizes",
                {   
                    userId:userId,
                    products:cart
                },
                config
                
            )
            dispatch(removeAllItems())
            setErrMsg('Your order has been submited')
            
        }else{
            setErrMsg('You have to login first')
        }
    }
    return(
        <div>
            <CartMainHeader >Cart</CartMainHeader >
            <div>
                <CartDescriptionRow>
                    <CartProductDetailsContainer>
                        <CartDescriptionHeader>PRODUCT DETAILS</CartDescriptionHeader>
                    </CartProductDetailsContainer>

                    <CartQuantityContainer>
                        <CartDescriptionHeader>QTY</CartDescriptionHeader>
                    </CartQuantityContainer>

                    <CartPriceContainer>
                        <CartDescriptionHeader>PRICE</CartDescriptionHeader>
                    </CartPriceContainer>

                    <CartPriceContainer>
                        <CartDescriptionHeader>TOTAL PRICE</CartDescriptionHeader>
                    </CartPriceContainer>

                    <CartDeleteButtonContainer></CartDeleteButtonContainer>
                </CartDescriptionRow>
                {cart?.map((item) => (
                    <CartProductContainer>
                        <CartProductDetailsContainer>

                            <CartProductDetailsContainerLeft>
                                <CartProductDeailtsImage src={item.imgUrl}/>
                            </CartProductDetailsContainerLeft>
                            
                            <CartProductDetailsContainerRight>
                                <CartProductDeatilsHeader>{item.productName}</CartProductDeatilsHeader>
                                <CartProductDeatilsHeader>Color: {item.productColor}</CartProductDeatilsHeader>
                                <CartProductDeatilsHeader>Size: {item.productSize}</CartProductDeatilsHeader>
                            </CartProductDetailsContainerRight>
                        </CartProductDetailsContainer>

                        <CartQuantityContainer>
                        <CartQuantityButton onClick={() => dispatch(decrementQuantity(item.productId))}>-</CartQuantityButton>
                        <CartItemQuantityInput
                            type='text'
                            value={item.quantity}              
                        />                  
                        <CartQuantityButton  onClick={() => dispatch(incrementQuantity(item.productId))}>+</CartQuantityButton>
                        </CartQuantityContainer>

                        <CartPriceContainer>
                            <CartProductDeatilsHeader>${item.price}</CartProductDeatilsHeader>
                        </CartPriceContainer>

                        <CartPriceContainer>
                            <CartProductDeatilsHeader>${item.price * item.quantity}</CartProductDeatilsHeader>
                        </CartPriceContainer>

                        <CartDeleteButtonContainer>
                            <CartDeleteButton onClick={() => dispatch(removeItem(item.sizeAndId))}>x</CartDeleteButton>
                        </CartDeleteButtonContainer>
                    </CartProductContainer>
                    
                ))}
                <CartOrderDiv>
                    <CartErrMsgHeader>{errMsg}</CartErrMsgHeader>
                    {errMsg === 'You have to login first'
                        ?
                        <CartLoginLink to="/login">Log In</CartLoginLink>
                        :
                        <CartLoginLink></CartLoginLink>
                    }
                    <CartOrderButton onClick={() => createOrder()}>Order</CartOrderButton>
                </CartOrderDiv>
            </div>
        </div>
    )
}

export default Cart