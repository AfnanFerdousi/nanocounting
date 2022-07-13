import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { register,reset, formState: { errors }, handleSubmit } = useForm();

    const addProduct = (data) => {
        fetch("https://mighty-cliffs-51736.herokuapp.com/products", {
            method: 'POST',
            headers: {
                "content-type":"application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    toast(`Product added`);
                    reset();
                }
                else {
                    toast.error(`Could Not add product`)
                }

            })
    };

    return (
        <div className="h-screen bg-purple-100 mt-4 flex justify-center items-center">
            <div className="card flex-shrink-0 w-full max-w-md  shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Add a Product</h2>
                    <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit(addProduct)}>
                        {/* tool Name */}

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Tool Name</span>
                            </label>
                            <input type="text" placeholder="Product Name" className="input input-bordered w-full max-w-xs" {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Product Name is required'
                                }
                            })} />
                            <label className="label">
                                {errors.toolName?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.toolName.message}</span>}
                            </label>
                        </div>

                        {/* price */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Tool Price</span>
                            </label>
                            <input type="number" placeholder="$Tool Price" className="input input-bordered w-full max-w-xs"
                                {...register("price",
                                    { required: true, min: 20 })}
                            />
                            <span className='label-text-alt text-red-500'>
                                {errors.price?.type === 'required' && "Price is required"}
                            </span>
                            <span className='label-text-alt text-red-500'>
                                {errors.price?.type === 'min' && "Price can not be less than 20"}
                            </span>
                        </div>

                        {/* Minimum Order */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Minimum Order</span>
                            </label>
                            <input type="number" placeholder="Minimum Order" className="input input-bordered w-full max-w-xs" 
                            {...register("minOrder",
                            { required: true, min: 5, max:100 
                            })} />
                            <span className='label-text-alt text-red-500'>
                                {errors.minOrder?.type === 'required' && "Minimum is required"}
                            </span>
                            <span className='label-text-alt text-red-500'>
                                {errors.minOrder?.type === 'min' && "Minimum order can not be less than 5"}
                            </span>
                            <span className='label-text-alt text-red-500'>
                                {errors.minOrder?.type === 'max' && "Minimum order can not be more than 100"}
                            </span>
                        </div>

                        {/* Available */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Available</span>
                            </label>
                            <input type="number" placeholder="Available" className="input input-bordered w-full max-w-xs" 
                            {...register("available",
                            { required: true, min: 100 })} />
                            <span className='label-text-alt text-red-500'>
                                {errors.available?.type === 'required' && "Available is Required"}
                            </span>
                            <span className='label-text-alt text-red-500'>
                                {errors.available?.type === 'min' && "Available quantity can not be less than 100"}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input type="text" placeholder="Description" className="input input-bordered w-full max-w-xs" 
                            {...register("desc",
                            { required: true })} />
                            <span className='label-text-alt text-red-500'>
                                {errors.desc?.type === 'required' && "Description is Required"}
                            </span>
                        </div>

                        {/* Image */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>
                            <input type="url" placeholder="Image" className="input input-bordered w-full max-w-xs" 
                            {...register("img",
                            { required: true })} />
                            <span className='label-text-alt text-red-500'>
                                {errors.img?.type === 'required' && "Image is Required"}
                            </span>
                        </div>
                        <input className='btn w-full mt-4 max-w-xs' value="Add Tool" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;