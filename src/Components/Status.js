import React, {useContext, useState, useEffect} from 'react'
import { AccountContext } from './AccountState'

const Status = () => { 
    const [status, setStatus] = useState(false);

    const { getSession, logOut } = useContext(AccountContext);
    useEffect(() => {
        getSession()
            .then(session => {
                console.log('Session: ', session);
                setStatus(true);
            }) .catch((err) => {
                setStatus(false);
            });
    }, []);

    const handleLogOut = () => {
        logOut();
        window.location.reload();
    }

    return (
        <div>
            {status ? (<button onClick = {handleLogOut}>Log Out</button>) : 'Please log in'};
        </div>
    )
};
export default Status;