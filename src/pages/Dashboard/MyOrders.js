import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import OrderRow from './OrderRow';
import DeletingConfirmOrderModal from './DeletingConfirmOrderModal';

const MyOrders = () => {
    const [user] = useAuthState(auth)
    const [orders, setOrders] = useState([])
    const [deleteOrder, setDeleteOrder] = useState(null)
    useEffect(() => {
        const getOrders = () => {
            const email = user.email;
            const url = `http://localhost:5000/myOrder?email=${email}`
            fetch(url, {
                method: "GET",
                "content-type": "application/json",
                headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            })
                .then(res => res.json())
                .then(data => setOrders(data))
        }
        getOrders();
    }, [orders])
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Amount Bought</th>
                            <th>Address</th>
                            <th>Product</th>
                            <th>Action</th>
                            <th>Status</th>
                            <th>Reciept</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) =>
                                <OrderRow order={order} key={order._id} setDeleteOrder={setDeleteOrder} index={index}></OrderRow>)
                        }

                    </tbody>
                </table>
            </div>
            {deleteOrder && <DeletingConfirmOrderModal deleteOrder={deleteOrder}></DeletingConfirmOrderModal>}
        </div>
    );
};

export default MyOrders;