import React, { useEffect, useState } from 'react';
import ManageProductsRow from './ManageProductsRow';

const ManageProducts = () => {
    const [manageProduct, setManageProduct] = useState([]);

    useEffect(() => {
        const getProducts = () => {
            const url = "http://localhost:5000/products";
            fetch(url, {
                method: "GET",
                "content-type": "application/json",
                headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            })
                .then(res => res.json())
                .then(data => setManageProduct(data))
        }
        getProducts();
    }, [manageProduct])
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tool</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageProduct.map((product, index) =>
                                <ManageProductsRow product={product} key={product._id} 
                                index={index}></ManageProductsRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;