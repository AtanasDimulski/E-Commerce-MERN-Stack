import React, { useState } from 'react';
import axios from 'axios'
import {
        ProductMainContainer, ProductLeftCol, ProductRightCol, SinglePictureComponent, 
        TwoPicturesContainer, CreateProductMainImage, CreateProductSecondaryImage, SmallerImagesContainer,
        StyledOption, StyledOSelect, SelectContainer, SizesRowContainer, SizesColContainer
    } from '../../../Styles/ContainersStyles'
import {InputSizes, SizesLabel, CreateVariantCategoryHeaders} from '../../../Styles/HeadersStyles'

function CreateVariant({idParam, category, subCategory, subSubCategory}) {
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
    const [color, setColor] = useState('black')

    //Sizes
    const [sizeXS,setSizeXS] = useState(0)
    const [sizeS,setSizeS] = useState(0)
    const [sizeM,setSizeM] = useState(0)
    const [sizeL,setSizeL] = useState(0)
    const [sizeXL,setSizeXL] = useState(0)
    const [sizeXXL,setSizeXXL] = useState(0)

    const submit = async event =>{
        event.preventDefault()
        const accessToken = localStorage.getItem('accessToken')
        const formData = new FormData();
        formData.append('image', file)
        formData.append('image', file1)
        formData.append('image', file2)
        formData.append('image', file3)
        formData.append('image', file4)
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
        await axios.post(
            `//localhost:8000/api/v1/products/photo/${idParam}`, 
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
                <label>Color:</label>
                <input onChange={e => setColor(e.target.value)} type="text" ></input>

                <SelectContainer>
                    <label>Category:</label>
                    <CreateVariantCategoryHeaders>{category}</CreateVariantCategoryHeaders>
                </SelectContainer>
                
                <SelectContainer>
                    <label>Sub Category:</label>
                    <CreateVariantCategoryHeaders>{subCategory}</CreateVariantCategoryHeaders>
                </SelectContainer>   

                <SelectContainer>
                     <label>Sub Sub Category:</label>
                    <CreateVariantCategoryHeaders>{subSubCategory}</CreateVariantCategoryHeaders>
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

export default CreateVariant;