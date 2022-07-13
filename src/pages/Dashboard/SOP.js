import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import SOPCard from './SOPCard';
// 
const SOP = () => {
    const { id } = useParams()
    const [item, setItem] = useState([]);

    const tax = item?.price * 0.05
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

    const grossProfit = price2 - sellerPrice2;

    const expenses = 0;
    
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
                                    <th className='text-[15px]'>Revenue</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-[12px] font-light'>
                                    <th>Total Revenue</th>
                                    <td></td>
                                    <td>{price2}</td>
                                </tr>
                                <tr className='text-[12px] font-light'>
                                    <th>Cost of sales</th>
                                    <td></td>
                                    <td>{sellerPrice2}</td>
                                </tr>
                                <tr className='border-b-[2px] border-[#333]'>
                                    <td></td>
                                </tr>
                                <tr className='text-[15px]'>
                                    <th>Gross Profit</th>
                                    <td></td>
                                    <td>{grossProfit}</td>
                                </tr>

                                <tr>
                                    <th className='text-[15px] mt-[8px]'>Operating Expenses</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr className='text-[12px] font-light'>
                                    <th>Expenses</th>
                                    <td></td>
                                    <td>{expenses}</td>
                                </tr>

                                <tr className='border-b-[2px] border-[#333]'>
                                    <td></td>
                                </tr>
                                <tr className='text-[15px]'>
                                    <th>Net Profit</th>
                                    <td></td>
                                    <td>{netProfit}</td>
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

export default SOP;