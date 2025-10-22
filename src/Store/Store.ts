import { configureStore } from "@reduxjs/toolkit";

import CartReducer, { clearCart } from './CartSlice';
import MenuReducer from './MenuSlice';
import userReducer from './Userslice';
import resetReducer from './Resetslice';
import checkOutReducer from './CheckOutSlice';

export const store = configureStore({
    reducer: {
        cart: CartReducer,
        menu: MenuReducer,
        user: userReducer,
        resetuser: resetReducer,
        checkout: checkOutReducer,
    },
    devTools: true,
});

let previousUser = store.getState().user.user;

store.subscribe(() => {
    const currentUser = store.getState().user.user;

    if (previousUser && !currentUser) {
        store.dispatch(clearCart());
    }

    previousUser = currentUser;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
