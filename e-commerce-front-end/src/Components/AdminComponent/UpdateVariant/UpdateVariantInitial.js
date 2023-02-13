import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {CreateNewVariantSearchImg, ColoredCircle, CreateNewItemCenterContainer, NewVarianColoredCircleRow, NewVarianColoredCircleRowSingle} from '../../../Styles/ContainersStyles'
import {ProductsPriceHeaderCard} from '../../../Styles/HeadersStyles'
import CreateVariant from '../CreateNewVariant/CreateVariant'
import {useNavigate} from 'react-router-dom';

function UpdateVariantInitial() {
  const [queryName, setQueryName] = useState('')
  const [returnedItems, setRetrunredItems] = useState()
  const [error, setError] = useState(false)

    const getSearchData = async () =>{
      try{
          const response = await axios.get(`//localhost:8000/api/v1/singleProduct/search/${queryName}`)
          console.log(response.data.product)
          console.log(response.data.product.attributes)
          setRetrunredItems(response.data.product)
          console.log('This is returned items', returnedItems)
          setError(false)
      }catch(err){
          console.log(err)
          setError(true)
          console.log('error is true', error)
      }
    }


    const navigate = useNavigate();
    const navigateToItem = (productId,variantId) => {
      navigate(`/admin/update-variant/${productId}/${variantId}`)
    }
  return (
    <CreateNewItemCenterContainer>
        <input type="text" onChange={e => setQueryName(e.target.value)}></input>
        <button  onClick={getSearchData}>Search</button>      
        {returnedItems?
        <div> 
          {error === false?       
            <div>  
              {returnedItems.attributes.length>1 ?
              <div>
                <h1>{returnedItems.name}</h1>            
                <NewVarianColoredCircleRow>
                  {returnedItems.attributes.map((element, id) =>(                
                      <ColoredCircle  backgroundColor={element.color} onClick={() => navigateToItem(returnedItems._id, element._id)}></ColoredCircle>
                  ))}
                </NewVarianColoredCircleRow>
              </div>

              :

              <div>
                <CreateNewVariantSearchImg src={returnedItems.attributes[0].mainImageUrl} />
                <NewVarianColoredCircleRowSingle>
                  <ColoredCircle  backgroundColor={returnedItems.attributes[0].color}></ColoredCircle>
                </NewVarianColoredCircleRowSingle>
                <ProductsPriceHeaderCard>{returnedItems.name}</ProductsPriceHeaderCard>
                <button onClick={() => navigateToItem(returnedItems._id, returnedItems.attributes[0]._id)}>Eddit</button>
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
    </CreateNewItemCenterContainer>
  );
}

export default UpdateVariantInitial;