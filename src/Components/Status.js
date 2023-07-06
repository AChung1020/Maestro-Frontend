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
                console.error("Not Logged In!!!", err);
                setStatus(false);
            });
    }, []);

    return (
        <div>
            {status ? (<button onClick = {logOut}>Log Out</button>) : 'Please log in'};
        </div>
    )
};
export default Status;