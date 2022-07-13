import { useEffect, useState } from "react"

const useAccountant = user => {
    const [accountant, setAccountant] = useState(false);
    const [accountantLoading, setAccountantLoading] = useState(true);
    useEffect( () =>{
        const email = user?.email;
        if(email){
            fetch(`https://mighty-cliffs-51736.herokuapp.com/accountant/${email}`, {
                method:'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                setAccountant(data.accountant);
                setAccountantLoading(false);
            })
        }
    }, [user])

    return [accountant, accountantLoading]
}

export default useAccountant;