import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {ProductMainContainer, ProductLeftCol, ProductRightCol, TwoPicturesContainer,
     SmallerImages, SmallerImagesContainer, SinglePictureComponent, BigImage, 
     ColoredCircleSingleItem, ProductsColorsContainer, ItemSelectAndQuantityDiv,
     ItemQuantityDiv, QuantityButtons
} from '../Styles/ContainersStyles'
import {
    ItemNameHeader, ItemPriceHeader, ItemHrStyle, ItemQuantityInput
} from '../Styles/HeadersStyles'
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addToCart} from '../store/cartSlice'

function ItemPage() {
    const [item, setItem] = useState();
    const [variant, setVariant] = useState()
    const {productId, variantId} = useParams()
    const [attributes, setAttributes] = useState()
    const [sizes, setSizes] = useState([])
    const [quantityOfItems, setQuantityOfItems] = useState(1)
    const [totalPrice, setTotalPrice] = useState()
    const [price, setPrice] = useState()
    const [ optionSelectedSize, setOptionSelectedSize] = useState()
    const [optionSelectedQuantity, setOptionSelectedQuantity] = useState(0)
    const [errMsg, setErrMsg] = useState()

    const dispatch = useDispatch()
    const increaseQuantity =() =>{
        if(optionSelectedSize !== 'Select size'){
            const item = sizes.find((item) => item.value === optionSelectedSize);   
            setOptionSelectedQuantity(item.quantity)            
            if(item.quantity > quantityOfItems){  
                let number = Number(quantityOfItems)          
                let increasedNumber = number + 1
                setQuantityOfItems(increasedNumber)
                let priceFunction = increasedNumber * price
                let priceRounded = Math.round(priceFunction * 100)/100
                setTotalPrice(priceRounded)
                setErrMsg()
            }
        }else {
            setErrMsg('Select size first')
        }
    }

    const setTheSizeOnSelect = (value) => {
        setOptionSelectedSize(value)
        const item = sizes.find((item) => item.value === value);   
        setOptionSelectedQuantity(item.quantity) 
    }
    const decreaseQuantity =() =>{
        let number = Number(quantityOfItems) 
        let decreasedNumber = number - 1
        if(Number(quantityOfItems) <2){
            decreasedNumber = 1
        }
        setQuantityOfItems(decreasedNumber)
        let priceFunction = decreasedNumber * price
        let priceRounded = Math.round(priceFunction * 100)/100
        setTotalPrice(priceRounded)
    }
    
    const addToCartButton = (item, quantityOfItems, variant, optionSelectedSize) => {
        if(optionSelectedSize === 'Select size'){
            setErrMsg('Select size first')
        }else {
            setErrMsg('Item has been added to cart')
            dispatch(addToCart({item, quantityOfItems, variant, optionSelectedSize}))
            setQuantityOfItems(1)
        }
    }

    const getVariant = async () =>{
        try{
            const response = await axios.get(`//localhost:8000/api/v1/singleProduct/searchByVariant/${productId}/${variantId}`)
            const responseWholeProduct = await axios.get(`//localhost:8000/api/v1/singleProduct/getProductById/${productId}`)
            console.log('variant log', response.data.product[0])
            console.log('item log', responseWholeProduct.data.product[0])
            setItem(responseWholeProduct.data.product[0])
            setPrice(responseWholeProduct.data.product[0].price.$numberDecimal)
            setTotalPrice(responseWholeProduct.data.product[0].price.$numberDecimal)
            setAttributes(responseWholeProduct.data.product[0].attributes)
            console.log('this is sizes', response.data.product[0].attributes.sizes)
            setSizes(response.data.product[0].attributes.sizes)
            setOptionSelectedSize("Select size")
            setVariant(response.data.product[0])
            console.log('this is variant', variant)
            console.log('this is item', item)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(() =>{
        getVariant()
    },[productId, variantId])

    const navigate = useNavigate();
    const navigateToItem = (productId, variantId) => {
        navigate(`/singleProduct/${productId}/${variantId}`)
    }
    const getVariantOnClick = async (variantIdClick) =>{
        try{
            const response = await axios.get(`//localhost:8000/api/v1/singleProduct/searchByVariant/${productId}/${variantIdClick}`)
            setVariant(response.data.product[0])
            console.log('should have navigated to', response.data.product[0])
            navigateToItem(productId, variantIdClick)
        }catch(err){
            console.log(err)
        }
    }

    if(!variant){
        return <h1>Is not displaying items</h1>
    }

    else{
    return (
        <div>
         
        <ProductMainContainer >                
            <ProductLeftCol >
                
                <TwoPicturesContainer>
                    <SmallerImagesContainer>
                        <SmallerImages src={variant.attributes.secondaryImages[0]} />
                    </SmallerImagesContainer>                   
                    <SmallerImagesContainer>
                        <SmallerImages src={variant.attributes.secondaryImages[1]} />
                    </SmallerImagesContainer>
                </TwoPicturesContainer>

                
                <TwoPicturesContainer marginTop="3%">
                    <SmallerImagesContainer>
                        <SmallerImages src={variant.attributes.secondaryImages[2]} />
                    </SmallerImagesContainer>                   
                    <SmallerImagesContainer>
                        <SmallerImages src={variant.attributes.secondaryImages[3]} />
                    </SmallerImagesContainer>
                </TwoPicturesContainer>

                <SinglePictureComponent>
                    <BigImage src={variant.attributes.mainImageUrl} />
                </SinglePictureComponent>
            </ProductLeftCol>
             
            <ProductRightCol >
                <ItemNameHeader>{item.name}</ItemNameHeader> 
                <ItemPriceHeader>Price: {item.price.$numberDecimal}$</ItemPriceHeader>
                <ItemHrStyle/>
                <ItemPriceHeader>Color: {variant.attributes.color}</ItemPriceHeader>
                <ProductsColorsContainer>
                {attributes.map((element, id) =>(                             
                    <ColoredCircleSingleItem key={id} backgroundColor={element.color} onClick={() => getVariantOnClick(element._id)}></ColoredCircleSingleItem>                              
                ))}
                </ProductsColorsContainer>
                <ItemHrStyle/>
                <ItemSelectAndQuantityDiv>
                    <select value={optionSelectedSize} onChange={(e) => setTheSizeOnSelect(e.target.value)} >
                        <option value="Select size">Select size</option>
                        {sizes.map((element, id) => (
                            <option key={id} value={element.value}>{element.value}   {element.quantity} left</option>
                        ))}
                    </select>
                    <ItemQuantityDiv>
                        <QuantityButtons onClick={decreaseQuantity}>-</QuantityButtons>
                        <ItemQuantityInput
                            type='text'
                            value={quantityOfItems}
                        />                     
                        <QuantityButtons onClick={increaseQuantity} >+</QuantityButtons>
                    </ItemQuantityDiv>
                </ItemSelectAndQuantityDiv>
                <ItemPriceHeader>Total Price: {totalPrice}$</ItemPriceHeader>
                <h6>{errMsg}</h6>
                <button onClick={() => addToCartButton(item, quantityOfItems, variant, optionSelectedSize)}>Add to cart</button>
            </ProductRightCol>   
                              
        </ProductMainContainer>
        
        </div>
    );
  
    }
}
  
  export default ItemPage;