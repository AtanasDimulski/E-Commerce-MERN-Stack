import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Swiper, SwiperSlide } from "swiper/react";
import { grey } from '@mui/material/colors';

export const ProductMainContainer = styled.div`
    display:flex;
    flex-direction:row;
    width:80%;
    width:${props => props.width};
    margin-left:10%;  
    margin-left:${props => props.marginLeft};
    margin-bottom:3%;
     /* border-style:solid;
    border-color:black; */
`
export const ProductLeftCol = styled.div`
    width:65%;
    width:${props => props.width };
    margin-right:2.5%;
    /* border-style:solid;
    border-color:black; */
`
export const ProductRightCol = styled.div`
    width:32.5%;
    width:${props => props.width };
`
export const TwoPicturesContainer = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    column-gap:5%;
    margin-top:${props => props.marginTop};
`
export const SinglePictureComponent = styled.div`
    width:100%;
    margin-top:3%;
    margin-top:${props => props.marginTop};
`
export const SmallerImagesContainer = styled.div`
    width:47.5%;
    /* border-style:solid;
    border-color:black; */
`
export const SmallerImages = styled.img`
    width:100%;
    max-height:33vh;
    min-height:33vh;
    object-fit:fill!important;
`
export const BigImage = styled.img`
    width:100%;
    max-height:55vh;
    min-height:55vh;
    object-fit:fill!important;
`
export const AdminContainerRow = styled.div`
    width:90%;
    margin-left:5%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-bottom:3%;
`
export const AdminButtonCol = styled.button`
    width:30%;
    background-color:white;
    border-radius:5px;
    min-height:35vh;
    cursor: pointer;
`

export const CreateProductMainImage = styled.img`
    min-width:100%;
    max-width:100%;
    min-height:50vh;
    max-height:50vh;
    border-style:solid;
    border-color:navy;
    border-radius:2.5px;
    border-width:1px;
    margin-bottom:2.5%;
    object-fit:cover!important;
`

export const CreateProductSecondaryImage = styled.img`
    min-width:100%;
    max-width:100%;
    min-height:30vh;
    max-height:30vh;
    border-style:solid;
    border-color:navy;
    border-radius:2.5px;
    border-width:1px;
    margin-bottom:3%;
    object-fit:cover!important;
`

export const StyledOption = styled.option`
    min-width:100%;
`
export const StyledOSelect = styled.select`
    width:90%;
`
export const SelectContainer = styled.div`
    width:100%;
    margin-top:4%;
`
export const SizesRowContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin-top:10%;
    margin-bottom:5%;
`
export const SizesColContainer = styled.div`
    width:33%;
`
export const ColoredCircleSingleItem = styled.div`
    width:8px;
    height:8px;
    border-radius:50%;
    background-color:${props => props.backgroundColor};
    margin-right:3%;
`
//Select and Quantity Styles
export const ItemSelectAndQuantityDiv = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    height:20px;
    margin-bottom:5%;
`
export const ItemQuantityDiv = styled.div`
    width:50%;
    display:flex;
    flex-direction:row;
    margin-left:15%;
`
export const QuantityButtons = styled.button`

`
//Products Pages Styles
export const ProductsGridContainer = styled.div`
    width:95%;
    margin-left:2.5%;
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    justify-content: space-evenly;
    grid-column-start: 1;
    grid-column-end: 4;
`
export const ProductsGridInner = styled.div`
    width:100%;
`
export const ProductsImageContainer = styled.img`
    min-width:100%;
    max-width:100%;
    min-height:30vh;
    max-height:30vh;
    border-style:solid;
    border-color:navy;
    border-radius:2.5px;
    border-width:1px;
    margin-bottom:3%;
    object-fit:cover!important;
`
export const ProductsColorsContainer = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
`
export const ColoredCircle = styled.div`
    width:8px;
    height:8px;
    border-radius:50%;
    background-color:${props => props.backgroundColor};
    margin-right:5%;
`

//Create new variant
export const CreateNewVariantSearchImg = styled.img`
    max-width:260px;
    max-height:150px;
    object-fit:cover!important;
    margin-top:2%;
    margin-bottom:2%;
`

//Navigation Container styles
export const NavigationContainer = styled.div`
    width:100%;
    height:50px;
    margin-bottom:1.7%;
`
export const NavLinkContainer = styled.div`
    width:10%;
`
export const NavigationBottomRow = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    border-bottom-style:solid;
    border-bottom-width:0.5px;
`
export const NavigationTopRow = styled.div`
    width:90%;
    margin-left:5%;
    margin-bottom:1%;
    display:flex;
    flex-direction:row;
`
export const NavigationLogoContainer = styled.div`
    width:70%;
    text-align:center;
`
export const NavigationIconsContainer = styled.div`
    width:15%;
    margin-left:15%;
    display:flex;
    flex-direction:row;
    margin-top:2%;
`
export const PaginationContainer = styled.div`
    width:100%;
    margin-top:3%;
`
export const StackContainer = styled(Stack)`
    width:100%;
    align-items:center;
`
export const MenNavigationMenuInner = styled.div`
    width:80%;
    margin-left:10%;
    flex-direction:row;
    justify-content:space-between;
    display:none;
    ${NavLinkContainer}:hover &{
        display:flex;
    }   
