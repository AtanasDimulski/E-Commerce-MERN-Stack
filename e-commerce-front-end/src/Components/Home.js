import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "../swiperCSSStyles.css"
import { Pagination} from "swiper";
import landingImage1 from '../Images/langingImage1.png'
import {LandingPageImage, ModifiedSwiperSlide, HomeComponentButtonContainer, HomeComponentButton, ProductsGridContainer, 
    ProductsGridInner, ProductsImageContainer, ProductsColorsContainer, ColoredCircle} from '../Styles/ContainersStyles'
import {HomeNewestProductsHeader, ProductsPriceHeaderCard,
    ProductsMainHeaderCard} from '../Styles/HeadersStyles'
import {useNavigate} from 'react-router-dom';

function Home () {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const navigateToItem = (productId, variantId) => {
        navigate(`/singleProduct/${productId}/${variantId}`)
    }

    const getData = async () =>{
        try{
            const response = await axios.get(`//localhost:8000/api/v1/products/newestProducts`)
            setItems(response.data.products)                  
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() =>{
        getData()
    }, [])

    return(
        <div>
              <Swiper
                modules={[Pagination]}
                pagination
                slidesPerView={1}
                loop
            >
            <ModifiedSwiperSlide>
                <LandingPageImage src={landingImage1} />
            </ModifiedSwiperSlide>
            <SwiperSlide>
            2
            </SwiperSlide>
            <SwiperSlide>
            3
            </SwiperSlide>
        </Swiper>
       
        
        <HomeComponentButtonContainer>
            <HomeComponentButton onClick={() => navigate('/products/Men')}>Men</HomeComponentButton>
            <HomeComponentButton onClick={() => navigate('/products/Women')}>Women</HomeComponentButton>
        </HomeComponentButtonContainer>

        <HomeNewestProductsHeader>Newest Products</HomeNewestProductsHeader>
        <ProductsGridContainer>
                {items.map((item, id) =>(
                    <ProductsGridInner key={id} onClick={() => navigateToItem(item._id, item.variants._id)}>
                        <ProductsImageContainer src={item.variants.mainImageUrl} />
                        <ProductsColorsContainer>
                            {item.colors.map((color, index) =>(
                                <ColoredCircle backgroundColor={color} key={index}></ColoredCircle>
                            ))}
                        </ProductsColorsContainer>
                        <ProductsPriceHeaderCard>$ {item.price[0].$numberDecimal}</ProductsPriceHeaderCard>
                        <ProductsMainHeaderCard>{item.name[0]}</ProductsMainHeaderCard>
                    </ProductsGridInner>
                ))}
            </ProductsGridContainer>
        </div>
    )
}

export default Home