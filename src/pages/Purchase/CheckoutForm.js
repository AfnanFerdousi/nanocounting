/* import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ product }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    const { price, buyer, buyerEmail, _id } = product;

    useEffect(() => {
        fetch("https://mighty-cliffs-51736.herokuapp.com/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setCardError(error?.message || '');
        setSuccess('');
        setProcessing(true);

        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyer,
                        email: buyerEmail,
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setSuccess('Congrats! Your payment is completed');

            // store payment in database
            const payment = {
                product: _id,
                transactionId: paymentIntent.id
            }
            fetch(`https://mighty-cliffs-51736.herokuapp.com/payment/${_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    console.log(data);
                })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm mt-6' type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-500 font-bold'>{cardError}</p>
            }
            {
                success && <div>
                    <p className='text-green-500 font-bold'>{success}</p>
                    <p className='font-bold'>Your Transaction Id: <span className='text-orange-700 font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm; */

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { success } from 'daisyui/src/colors';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../shared/Loading';

const CheckoutForm = ({ product }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const [cardSuccess, setSuccess] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [loading, setLoading] = useState(false)
    const { productPrice, buyer, buyerEmail, _id } = product;
    const navigate = useNavigate()
    useEffect(() => {
        setLoading(true)
        fetch("https://mighty-cliffs-51736.herokuapp.com/create-payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ productPrice })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                    setLoading(false)
                    
                }
            })
    }, [productPrice])

    if (loading) {
      return <Loading></Loading>
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });



        setCardError(error?.message || '')
        setSuccess('');
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyer,
                        email: buyerEmail
                    },
                },
            },
        );

        if (intentError) {
            setLoading(false)
            setCardError(intentError?.message)
        } else {
            setLoading(true)
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setSuccess('Congrats! Your payment is completed.')
            navigate('/dashboard/orders')

            //store payment on database
            const payment = {
                product: _id,
                transactionId: paymentIntent.id
            }
            fetch(`https://mighty-cliffs-51736.herokuapp.com/payment/${_id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setLoading(false)
                })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p className="text-red-500 text-1xl">{cardError}</p>
            {
                success && <div>
                    <p className="text-green-500 text-1xl">{cardSuccess}</p>

                </div>
            }
            {
                transactionId && <p className="text-green-500 text-1xl">Your Transition Id: <span className="text-orange-500 font-bold">{transactionId}</span></p>
            }
            <button className="btn my-5 btn-block" type="submit" disabled={!stripe || !clientSecret} >
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;