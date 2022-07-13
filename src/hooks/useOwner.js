import { useEffect, useState } from "react"

const useOwner = user => {
    const [owner, setOwner] = useState(false);
    const [ownerLoading, setOwnerLoading] = useState(true);
    useEffect( () =>{
        const email = user?.email;
        if(email){
            fetch(`https://mighty-cliffs-51736.herokuapp.com/owner/${email}`, {
                method:'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                setOwner(data.owner);
                setOwnerLoading(false);
            })
        }
    }, [user])

    return [owner, ownerLoading]
}

export default useOwner;