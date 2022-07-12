import React from 'react';

const Banner = () => {
    return (
        <div className='z-[-2] relative'>
            <div className="flex justify-around items-center h-[80vh]">

                <div className="ml-[30px]">
                    <p className='font-medium text-[20px] text-[#848484]'
                        style={{ fontFamily: "Poppins" }}
                        data-aos="fade-right"
                        data-aos-duration='800'
                    >WE WIL PROVODE YOU WITH</p>
                    <h2
                        data-aos="fade-right"
                        data-aos-duration='800'
                        className="font-medium text-[#E12B78] text-[60px]"
                    >Bookkeeping For Businesses</h2>
                    <p className='font-medium text-[20px] text-[#848484]'
                        style={{ fontFamily: "Poppins" }}
                        data-aos="fade-right"
                        data-aos-duration='800'
                    >WANT TO BUY STUFF? <span className="text-[#642ED8]">WE GOT YOU</span></p>
                    <h2
                        data-aos="fade-left"
                        data-aos-duration='900' className='font-medium text-[#0FB09D] text-[60px]'>Buy Goceries From Us</h2>
                </div>
                <div className='w-[50%]' data-aos="fade-left"
                    data-aos-duration='800'>
                    <img src="https://i.ibb.co/18nrwZr/banner.png" alt="banner" />
                </div>
            </div>
        </div>
    );
};

export default Banner;