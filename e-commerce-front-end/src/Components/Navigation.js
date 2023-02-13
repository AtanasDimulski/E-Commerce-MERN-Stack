import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ItemPage from './ItemPage';
import Products from './Products';
import AdminDashboard from './AdminComponent/AdminDashboard';
import {NavigationContainer, MenNavigationMenu, MenNavigationMenuColumn, 
    MenNavigationMenuInner, NavLinkContainer, NavigationTopRow,
    NavigationBottomRow, NavigationLogoContainer, NavigationIconsContainer
} from '../Styles/ContainersStyles'
import {NavMainHeaderMen, NavSubCategoryHeader, NavSubSubCateogryHeader,
    NavigationLogoHeader, NavigationIconLink, NavigationLogoInnerHeader
} from '../Styles/HeadersStyles'
import CreateNewProduct from './AdminComponent/CreateNewProduct/CreateNewProduct'
import  CreateNewVariant from './AdminComponent/CreateNewVariant/CreateNewVariant'
import UpdateVariantInitial from './AdminComponent/UpdateVariant/UpdateVariantInitial'
import RegisterComponent from './LoginComponents/RegisterComponent';
import LoginComponent from './LoginComponents/LoginComponent'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart, faUser } from '@fortawesome/fontawesome-free-solid'
import UserDashboard from './UserDashboard'
import ProtectedRoutes from './ProtectedRoutes'
import NoLogin from './NoLogin'
import Home from './Home'
import Cart from './Cart'
import DeleteVariantInitial from './AdminComponent/DeleteVariant/DeleteVariantInitial'
import DeleteProduct from './AdminComponent/DeleteProduct/DeleteProduct'
import ManageOrders from './AdminComponent/ManageOrders/ManageOrders'
import SingleOrder from './AdminComponent/ManageOrders/SingleOrder'
import DeleteVariant from './AdminComponent/DeleteVariant/DeleteVatiant'
import UpdateVariant from './AdminComponent/UpdateVariant/UpdateVariant'
import AdmingLogin from './AdminLoggin'

