import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reciept = () => {
    const { id } = useParams()
    const [item, setItem] = useState();

    const tax = item?.price * 0.05

    useEffect(() => {
        const url = `https://mighty-cliffs-51736.herokuapp.com/reciept/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setItem(data)
            });

    }, []);
    console.log(item)
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div class="card w-[600px] bg-base-100 shadow-xl border-[1px] border-slate-400">
                <div class="card-body items-center text-center">
                    <h2 className="text-3xl hover:cursor-pointer text-[#E12B78]"><span className='text-[35px] text-[#642ED8] font-light'>NANO</span>counting</h2>
                    <div className='flex gap-[100px] my-[30px]'>
                        <div>
                            <h2><span className='font-bold'>Cashier:</span> Thomas Bottoman</h2>
                        </div>
                        <div>
                            <h2><span className='font-bold'>Date:</span> 12/07/2022</h2>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{item?.productName}</td>
                                    <td>{item?.orderAmount}</td>
                                    <td>${item?.price}</td>
                                </tr>                                
                                <tr className='border-t-[1.5px] border-[#333] pt-[10px]'>
                                    <th>Subtotal</th>
                                    <td></td>
                                    <td>${item?.price}</td>
                                </tr>
                                <tr>
                                    <th>tax</th>
                                    <td></td>
                                    <td>${tax}</td>
                                </tr>

                                <tr className='border-t-[1.5px] border-[#333] pt-[30px]'>
                                    <th>Total</th>
                                    <td></td>
                                    <td>${item?.price + tax}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Download</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reciept;