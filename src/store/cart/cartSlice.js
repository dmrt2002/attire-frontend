import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let data = {
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                image: action.payload.image,
                price: action.payload.price
            }
            return Array.isArray(state) ? [...state, data] : state;
        },
        clearCart: () => {
            return []
        },
        removeFromCart: (state, action) => {
            if (!state.length) {
              return state;
            }
            const itemIndex = state.findIndex(item => item.id === action.payload);
            console.log(itemIndex, action.payload, "state")
            if (itemIndex === -1) {
              return state;
            }
            const newCart = state.slice();
            newCart.splice(itemIndex, 1);
            console.log(newCart, "state new")
            return newCart;
          }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer