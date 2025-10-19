
import  { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type { CartItem , Menu } from '../types'

type CartState = CartItem[];

const initialState: CartState = [];

const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers: {

        add: (state, action:PayloadAction<Menu>)=> {
            const exist = state.find(item => item.id === action.payload.id);
            if (exist) {
                return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        },


        remove:(state, action: PayloadAction<number>) => {
            return state.filter((item) => item.id !== action.payload);
        },

        increase:(state , action: PayloadAction<number>) => {
            return state.map((item) =>
                item.id === action.payload
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        },

        decrease:(state, action:PayloadAction<number>) => {
        return state.map((item) =>
            item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);
        },

        decreaseCart: (state, action: PayloadAction<number>) => {
            const item = state.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        
        clearCart:()=> {
            return[];
        },
        

    },
});


export const { add, remove, increase, decrease,decreaseCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
















