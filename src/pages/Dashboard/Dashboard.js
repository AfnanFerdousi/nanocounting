import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAdmin from '../../hooks/useAdmin';
import auth from '../../firebase.init';
import useOwner from '../../hooks/useOwner';
import useAccountant from '../../hooks/useAccountant';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [owner] = useOwner(user);
    const [accountant] = useAccountant(user);
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <h2 className='text-2xl font-bold text-purple-400 p-5'>Welcome To Your Dashboard</h2>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-64 bg-base-200 gap-y-2 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to="/dashboard">My Profile</Link></li>
                    {
                        !admin
                            ?
                            <>
                                <li><Link to="/dashboard/orders">My Orders</Link></li>
                            </>
                            :
                            <>
                                <li><Link to="/dashboard/manageOrder">Manage All Orders</Link></li>
                                <li><Link to="/dashboard/addProduct">Add a Product</Link></li>
                                <li><Link to="/dashboard/manageProducts">Manage Products</Link></li>
                            </>
                    }
                    {
                        !owner
                            ?
                            <></>
                            :
                            <>
                                <li><Link to="/dashboard/statements">Statements</Link></li>
                                <li><Link to="/dashboard/makeAccountant">Make Accountant</Link></li>
                                <li><Link to="/dashboard/makeAdmin">Make Admin</Link></li>
                            </>
                    }
                    {
                        !accountant
                            ?
                            <></>
                            :
                            <>
                                <li><Link to="/dashboard/sop">SOP</Link></li>
                                <li><Link to="/dashboard/sofp">SOFP</Link></li>
                            </>
                    }

{/* {
                        accountant || admin
                            ?
                            <><li><Link to="/dashboard/manageOrder">Manage All Orders</Link></li>
                            <li><Link to="/dashboard/addProduct">Add a Product</Link></li>
                            <li><Link to="/dashboard/manageProducts">Manage Products</Link></li>
                            <li><Link to="/dashboard/sop">Statement of Profit and Loss</Link></li>
                            <li><Link to="/dashboard/sofp">Statement of Financial Position</Link></li></>
                            :
                            <>                            
                            </>
                    } */}

                </ul>
            </div>
        </div>
    );
};

export default Dashboard;