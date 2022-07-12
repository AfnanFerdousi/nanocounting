import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ order, index, setDeleteOrder }) => {
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{order.buyer}</td>
            <td>{order.phone}</td>
            <td>{order.orderAmount}</td>
            <td>{order.buyerAddress}</td>
            <td>{order.productName}</td>
            <td>{(!order.paid) ? <>
                <Link to={`/dashboard/payment/${order?._id}`} className="btn btn-success btn-sm">Pay</Link>
                <label htmlFor="deleting-confirm-2" className="btn btn-sm bg-red-500 ml-2 border-0" 
                onClick={() => setDeleteOrder(order)} >Delete</label></> 
                : 
                <>
                <span className="text-success">Paid</span>
                <p className='font-bold'>Transaction id: <br/><span className='text-orange-700'>{order?.transactionId}</span></p> 
                </>                               
            }
            </td>
            <td>
            {(order.paid === true && order.pending === false) 
            ? 
            <p className='text-green-500 font-bold'>DELIVERED</p> 
            : (order.paid === false) 
            ? <p className='text-rede-500'>UNPAID</p>
            :(order.paid===true && order.pending === true) 
            && 
            <h2 className='text-blue-500'>Pending...</h2>}
            </td>
            <td>
            {
                (order.paid) ? 
                <>
                <Link className='btn btn-sm btn-primary text-white' 
                to={`/reciept/${order?._id}`}>Reciept</Link>
                </>
                :
                <></>
            }
            </td>
            
        </tr >
    );
};

export default OrderRow;