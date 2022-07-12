import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products/home')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]) 
    return (
        <div className="my-[100px]">
            <h2 className='mb-[20px] text-[#0FB09D] text-[50px] text-center'>Our Products</h2>

            <div className='container-fluid flex justify-center'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-2'>
                    {
                        products.map(productItem => <ProductsCard key={productItem._id} item={productItem}></ProductsCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;