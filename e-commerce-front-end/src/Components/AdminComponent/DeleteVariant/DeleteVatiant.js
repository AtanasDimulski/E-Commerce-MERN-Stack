import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {ProductMainContainer, ProductLeftCol, ProductRightCol, TwoPicturesContainer,
     SmallerImages, SmallerImagesContainer, SinglePictureComponent, BigImage, 
     ColoredCircleSingleItem, ProductsColorsContainer, ItemSelectAndQuantityDiv,
     ItemQuantityDiv, QuantityButtons
} from '../../../Styles/ContainersStyles'
import {
    ItemNameHeader, ItemPriceHeader, ItemHrStyle, ItemQuantityInput
} from '../../../Styles/HeadersStyles'
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function DeleteVariant () {

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

    const deleteProduct = async () =>{
        const accessToken = localStorage.getItem('accessToken')
        const config = {
            headers: { token: `Bearer ${accessToken}` }
        }
        const response = await axios.patch(
            `//localhost:8000/api/v1/products/${productId}/${variantId}`,
            {},
            config
        )
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
                <ItemHrStyle/>
                <button onClick={() => deleteProduct()}>Delete Variant</button>
            </ProductRightCol>   
                              
        </ProductMainContainer>
        
        </div>
    );
  
    }
}

export default DeleteVariant