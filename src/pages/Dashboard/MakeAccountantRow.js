import React from 'react';
import { toast } from 'react-toastify';

const MakeAccountantRow = ({ user, index }) => {
    // console.log(user)
    const { email, role } = user;
    const makeAccountant = () => {
        fetch(`https://mighty-cliffs-51736.herokuapp.com/user/accountant/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make an accoutant');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Successfully made an accountant`);
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
            role !== 'accountant' && 
            <button onClick={makeAccountant} className="btn btn-xs">Make Accountant</button>
        }            
            </td>
        </tr>
    );
};

export default MakeAccountantRow;