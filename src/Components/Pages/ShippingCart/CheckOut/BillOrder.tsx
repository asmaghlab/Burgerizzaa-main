import React from 'react'
import { useSelector} from 'react-redux';
import type { RootState } from '../../../../Store/Store';

type BillOrder = {
    onClose: () => void;
}

const BillOrder:React.FC<BillOrder> = ({onClose}) => {

    const checkout = useSelector((state: RootState) => state.checkout);
    const today = new Date().toLocaleString();


    return (
        <>


        <div className="bill_overlay_box" onClick={onClose}>
            <div className="bill-box">
                <h1>🎉</h1>
                <div className="bill_info">
                    <h2>Thank you!</h2>
                    <p>Your order has been issued successfully </p>
                </div>
                <div className="order_data">
                    <p>Date&Time <span>{today}</span></p>
                    <p>Amount <span>{checkout.total.toFixed(2)}</span></p>
                </div>

            </div>
        </div>
        
        
        </>
    )
}

export default BillOrder