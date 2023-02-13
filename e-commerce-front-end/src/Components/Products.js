import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
    ProductsGridContainer, ProductsGridInner, ProductsImageContainer,
    ColoredCircle, ProductsColorsContainer, SortingRow, StyledFilterSelect,
    PaginationContainer,StackContainer
} from '../Styles/ContainersStyles'
import {ProductsMainHeaderCard, ProductsPriceHeaderCard, StyledFilterOptionHeader} from '../Styles/HeadersStyles'
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Products() {
    const [items, setItems] = useState([]);
    const {category, subCategory, subSubCategory} = useParams()
    const [priceOrder, setPriceOrder] = useState()
    const [dateOrder, setDateOrder] = useState()
    const [totalNumberOfItems, setTotalNumberOfItems] = useState(1)
    const [page, setPage] = useState(1);
    const handlePaginationChange = (event, value) => {
      setPage(value);
    };

    const handleFilterChange=(filterValue) =>{
        if(filterValue === 'priceAscending'){
            setPriceOrder(-1)
            setDateOrder('')
            setPage(1)
        }
        else if(filterValue === 'priceDescending'){
            setPriceOrder(1)
            setDateOrder('')
            setPage(1)
        }
        else if(filterValue === 'newest'){
            setDateOrder(-1)
            setPriceOrder('')
            setPage(1)
        }
        else if(filterValue === 'oldest'){
            setDateOrder(1)
            setPriceOrder('')
            setPage(1)
        }
    }

    const navigate = useNavigate();
    const navigateToItem = (productId, variantId) => {
        navigate(`/singleProduct/${productId}/${variantId}`)
    }
    
    const onlyCategoryTrue = Boolean(category) && Boolean(!subCategory) && Boolean(!subSubCategory)
    const categoryAndSubCategory = Boolean(category) && Boolean(subCategory) && Boolean(!subSubCategory)
    const categorySubAndSubSubcategory = Boolean(category) && Boolean(subCategory) && Boolean(subSubCategory)
    const getData = async () =>{
        try{
            if(onlyCategoryTrue){
                if(priceOrder){
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}`, {params: {priceOrder: priceOrder, scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)                   
                }
                else if(dateOrder){
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}`, {params: {dateOrder: dateOrder, scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)
                }
                else{
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}`, {params: {scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)
                }
            }
            else if(categoryAndSubCategory) {
                if(priceOrder){
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}/${subCategory}`, {params: {priceOrder: priceOrder, scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)                   
                }
                else if(dateOrder){
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}/${subCategory}`, {params: {dateOrder: dateOrder, scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)
                }
                else{
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}/${subCategory}`, {params: {scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)
                }
            }else if (categorySubAndSubSubcategory){
                if(priceOrder){
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}/${subCategory}/${subSubCategory}`, {params: {priceOrder: priceOrder, scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)                   
                }
                else if(dateOrder){
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}/${subCategory}/${subSubCategory}`, {params: {dateOrder: dateOrder, scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)
                }
                else{
                    const response = await axios.get(`//localhost:8000/api/v1/products/${category}/${subCategory}/${subSubCategory}`, {params: {scrollPage:page-1}})
                    setItems(response.data.products)
                    setTotalNumberOfItems(response.data.number)
                }
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() =>{
        getData()
    }, [category, subCategory, subSubCategory, priceOrder, dateOrder, totalNumberOfItems, page])
    
   
    return (
        
        <div>       
            <SortingRow>
                <StyledFilterSelect onChange={(e) => handleFilterChange(e.target.value)}>
                    <option><StyledFilterOptionHeader>SORT BY</StyledFilterOptionHeader></option>
                    <option value='priceAscending'>Price: High to Low</option>
                    <option value='priceDescending'>Price: Low to High</option>
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                </StyledFilterSelect>
            </SortingRow>
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
            <PaginationContainer>
                <StackContainer spacing={2}>
                    <Pagination count={Math.ceil(totalNumberOfItems/4)} page={page} onChange={handlePaginationChange}/>
                </StackContainer>
            </PaginationContainer>
        </div>
    );
  }
  
  export default Products;