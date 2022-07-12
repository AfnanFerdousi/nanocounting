import React from 'react';
import {useNavigate} from 'react-router-dom';

const ProductsCard = ({item}) => {
    const navigate = useNavigate();

    const navigateToItemDetails = id => {
        navigate(`/purchase/${id}`, { state: { id } })
    }
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl ">
            <figure><img src={item?.img} alt="Shoes" /></figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{item?.name}</h2>
                <h2 className='text-xl'>Price: {item?.buyerPrice}</h2>
                <h2>Minimum Order: {item?.minOrder}</h2>
                <h2>Available: {item?.available}</h2>
                <p>{item?.desc}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => navigateToItemDetails(item?._id)} className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;