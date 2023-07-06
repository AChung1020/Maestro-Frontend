import React, {useState, useContext } from 'react'
import { AccountContext } from '../Components/AccountState';
import Status from '../Components/Status'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        authenticate(username, password)
        .then((data) => {
            console.log("Success!!!", data);
        })
        .catch((err) => {
            console.error("Failed!!!", err);
        })
    };
    return(
        <div>
            <form onSubmit = {onSubmit}>

                <label htmlFor = "Username">Username</label>
                <input 
                id = 'Username'
                value = {username}
                onChange = {(event) => setUsername(event.target.value)}
                ></input>

                <label htmlFor = "password">Password</label>
                <input 
                id = 'password'
                value = {password}
                onChange = {(event) => setPassword(event.target.value)}
                ></input>

                <button type='submit'>Login</button>
            </form>

            <Status />

        </div>

    );
};

export default Login;
