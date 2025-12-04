import type { Menu } from "../types"; 

export type CartItem = Menu & {
    quantity: number;
};

type CartState = CartItem[];

export type CartAction =
| {type :"Add"; payload:Menu}
| { type: "Remove"; payload: number}
| { type: "Increase"; payload: number}
| { type: "Decrease"; payload: number};


const CartReducer = (state: CartState, action: CartAction):CartState  => {
    switch (action.type) {
        case "Add": {
            const exist = state.find((item) => item.id === action.payload.id);
            if (exist) {
                return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];

        }
        case "Remove":
            return state.filter((item) => item.id !== action.payload);

        case "Increase":
            return state.map((item) =>
                item.id === action.payload
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );

        case "Decrease":
            return state
                .map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
                .filter((item) => item.quantity > 0);

    default:
        return state;
    }
};


export default CartReducer;