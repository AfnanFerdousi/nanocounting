import React, { useEffect, useState } from 'react';
import DeletingConfirmOrderModal from './DeletingConfirmOrderModal';
import ManageOrderRow from './ManageOrderRow';

const ManageOrder = () => {
    const [orders, setManageOrder] = useState([]);  
    const [order, setOrder] = useState([])
    const [deleteOrder, setDeleteOrder] = useState(null)  

    useEffect(() => {
        const getAllOrders = () => {
            const url = "http://localhost:5000/purchase";
            fetch(url, {
                method: "GET",
                "content-type": "application/json",
                headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            })
                .then(res => res.json())
                .then(data => setManageOrder(data))
        }
        getAllOrders();
    }, [orders])
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tool</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((allOrder, index, order) =>
                                <ManageOrderRow setDeleteOrder={setDeleteOrder} order={order} allOrder={allOrder} key={allOrder._id} index={index}></ManageOrderRow>)
                        }

                    </tbody>
                </table>
            </div>
            {deleteOrder && <DeletingConfirmOrderModal deleteOrder={deleteOrder}></DeletingConfirmOrderModal>}
        </div>
    );
};

export default ManageOrder;