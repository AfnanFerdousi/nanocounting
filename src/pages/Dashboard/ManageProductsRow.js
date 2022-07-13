import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ManageProductsRow = ({ product, index }) => {
    const [deleteOrder, setDeleteOrder] = useState(null);

    const handleDeleteOrder = _id => {
        fetch(`https://mighty-cliffs-51736.herokuapp.com//products/${_id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => res.json())
            .then(data => toast.success("Successfully Deleted"))
    }
    return (
            <tr>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>{product._id}</td>
                <td><button onClick={() => handleDeleteOrder(product._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr >
    );
};

export default ManageProductsRow;