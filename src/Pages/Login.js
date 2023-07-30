import React, {useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
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
            window.location.reload(); //may need to change later to redirect to home page after login
        })
        .catch((err) => {
            console.error("Failed!!!", err);
        })
    };

    let navigate = useNavigate();
    const routeChange= () => {
        let path = `/Intermediate_Sign_Up_Page`;
        navigate(path);
    };

    return(
        <div>
            <form onSubmit = {onSubmit}>

                <label htmlFor = "Username">Username</label>
                <input 
                id = 'Username'
                placeholder="ex: example@gmail.com"
                value = {username}
                onChange = {(event) => setUsername(event.target.value)}
                ></input>

                <label htmlFor = "password">Password</label>
                <input 
                id = 'password'
                placeholder = "*********" 
                value = {password}
                onChange = {(event) => setPassword(event.target.value)}
                ></input>

                <button type='submit'>Login</button>
            </form>

            <Status />

            <button className="link-button" onClick={routeChange}>Don't have an account? Register here.</button>

        </div>

    );
};

export default Login;