function Navigation() {

    return (
        <div>          
            <Router>
                <NavigationContainer>
                    <NavigationTopRow>
                        <NavigationLogoContainer>
                            <NavigationLogoHeader to="/"><NavigationLogoInnerHeader>Logo</NavigationLogoInnerHeader></NavigationLogoHeader>
                        </NavigationLogoContainer>
                        <NavigationIconsContainer>
                            {localStorage.getItem('userName') ?
                            <div>
                            {localStorage.getItem('isAdmin') ?
                             <NavigationIconLink to="/admin"><FontAwesomeIcon icon={faUser} /></NavigationIconLink>
                             :
                             <NavigationIconLink to="/dashboard"><FontAwesomeIcon icon={faUser} /></NavigationIconLink>
                            }
                            </div>
                             :
                            <NavigationIconLink to="/login"><FontAwesomeIcon icon={faUser} /></NavigationIconLink>
                            }
                            <NavigationIconLink to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></NavigationIconLink>
                        </NavigationIconsContainer>
                    </NavigationTopRow>
                    <NavigationBottomRow>
                        <NavLinkContainer>
                            <NavMainHeaderMen to="/products/Men">Men</NavMainHeaderMen>

                            <MenNavigationMenu>
                                <MenNavigationMenuInner>
                                    <MenNavigationMenuColumn>
                                        <NavSubCategoryHeader to="/products/Men/Clothing">Clothing</NavSubCategoryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Clothing">All Clothing</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Clothing/Outerwear & Coats">Outerwear & Coats </NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Clothing/Leather"> Leather</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Clothing/T-Shirts">T-Shirts</NavSubSubCateogryHeader>
                                    </MenNavigationMenuColumn>

                                    <MenNavigationMenuColumn>
                                        <NavSubCategoryHeader to="/products/Men/Shoes">Shoes</NavSubCategoryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Shoes"> All Shoes</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Shoes/Low Top Sneakers">Low Top Sneakers</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Shoes/High Top Sneakers">High Top Sneakers</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Shoes/Runner">Runner</NavSubSubCateogryHeader>
                                    </MenNavigationMenuColumn>

                                    <MenNavigationMenuColumn>
                                        <NavSubCategoryHeader to="/products/Men/Bags">Bags</NavSubCategoryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Bags">All Bags</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Bags/Totes">Totes</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Bags/Back Packs">Back Packs</NavSubSubCateogryHeader>
                                    </MenNavigationMenuColumn>

                                    <MenNavigationMenuColumn>
                                        <NavSubCategoryHeader to="/products/Men/Accessoaries">Accessoaries</NavSubCategoryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Accessoaries">All Accessoaries </NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Accessoaries/Watches">Watches</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Men/Accessoaries/Eyewear">Eyewear</NavSubSubCateogryHeader>
                                    </MenNavigationMenuColumn>
                                </MenNavigationMenuInner>
                            </MenNavigationMenu>

                        </NavLinkContainer>
                        <NavLinkContainer>
                            <NavMainHeaderMen to="/products/Women">Women</NavMainHeaderMen>

                            <MenNavigationMenu>
                                <MenNavigationMenuInner>
                                    <MenNavigationMenuColumn>
                                        <NavSubCategoryHeader to="/products/Women/Clothing">Clothing</NavSubCategoryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Clothing">All Clothing</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Clothing/Outerwear & Coats">Outerwear & Coats </NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Clothing/Leather">Leather</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Clothing/T-Shirts">T-Shirts</NavSubSubCateogryHeader>
                                    </MenNavigationMenuColumn>

                                    <MenNavigationMenuColumn>
                                        <NavSubCategoryHeader to="/products/Women/Shoes">Shoes</NavSubCategoryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Shoes">All Shoes</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Shoes/Low Top Sneakers">Low Top Sneakers</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Shoes/High Top Sneakers"> High Top Sneakers</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Shoes/Runner">Runner</NavSubSubCateogryHeader>
                                    </MenNavigationMenuColumn>

                                    <MenNavigationMenuColumn>
                                        <NavSubCategoryHeader to="/products/Women/Bags">Bags</NavSubCategoryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Bags">All Bags</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Bags/Totes">Totes</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Bags/Back Packs">Back Packs</NavSubSubCateogryHeader>
                                    </MenNavigationMenuColumn>

                                    <MenNavigationMenuColumn>
                                        <NavSubCategoryHeader to="/products/Women/Accessories">Accessoaries</NavSubCategoryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Accessories">All Accessoaries</NavSubSubCateogryHeader> 
                                        <NavSubSubCateogryHeader to="/products/Women/Accessories/Watches">Watches</NavSubSubCateogryHeader>
                                        <NavSubSubCateogryHeader to="/products/Women/Accessories/Eyewear">Eyewear</NavSubSubCateogryHeader>
                                    </MenNavigationMenuColumn>
                                </MenNavigationMenuInner>
                            </MenNavigationMenu>

                        </NavLinkContainer>
                    </NavigationBottomRow>
                </NavigationContainer>

               
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route exact path='/dashboard' element={<UserDashboard/>}></Route>
                    </Route>
                    <Route element={<NoLogin />}>
                        <Route exact path='/login' element={<LoginComponent/>}></Route>
                        <Route exact path='/register' element={<RegisterComponent/>}></Route>
                    </Route>
                    <Route element={<AdmingLogin />}>
                        <Route exact path='/admin' element={< AdminDashboard />}></Route>
                        <Route exact path='/admin/create-new-product' element={< CreateNewProduct />}></Route>
                        <Route exact path='/admin/create-new-variant' element={< CreateNewVariant />}></Route>
                        <Route exact path='/admin/update-variant' element={< UpdateVariantInitial />}></Route>
                        <Route exact path='/admin/update-variant/:productId/:variantId' element={< UpdateVariant />}></Route>
                        <Route exact path='/admin/delete-product' element={< DeleteProduct />}></Route>
                        <Route exact path='/admin/delete-variant-search' element={< DeleteVariantInitial />}></Route>
                        <Route exact path='/admin/manage-orders' element={< ManageOrders />}></Route>
                        <Route exact path='/admin/manage-orders/:orderId' element={< SingleOrder />}></Route>
                        <Route exact path='/admin/delete-variant/:productId/:variantId' element={< DeleteVariant />}></Route>
                    </Route>
                    <Route exact path='/singleProduct/:productId/:variantId' element={< ItemPage />}></Route>
                    <Route exact path='/products/:category' element={< Products />}></Route>
                    <Route exact path='/products/:category/:subCategory' element={< Products />}></Route>
                    <Route exact path='/products/:category/:subCategory/:subSubCategory' element={< Products />}></Route>
                    <Route exact path='/' element={< Home />}></Route>
                    <Route exact path='/cart' element={< Cart />}></Route>
                </Routes>
            </Router>
         </div>

    );
  }
  
  export default Navigation;