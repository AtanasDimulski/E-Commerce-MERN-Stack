import React, { useState } from 'react';
import axios from 'axios'
import {
        ProductMainContainer, ProductLeftCol, ProductRightCol, SinglePictureComponent, 
        TwoPicturesContainer, CreateProductMainImage, CreateProductSecondaryImage, SmallerImagesContainer,
        StyledOption, StyledOSelect, SelectContainer, SizesRowContainer, SizesColContainer
    } from '../../../Styles/ContainersStyles'
import {InputSizes, SizesLabel} from '../../../Styles/HeadersStyles'

function CreateNewProduct() {
    const [file, setFile] = useState()
    const [image, setImage] = useState(null)
    const [file1, setFile1] = useState()
    const [image1, setImage1] = useState(null)
    const [file2, setFile2] = useState()
    const [image2, setImage2] = useState(null)
    const [file3, setFile3] = useState()
    const [image3, setImage3] = useState(null)
    const [file4, setFile4] = useState()
    const [image4, setImage4] = useState(null)
    const [name, setName] = useState('Pencho')
    const [price, setPrice] = useState(290.99)
    const [color, setColor] = useState('black')
    const [category,setCategory] = useState('Men')
    const [subSubCategory,setSubSubCategory] = useState('No Sub Sub Category')
    //Sizes
    const [sizeXS,setSizeXS] = useState(0)
    const [sizeS,setSizeS] = useState(0)
    const [sizeM,setSizeM] = useState(0)
    const [sizeL,setSizeL] = useState(0)
    const [sizeXL,setSizeXL] = useState(0)
    const [sizeXXL,setSizeXXL] = useState(0)
    
    const categories = ['Men', 'Women']
    const subCategories = [
        {   
            name:'Clothing',
            values:[
                'No Sub Sub Category',
                'Outerwear & Coats', 
                'Leahter', 
                'T-Shirts' 
            ]
        },
        {   
            name:'Shoes',
            values:[
                'No Sub Sub Category',
                'Low Top Sneakers', 
                'High Top Sneakers',
                'Runner' 
            ]
        },
        {   
            name:'Bags',
            values:[
                'No Sub Sub Category',
                'Totes', 
                'BackPacks'
            ]
        },
        {   
            name:'Accessories',
            values:[
                'No Sub Sub Category',
                'Watches', 
                'Eyewear' 
            ]
        },
    ]
    const [subCategory,setSubCategory] = useState('Clothing')
    const submit = async event =>{
        const accessToken = localStorage.getItem('accessToken')
        event.preventDefault()
        const formData = new FormData();
        formData.append('image', file)
        formData.append('image', file1)
        formData.append('image', file2)
        formData.append('image', file3)
        formData.append('image', file4)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("color", color)
        formData.append("category", category)
        formData.append("subCategory", subCategory)
        formData.append("subSubCategory", subSubCategory)
        formData.append("sizeXS", sizeXS)
        formData.append("sizeS", sizeS)
        formData.append("sizeM", sizeM)
        formData.append("sizeL", sizeL)
        formData.append("sizeXL", sizeXL)
        formData.append("sizeXXL", sizeXXL)
        console.log(formData)
        await axios.post(
            "//localhost:8000/api/v1/products/photo", 
             formData,
            { headers: {
                'Content-Type': 'multipart/form-data', 
                'token': `Bearer ${accessToken}`}
            }           
        )
    }
   
  return (
    
        <form onSubmit={submit}>
            <ProductMainContainer width="90%" marginLeft="5%">
            <ProductLeftCol width="70%">
            <SinglePictureComponent marginTop="0%">
                <CreateProductMainImage  src={image} alt="preview image"/>
                <input  onChange={e => [setImage(URL.createObjectURL(e.target.files[0])), setFile(e.target.files[0])] } type="file" accept = "image/*"></input>
            </SinglePictureComponent>

            <TwoPicturesContainer marginTop="3%">
                <SmallerImagesContainer>
                    <CreateProductSecondaryImage src={image1} alt="preview image"/>
                    <input onChange={e => [setImage1(URL.createObjectURL(e.target.files[0])), setFile1(e.target.files[0])]} type="file" accept = "image/*"></input>
                </SmallerImagesContainer>
                
                <SmallerImagesContainer>
                    <CreateProductSecondaryImage src={image2} alt="preview image"/>
                    <input onChange={e => [setImage2(URL.createObjectURL(e.target.files[0])), setFile2(e.target.files[0])]} type="file" accept = "image/*"></input>
                </SmallerImagesContainer>
            </TwoPicturesContainer>

            <TwoPicturesContainer marginTop="3%">
                <SmallerImagesContainer>
                    <CreateProductSecondaryImage src={image3} alt="preview image"/>
                    <input onChange={e => [setImage3(URL.createObjectURL(e.target.files[0])), setFile3(e.target.files[0])]} type="file" accept = "image/*"></input>
                </SmallerImagesContainer>
                
                <SmallerImagesContainer>
                    <CreateProductSecondaryImage src={image4} alt="preview image"/>
                    <input onChange={e => [setImage4(URL.createObjectURL(e.target.files[0])), setFile4(e.target.files[0])]} type="file" accept = "image/*"></input>
                </SmallerImagesContainer>
            </TwoPicturesContainer>

            </ProductLeftCol>
            <ProductRightCol width="27.5%">
                <label>Name:</label>
                <input onChange={e => setName(e.target.value)} type="text" ></input>
                <label>Price:</label>
                <input onChange={e => setPrice(e.target.value)} type="text" ></input>
                <label>Color:</label>
                <input onChange={e => setColor(e.target.value)} type="text" ></input>

                <SelectContainer>
                    <label>Category:</label>
                    <StyledOSelect onChange={e =>setCategory(e.target.value)}>
                        {categories.map((element, id) => 
                            <StyledOption value={element} key={id}>{element}</StyledOption>
                        )}
                    </StyledOSelect>
                </SelectContainer>
                
                <SelectContainer>
                    <label>Sub Category:</label>
                    <StyledOSelect onChange={e => setSubCategory(e.target.value)}>
                        {subCategories.map((element, id) => 
                            <option value={element.name} key={id}>{element.name}</option>
                        )}
                    </StyledOSelect>
                </SelectContainer>   

                <SelectContainer>
                     <label>Sub Sub Category:</label>
                    {subCategories.map((element, id) => {
                        if(element.name === subCategory){
                            return(
                                <StyledOSelect key={id} onChange={e => setSubSubCategory(e.target.value)}>
                                    {element.values.map((value, index) =>{
                                        return(
                                            <option value={value} key={index}>{value}</option>
                                        )
                                    })}
                                </StyledOSelect>
                            )}
                        }
                    )}
                </SelectContainer>

                <SizesRowContainer>
                    <SizesColContainer>
                        <SizesLabel>XS: </SizesLabel>
                        <InputSizes onChange={e => setSizeXS(e.target.value)} type="text" value={sizeXS}></InputSizes>
                    </SizesColContainer>

                    <SizesColContainer>
                        <SizesLabel>S: </SizesLabel>
                        <InputSizes onChange={e => setSizeS(e.target.value)} type="text" value={sizeS}></InputSizes>
                    </SizesColContainer>

                    <SizesColContainer>
                        <SizesLabel>M: </SizesLabel>
                        <InputSizes onChange={e => setSizeM(e.target.value)} type="text" value={sizeM}></InputSizes>
                    </SizesColContainer>
                </SizesRowContainer>

                <SizesRowContainer>
                    <SizesColContainer>
                        <SizesLabel>L: </SizesLabel>
                        <InputSizes onChange={e => setSizeL(e.target.value)} type="text" value={sizeL}></InputSizes>
                    </SizesColContainer>

                    <SizesColContainer>
                        <SizesLabel>XL: </SizesLabel>
                        <InputSizes onChange={e => setSizeXL(e.target.value)} type="text" value={sizeXL}></InputSizes>
                    </SizesColContainer>

                    <SizesColContainer>
                        <SizesLabel>XXL: </SizesLabel>
                        <InputSizes onChange={e => setSizeXXL(e.target.value)} type="text" value={sizeXXL}></InputSizes>
                    </SizesColContainer>
                </SizesRowContainer>

                <button type="submit">Submit</button>
            </ProductRightCol>
            </ProductMainContainer>
        </form>
  );
}

export default CreateNewProduct;