

export type Menu ={
    id: number | string ;              
    createdAt?: string;    
    name: string;
    image?: string;
    price: number;
    category?: string;
    description?: string;
    stock?: number;
    rating?: number;
}


export type CartItem = Menu & {
    quantity: number;
    productId: number | string;
    userID:string;
};



export type CheckOutData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    otherInformation: string;
    radioBox: boolean;


    subTotal: number;
    shipping: number;
    total: number;
}



export type Order = {
    userID?: string;
    createdAt:string;
    id: number;
    date: string;
    items: CartItem[];
    checkoutData: CheckOutData;
};


