import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction } from "@reduxjs/toolkit";
import type { CheckOutData } from "../types";
import type { CartItem } from "../types";

const initialState: CheckOutData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    otherInformation: "",
    radioBox: true,

    subTotal: 0,
    shipping: 50,
    total: 0,
};



const CheckOutSlice = createSlice({
    name:"checkout",
    initialState, 
    reducers: {
    saveCheckOutPersonalData:(state, action: PayloadAction<{ name: keyof CheckOutData; value: string | boolean }>) => {
        const { name, value } = action.payload;
        (state as any)[name] = value;
    },

    sumTotals:(state, action: PayloadAction<CartItem[]>) => {
        const cart = action.payload;
        const subTotal = cart.reduce(
            (sum, product) => sum + product.quantity * product.price,
            0
        );
        const shipping = 50;
        const totalPrice = subTotal + shipping;

        state.subTotal = subTotal;
        state.shipping = shipping;
        state.total = totalPrice;
    },


    }
})


export const {saveCheckOutPersonalData, sumTotals } = CheckOutSlice.actions;
export default  CheckOutSlice.reducer;