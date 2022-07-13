import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51LHswIIH6MxdVQFcCo6bDvfwV7i2rzgIXaXzi6LjOLtFIrQMovmmTTAOsHziNIikIQAz8IP69AsbtD8C1lHMdYdt00vj7YJBXC');

const Payment = () => {
    const { id } = useParams();
    const url = `https://mighty-cliffs-51736.herokuapp.com/payment/${id}`;
    const { data: product, isLoading } = useQuery(['payment', id], () => fetch(url, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(product);
    return (
        <div>
            <div className="card w-50 max-w-md bg-base-500 bg-base-300 my-12">
                <div className="card-body">
                    <p className="text-success font-bold">Hello, {product?.buyer}</p>
                    <h2 className="card-title">Pay for <span className="text-red-500">{product?.productName}</span></h2>
                    <p>Please Pay: ${product?.price} </p>

                </div>
            </div>
            <div className="card flex-shrink-0 max-w-md  shadow-2xl bg-base-300">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm product={product} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;