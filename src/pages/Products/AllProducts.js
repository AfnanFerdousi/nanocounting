import React, { useEffect, useState } from 'react';
import ProductsCard from '../Home/ProductsCard';

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        fetch('https://mighty-cliffs-51736.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setAllProducts(data))
    },[]) 
    return (
        <div className="my-[100px]">
            <h2 className='mb-[20px] text-[#0FB09D] text-[50px] text-center'>Our Products</h2>

            <div className='container-fluid flex justify-center'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-2'>
                    {
                        allProducts.map(productItem => <ProductsCard key={productItem._id} item={productItem}></ProductsCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProducts;