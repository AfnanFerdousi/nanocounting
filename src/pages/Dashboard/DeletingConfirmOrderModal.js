import React from 'react';
import { toast } from 'react-toastify';

const DeletingConfirmOrderModal = ({ deleteOrder }) => {
    const { _id, productName } = deleteOrder
    const handleDeleteOrder = _id => {
        fetch(`http://localhost:5000/purchase/${_id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => toast.success("Successfully Deleted"))
    }
    return (
        <div>
            <input type="checkbox" id="deleting-confirm-2" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete {productName}</h3>
                    <p className="py-4" > You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action" >
                        <label htmlFor="deleting-confirm-2" onClick={() => handleDeleteOrder(_id)} className="btn modal-button">Delete</label>
                        <label htmlFor="deleting-confirm-2" className="btn">Cancel</label>
                    </div >
                </div >
            </div >
        </div >
    );
};

export default DeletingConfirmOrderModal;