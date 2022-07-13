import React from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyProfileModal = ({ updateProfile, setUpdateProfile }) => {
    const [user] = useAuthState(auth)
    const { email } = updateProfile;
    const { register, formState: { errors }, handleSubmit } = useForm();
    // console.log(updateProfile)

    const handleUpdateProfile = data => {
        console.log(data)
        const changes = {
            education: data.education,
            linkedin: data.linkedin,
            location: data.location,
            phone: data.phone,
            image: data.image
        }
        fetch(`https://mighty-cliffs-51736.herokuapp.com/myProfile/${user.email}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(changes)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 1 || data.modifiedCount === 1) {
                    toast.success("Successfully Edited My Profile")
                    setUpdateProfile(null);
                }
                else {
                    toast.error('unseccessful')
                    setUpdateProfile(null);
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="update-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box"
                >
                    <label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(handleUpdateProfile)}>
                        {/* Education */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Education"
                                className="input input-bordered w-full max-w-md"
                                {...register("education", {
                                    required: {
                                        value: true,
                                        message: 'Education is required'
                                    }
                                })} />
                            <label className="label">
                                {errors.education?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.education.message}</span>}
                            </label>
                        </div>

                        {/* Location */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Location"
                                className="input input-bordered w-full max-w-md"
                                {...register("location", {
                                    required: {
                                        value: true,
                                        message: 'Location is required'
                                    }
                                })} />
                            <label className="label">
                                {errors.location?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.location.message}</span>}
                            </label>
                        </div>

                        {/* Phone */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Your Phone Number"
                                className="input input-bordered w-full max-w-md"
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: 'Phone is required'
                                    }
                                })} />
                            <label className="label">
                                {errors.phone?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                            </label>
                        </div>

                        {/* Linkedin */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">LinkedIn Profile</span>
                            </label>
                            <input
                                type="url"
                                placeholder="Your LinkedIn Profile"
                                className="input input-bordered w-full max-w-md"
                                {...register("linkedin", {
                                    required: {
                                        value: true,
                                        message: 'LinkedIn Profile is required'
                                    }
                                })} />
                            <label className="label">
                                {errors.linkedin?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.linkedin.message}</span>}
                            </label>
                        </div>
                        {/* Image */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Your Image</span>
                            </label>
                            <input
                                type="url"
                                placeholder="Your Image"
                                className="input input-bordered w-full max-w-md"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Image is required'
                                    }
                                })} />
                            <label className="label">
                                {errors.image?.type === 'required'
                                    &&
                                    <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                            </label>
                        </div>
                        <button className="btn modal-button mr-2" type="submit">Save</button>
                        <label htmlFor="update-modal" className="btn">Close</label>
                    </form>

                </div >
            </div >
        </div >
    );
};

export default MyProfileModal;