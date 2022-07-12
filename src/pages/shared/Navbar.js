import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth'
const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    };
    return (
        <div className="navbar bg-[#ede1e1] lg:md:px-[130px] px-[20px] shadow-xl 
        border-b-[1px] border-b-[#ddd]">
            <div class="navbar-start">
                <Link to="/" className="text-3xl hover:cursor-pointer text-[#E12B78]"><span className='text-[35px] text-[#642ED8] font-light'>NANO</span>counting</Link>
            </div>
            <div class="navbar-end ">
                <div className="lg:hidden block">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 shadow-md bg-base-200 rounded-md w-52 lg:md:ml-0 
                    ml-[-150px]">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products" className="mt-3">Products</Link></li>
                            <li><Link to="/contact" className="mt-3">Contact</Link></li>
                            <li>
                            {
                                user
                                    ?
                                    <Link to='/dashboard' className='mt-3'>Dashboard</Link>
                                    :
                                    <Link to='/dashboard' className='mt-3 hidden'>Dashboard</Link>
                            }
                        </li>
                            <div className="mt-[20px]">
                            <li>
                                {
                                    user
                                        ?
                                        <button className='btn btn-ghost rounded-lg' onClick={logout}>SIGN OUT</button>
                                        :
                                        <Link to='/login' className='btn btn-ghost rounded-lg'>LOGIN</Link>
                                }
                            </li>
                            <li>
                            {
                                user ?
                                    <div className="btn lg:md:mt-0 mt-3 text-white rounded-full" >
                                        <h2>{user.displayName}</h2>
                                    </div>
                                    :
                                    <></>
                            }
                            </li>
                            </div>
                        </ul>
                    </div>
                </div>

                <div className='hidden lg:flex'>
                    <ul class="menu menu-horizontal p-0">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products" >Products</Link></li>
                        <li><Link to="/contact" >Contact</Link></li>
                        <li>
                            {
                                user
                                    ?
                                    <Link to='/dashboard' className='rounded-lg'>Dashboard</Link>
                                    :
                                    <Link to='/dashboard' className='rounded-full hidden'>Dashboard</Link>
                            }
                        </li>
                        <div className="mr-[-40px] flex items-center">
                            <li>
                                {
                                    user
                                        ?
                                        <button className='btn btn-ghost rounded-full' 
                                        
                                        onClick={logout}>SIGN OUT</button>
                                        :
                                        <Link to='/login' className='btn btn-ghost rounded-lg'>LOGIN</Link>
                                }
                            </li>
                            <li>
                            {
                                user ?
                                    <div className="btn lg:md:mt-0 mt-3 text-white rounded-full" style={{borderRadius: '50px'}}>
                                        <h2>{user.displayName}</h2>
                                    </div>
                                    :
                                    <></>
                            }
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;