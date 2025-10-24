
import  { createSlice } from "@reduxjs/toolkit";
import type  { PayloadAction } from "@reduxjs/toolkit";

import type { Menu, CartDashItem } from "../types";


type CartState = {
    items: CartDashItem[];
    customerName: string;
    location: string;
    total:number;
};
const initialState:CartState ={
    items: [],
    customerName: "",
    location: "",
    total: 0,
}

const cartDashSlice = createSlice({
    name: "cartDash",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ item: Menu; quantity: number }>) => {
            const existing = state.items.find(item => item.id === action.payload.item.id);
            if (existing) {
                existing.quantity += action.payload.quantity;
                if (existing.quantity < 1) existing.quantity = 1;
            } else {
                state.items.push({ ...action.payload.item, quantity: action.payload.quantity });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
            state.customerName = "";
            state.location = "";
        },
        setCustomerInfo: (state, action: PayloadAction<{ name: string; location: string }>) => {
            state.customerName = action.payload.name;
            state.location = action.payload.location;
        }
    }
});

export const { addToCart, removeFromCart, clearCart, setCustomerInfo  } = cartDashSlice.actions;
export default cartDashSlice.reducer;