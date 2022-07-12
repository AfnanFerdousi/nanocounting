import React from 'react';

const ManageOrderRow = ({ order,allOrder, index, setDeleteOrder }) => {

    const updateStatus = (_id) => {
        console.log(_id)
        fetch(`https://polar-lowlands-05694.herokuapp.com/pending/${_id}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json()).then(data => console.log(data))
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{allOrder.productName}</td>
            <td>{allOrder.phone}</td>
            <td>{allOrder.buyerEmail}</td>
            <td>{(!allOrder.paid) ?
                <>
                <span className="text-red-500">UNPAID</span>
                <label htmlFor="deleting-confirm-2" className="btn btn-sm bg-red-500 ml-2 border-0" 
                onClick={() => setDeleteOrder(allOrder)} >Delete</label></> 
                : 
                allOrder.pending 
                ? 
                <button className="btn btn-sm btn-primary" 
                onClick={() => updateStatus(allOrder._id)}>Pending...</button> 
                : <h2 className="text-green-500 font-bold">DELIVERED</h2>
            }
            </td>
        </tr >
    );
};

export default ManageOrderRow;