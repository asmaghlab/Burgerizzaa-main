
import  { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
import type { CartItem , Menu } from '../types'
import axios from 'axios';

type CartState = CartItem[];

const initialState: CartState = [];


// Using Thunks To Deal With API 

// 1. get All Data Cart From API ::
export const getAllDataCart=createAsyncThunk('cart/get', async(_, {getState})=> {
    const state = getState() as { user: { user: { id: string }}};
    const userID = state.user.user.id;

    const allDataCart=await axios.get<CartItem[]>("https://68eec8f4b06cc802829b50f7.mockapi.io/cart");

    return allDataCart.data.filter(item => item.userID ===  userID);
})



// 2.Add Items To Cart::
export const add = createAsyncThunk("cart/add", async(product: Menu, {getState})=> {

    const state =getState() as {cart:CartItem[], user: { user: { id: string }}};
    const userID = state.user.user.id;
    const exist= state.cart.find(item=> item.id === product.id)

    if(exist) {
        const updatedQuantity ={...exist, quantity:exist.quantity + 1}
        const dataUpdated = await axios.put(`https://68eec8f4b06cc802829b50f7.mockapi.io/cart/${exist.id}`, updatedQuantity);

        return dataUpdated.data; 
        
    }else {
        const addedItem=await axios.post("https://68eec8f4b06cc802829b50f7.mockapi.io/cart", 
            {...product, productId: product.id, quantity:1, userID: userID,});
        return addedItem.data;
    }
})

// 3.Remove Items From Cart::
export const remove= createAsyncThunk('cart/remove', async(id:number)=> {
    await axios.delete(`https://68eec8f4b06cc802829b50f7.mockapi.io/cart/${id}`)

    return id;
})


// 4. Incease Item Quantity in Cart::
export const increase=createAsyncThunk('cart/increase', async(item:CartItem)=> {

    const updateQuantity= {...item, quantity:item.quantity + 1};
    const dataUpdated= await axios.put(`https://68eec8f4b06cc802829b50f7.mockapi.io/cart/${item.id}`, updateQuantity);
    
    return dataUpdated.data

}) 

// 5. decrease Item (If Quantity = 1 Delete Item)::

export const decrease = createAsyncThunk("cart/decrease", async (item: CartItem) => {
    if (item.quantity === 1) {

        await axios.delete(`https://68eec8f4b06cc802829b50f7.mockapi.io/cart/${item.id}`);
        return { id: item.id, removed: true };
    
    } else {

        const updatedQuantity = { ...item, quantity: item.quantity - 1 };
        const dataUpdated = await axios.put(`https://68eec8f4b06cc802829b50f7.mockapi.io/cart/${item.id}`,updatedQuantity);
        
        return dataUpdated.data;

    }
});



// 6. Decrease Item (If Quantity = 1 Don't Delete Item)::
export const decreaseCart =createAsyncThunk('cart/decreaseCart', async(item: CartItem)=> {
    if (item.quantity > 1) {
        const updateQuantity = {...item, quantity:item.quantity -1};
        const updatedData =await axios.put(`https://68eec8f4b06cc802829b50f7.mockapi.io/cart/${item.id}`, updateQuantity);

        return updatedData.data;
    }else {
        return item;
    }
});


// 7. Crear Cart ::
export const clearCart = createAsyncThunk('cart/clearCart', async (_, { getState }) => {
    const state = getState() as { cart: CartItem[] };
    await Promise.all(state.cart.map(item => axios.delete(`https://68eec8f4b06cc802829b50f7.mockapi.io/cart/${item.id}`)));
    return [];
});





const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers: {

        // add: (state, action:PayloadAction<Menu>)=> {
        //     const exist = state.find(item => item.id === action.payload.id);
        //     if (exist) {
        //         return state.map((item) =>
        //         item.id === action.payload.id
        //             ? { ...item, quantity: item.quantity + 1 }
        //             : item
        //         );
        //     }
        //     return [...state, { ...action.payload, quantity: 1 }];
        // },


        // remove:(state, action: PayloadAction<number>) => {
        //     return state.filter((item) => item.id !== action.payload);
        // },

        // increase:(state , action: PayloadAction<number>) => {
        //     return state.map((item) =>
        //         item.id === action.payload
        //         ? { ...item, quantity: item.quantity + 1 }
        //         : item
        //     );
        // },

        // decrease:(state, action:PayloadAction<number>) => {
        // return state.map((item) =>
        //     item.id === action.payload
        //         ? { ...item, quantity: item.quantity - 1 }
        //         : item
        //     )
        //     .filter((item) => item.quantity > 0);
        // },

        // decreaseCart: (state, action: PayloadAction<number>) => {
        //     const item = state.find(i => i.id === action.payload);
        //     if (item && item.quantity > 1) {
        //         item.quantity -= 1;
        //     }
        // },
        
        clearCartAll:()=> {
            return[];
        },
        

    },




    extraReducers:(builder)=> {
        builder
        .addCase(getAllDataCart.fulfilled, (_, action)=> action.payload)

        .addCase(add.fulfilled, (state, action) => {
            const exist = state.find(item => Number(item.id) === Number(action.payload.id));
            if (!exist) state.unshift(action.payload);
            else {
            const index = state.findIndex(item => Number(item.id) === Number(action.payload.id));
            state[index] = action.payload;
            }
        })

        .addCase(remove.fulfilled, (state, action) =>
            state.filter(item => Number(item.id) !== Number(action.payload))
        )

        .addCase(increase.fulfilled, (state, action) => {
            const index = state.findIndex(item => Number(item.id) === Number(action.payload.id));
            if (index !== -1) state[index] = action.payload;
        })

        .addCase(decrease.fulfilled, (state, action) => {
            if ('removed' in action.payload && action.payload.removed) {
            return state.filter(item => Number(item.id) !== Number(action.payload.id));
            }
            const index = state.findIndex(item => Number(item.id) === Number(action.payload.id));
            if (index !== -1) state[index] = action.payload;
        })

        .addCase(decreaseCart.fulfilled, (state, action) => {
            const index = state.findIndex(item => Number(item.id) === Number(action.payload.id));
            if (index !== -1) state[index] = action.payload;
        })

        .addCase(clearCart.fulfilled, () => []);
        }
});


// export const { add, remove, increase, decrease,decreaseCart, clearCart } = cartSlice.actions;
export const { clearCartAll } = cartSlice.actions;
export default cartSlice.reducer;
















