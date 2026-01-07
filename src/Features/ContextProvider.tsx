
import { createContext, useReducer } from "react";
import type { Dispatch } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CartReducer from "./CartReducer";
import type { Menu } from "../types";
import type { CartAction } from "./CartReducer";
import type { CartItem } from "./CartReducer";



type CartContextType = {
    cart:CartItem[];
    dispatch: Dispatch<CartAction>;
    menuData:Menu[];
    loading: boolean;
    error: string | null;
}

type ContextProviderType ={
    children:React.ReactNode;
}

export const CartContext=createContext<CartContextType| undefined>( undefined)!;


const ContextProvider:React.FC<ContextProviderType>  = ({children}) => {
    const [cart, dispatch] =useReducer(CartReducer, [])
    const [menuData, setMenuData] = useState<Menu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    // get data from API
        async function getAllMenuData() {
            try {
                const menuData  = await axios.get<Menu[]>("https://68e3e5f38e116898997a5f72.mockapi.io/items");
                const allMenuData= menuData.data.map(item => ({
                    id: Number(item.id),        
                    name: item.name,
                    description: item.description,    
                    price: item.price,
                    image: item.image,
                    category: item.category
                }));
                console.log(allMenuData)
                setMenuData(allMenuData);

            }catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(String(error));
                }
            }finally {
                setLoading(false);
            } 
        }
    
        useEffect(() => {
            getAllMenuData()
        }, [])

    return (
    <>
        <CartContext.Provider value={{cart, dispatch, menuData, loading, error }}>
            {children}
        </CartContext.Provider>
    </>
    )

}


export default ContextProvider;
