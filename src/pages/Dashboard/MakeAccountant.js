import React, { useEffect, useState } from 'react';
import Loading from '../shared/Loading';
import MakeAccountantRow from './MakeAccountantRow';

const MakeAccountant = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(); 

    useEffect(() => {
        const makeAccountant = () => {  
            fetch('https://mighty-cliffs-51736.herokuapp.com/user', {
                method: "GET",
                "content-type": "application/json",
                headers: { authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            })
                .then(res => res.json())
                .then(data => setUsers(data))
        }
        makeAccountant();
    }, [users])

    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl pl-5">All Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <MakeAccountantRow
                                key={user._id}
                                user={user}
                                index={index}
                            ></MakeAccountantRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAccountant;