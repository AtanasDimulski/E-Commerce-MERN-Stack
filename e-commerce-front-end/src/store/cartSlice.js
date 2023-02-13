import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    // order: []
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.item._id && item.size === action.payload.optionSelectedSize);
      if (itemInCart) {
        itemInCart.quantity += action.payload.quantityOfItems
      } else {
        state.cart.push({
            productId:action.payload.item._id,
            variantId:action.payload.variant.attributes._id, 
            productName:action.payload.item.name, 
            quantity: action.payload.quantityOfItems, 
            imgUrl: action.payload.variant.attributes.mainImageUrl,
            productColor: action.payload.variant.attributes.color,
            productSize: action.payload.optionSelectedSize,
            price: action.payload.item.price.$numberDecimal,
            sizeAndId: action.payload.item._id + action.payload.optionSelectedSize
        });
        // state.order.push({
        //     productId:action.payload.item._id, 
        //     productName:action.payload.item.name, 
        //     productColor: action.payload.variant.attributes.color,
        //     productSize: action.payload.optionSelectedSize,
        //     quantity: action.payload.quantityOfItems,
        // })
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.sizeAndId !== action.payload);
      state.cart = removeItem;
    },
    removeAllItems: (state) => {
      state.cart = [];
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeAllItems
} = cartSlice.actions;