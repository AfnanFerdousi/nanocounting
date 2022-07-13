import React from 'react';
import { toast } from 'react-toastify';

const MakeAdminRow = ({ user, index }) => {
    // console.log(user)
    const { email, role } = user;
    const makeAdmin = () => {
        fetch(`https://mighty-cliffs-51736.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Successfully made an admin`);
                }

            })
    }

    return (
        <tr>
            <th>{index+1}</th>
            <td>{email}</td>
            <td>{role == 'owner'
            ? 
            <h2>Owner</h2>            
            :
            role !== 'admin' && 
            <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>
        }            
            </td>
        </tr>
    );
};

export default MakeAdminRow;