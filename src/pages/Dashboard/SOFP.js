import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import SOPCard from './SOPCard';

const SOFP = () => {
    const { id } = useParams()
    const [item, setItem] = useState([]);
    // 
    useEffect(() => {
        const url = `https://mighty-cliffs-51736.herokuapp.com/sop`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setItem(data)
            });

    }, [item]);


    // console.log("item", item)

    // total revenue
    let price = 0;
    let price2 = 0;
    item.map(i => {
        price = i.price + price2
        price2 = price;
    });

    // cost of sale
    let sellerPrice = 0;
    let sellerPrice2 = 0;
    item.map(i => {
        sellerPrice = i.sellerPrice + sellerPrice2
        sellerPrice2 = sellerPrice;
    });
    const expenses = 0;
    const liability = 0;
    const equity = 0;
    const grossProfit = price2 - sellerPrice2;        
    const netProfit = grossProfit - expenses;    
    console.log(sellerPrice2)


    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div class="card w-[600px] bg-base-100 shadow-xl border-[1px] border-slate-400">
                <div class="card-body items-center text-center">
                    <h2 className="text-3xl hover:cursor-pointer text-[#E12B78]">Statement of profit and loss</h2>

                    <div className="overflow-x-auto">
                        <table className="table w-[350px]">
                            <thead>
                                <tr>
                                    <th className='text-[15px]'>Assets</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-[12px] font-light'>
                                    <th>Cash</th>
                                    <td></td>
                                    <td>{netProfit}</td>
                                </tr>
                                <tr className='border-b-[2px] border-[#333]'>
                                    <td></td>
                                </tr>
                                <tr className='text-[15px]'>
                                    <th>Total Assets</th>
                                    <td></td>
                                    <td>{netProfit}</td>
                                </tr>

                                <tr>
                                    <th className='text-[15px] mt-[8px]'>Liability</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr className='text-[12px] font-light'>
                                    <th>Liability</th>
                                    <td></td>
                                    <td>{liability}</td>
                                </tr>

                                <tr>
                                    <th className='text-[15px] mt-[8px]'>Equity</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr className='text-[12px] font-light'>
                                    <th>Net Profit</th>
                                    <td></td>
                                    <td>{netProfit}</td>
                                </tr>

                                <tr className='border-b-[2px] border-[#333]'>
                                    <td></td>
                                </tr>
                                <tr className='text-[15px]'>
                                    <th>Total Liability and Equity</th>
                                    <td></td>
                                    <td>{liability + equity}</td>
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

export default SOFP;