`
export const MenNavigationMenu = styled.div`
    width:100%;
    position:absolute;
    left:0;
    background-color:white;
    z-index:5;
`

export const MenNavigationMenuColumn = styled.div`
    width:20%;
    display:flex;
    flex-direction:column;
`

//Sorting Field Styles
export const SortingRow = styled.div`
    width:90%;
    margin-left:5%;
    text-align:right;
    margin-bottom:1.5%;
    margin-top:1%;
`
export const StyledFilterSelect = styled.select`
    width:12%;
    font-size:0.4em;
    &:focus {
        outline: none;       
    }
`
//Login Containers
export const LoginComponentDiv = styled.div`
    width:30%;
    margin-left:35%;
`   
export const LoginForm = styled.form`
    display:flex;
    flex-direction:column;
`
export const LoginFormButton = styled.button`
    width:40%;
    margin-left:30%;
    margin-top:5%;
`
export const LoginFormPasswordContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
`
export const LoginFormShowPasswordButton = styled.button`
    width:15%;
    background-color:white;
    border-style:solid;
    border-left-style:none;
    border-width:1px;
`
export const LoginReroutingDiv = styled.div`
    display:flex;
    flex-direction:row;
    width:80%;
    margin-left:10%;
`
export const ReRoutingButton = styled.button`
    height:10px;
    border-style:none;
    background-color:white;
    font-size:0.8em;
    margin-top:12.5%;
    cursor: pointer;
`

//Home page
export const LandingPageImage = styled.img`
    height:200px;
    width:100%;
`

export const ModifiedSwiperSlide = styled(SwiperSlide)`
    width:100%;
    height:400px;
`

export const HomeComponentButtonContainer = styled.div`
    width:30%;
    margin-left:35%;
    margin-top:3%;
    display:flex;
    flex-direction:row;
    text-align:center;
    justify-content:space-between;
`
export const HomeComponentButton = styled.button`
    background-color:black;
    color:white;
    width:80px;
    cursor: pointer;
`

//Cart Styles

export const CartDescriptionRow = styled.div`
    width:90%;
    margin-left:5%;
    display:flex;
    flex-direction:row;
    background-color:#dcdcdc;
    margin-bottom:1%;
`
export const CartProductContainer = styled.div`
    width:90%;
    margin-left:5%;
    display:flex;
    flex-direction:row;
`
export const CartProductDetailsContainer = styled.div`
    width:30%;
    min-width:30%;
    text-align:left;
    display:flex;
    flex-direction:row;
`
export const CartProductDetailsContainerLeft = styled.div`
    width:47.5%;
    text-align:left;
    margin-right:2.5%;
`
export const CartProductDetailsContainerRight = styled.div`
    width:47.5%;
    text-align:left;
    margin-left:2.5%;
`
export const CartProductDeailtsImage = styled.img`
    width:100px;
    max-height:55px;
    object-fit:fill!important;
`
export const CartQuantityContainer = styled.div`
    width:30%;
    min-width:30%;
    text-align:center;
`
export const CartPriceContainer = styled.div`
    width:17.5%;
    text-align:left;
`
export const CartQuantityButton = styled.button`
    background-color:#dcdcdc;
    border-style:none;
`
export const CartDeleteButtonContainer = styled.div`
    width:5%;
`
export const CartDeleteButton = styled.button`
    background-color:transparent;
    border-style:none;
    cursor:pointer;
`
export const CartOrderDiv = styled.div`
    width:100%;
    text-align:center;
    margin-top:3%;
    display:flex;
    flex-direction:column;
`
export const CartOrderButton= styled.button`
    text-align:center;
    width:10%;
    margin-left:45%;
    margin-bottom:1%;
`
export const CartLoginLink = styled(Link)`
    text-decoration:none;
    font-size:1em;
    margin:0;
    color:black;
    margin-bottom:1%;
`
//User Dashboards Styles
export const UserDashboardCenterDiv = styled.div`
    width:100%;
    text-align:center;
    margin-bottom:2%;
`
export const UserDashboardContainer = styled.div`
    width:90%;
    margin-left:5%;
    display:flex;
    flex-direction:row;
`
export const UserDashboardContainerRow = styled.div`
    width:90%;
    margin-left:5%;
    display:flex;
    flex-direction:row;
    background-color:#dcdcdc;
`
export const UserDashboardColumns = styled.div`
    border-style:${props => props.borderStyle};
    width:33%;
    text-align:left;
`

//Single order
export const SingleOrderRowContainer = styled.div`
    width:90%;
    margin-left:5%;
    display:flex;
    flex-direction:row;
`
export const SingleOrderColumContainer = styled.div`
    width:25%;
    border-style:solid;
    border-width:1px;
    text-align:left;
`
export const StyledOSelectOrder= styled.select`
    width:40%;
    margin-left:30%;
`
export const SingleOrderButtonContainer = styled.div`
    width:100%;
    margin-top:3%;
    text-align:center;
`
export const CreateNewItemCenterContainer = styled.div`
    width:100%;
    text-align:center;
`
export const NewVarianColoredCircleRow = styled.div`
    width:10%;
    margin-left:45%;
    justify-content:space-between;
    text-align:center;
    display:flex;
    flex-direction:row;
`

export const NewVarianColoredCircleRowSingle = styled.div`
    width:2%;
    margin-left:49%;
    margin-bottom:1.5%;
`