import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {CreateNewVariantSearchImg, ColoredCircle, CreateNewItemCenterContainer, NewVarianColoredCircleRow, NewVarianColoredCircleRowSingle} from '../../../Styles/ContainersStyles'
import {ProductsPriceHeaderCard} from '../../../Styles/HeadersStyles'
import CreateVariant from '../CreateNewVariant/CreateVariant'

function DeleteProduct() {
  const [queryName, setQueryName] = useState('')
  const [returnedItems, setRetrunredItems] = useState()
  const [error, setError] = useState(false)

    const getSearchData = async () =>{
      try{
          const response = await axios.get(`//localhost:8000/api/v1/singleProduct/search/${queryName}`)
          console.log(response.data.product)
          setRetrunredItems(response.data.product)
          setError(false)
      }catch(err){
          console.log(err)
          setError(true)
      }
    }

    const deleteProduct = async (id) =>{
        const accessToken = localStorage.getItem('accessToken')      
        const response = await axios.delete(
          `//localhost:8000/api/v1/products/${id}`, 
        { headers: {'token': `Bearer ${accessToken}`}}  
        )
    }

  return (
    <CreateNewItemCenterContainer>
        <input type="text" onChange={e => setQueryName(e.target.value)}></input>
        <button  onClick={getSearchData}>Search</button>      
        <div>
        {returnedItems? 
        <div>
          {error === false?       
            <div>  
              {returnedItems.attributes.length>1 ?
              <div>
                 <h1>{returnedItems.name}</h1>
                         
                  <NewVarianColoredCircleRow>
                  {returnedItems.attributes.map((elemAttribute, index) =>(                   
                      <ColoredCircle key={index} backgroundColor={elemAttribute.color}></ColoredCircle>                    
                  ))}
                  </NewVarianColoredCircleRow>
                 
                  <button onClick={() => deleteProduct(returnedItems._id)}>Delete Product</button>
              </div>
              :
              <div>
                <CreateNewVariantSearchImg src={returnedItems.attributes[0].mainImageUrl} />
                <NewVarianColoredCircleRowSingle>
                    <ColoredCircle  backgroundColor={returnedItems.attributes[0].color}></ColoredCircle>
                </NewVarianColoredCircleRowSingle>
                <ProductsPriceHeaderCard>{returnedItems.name}</ProductsPriceHeaderCard>
                <button onClick={() => deleteProduct(returnedItems._id)}>Delete Product</button>
              </div>
              }
            </div>
            :
            <div>
              <h1>This item doesn't exist</h1>
            </div>
            }          
        </div> 

        : 
        <div>
          {error !== true?
          <div></div>
          :
          <h1>This item doesn't exist</h1>
          }
        </div>}
        </div>
    </CreateNewItemCenterContainer>
  );
}


export default DeleteProduct