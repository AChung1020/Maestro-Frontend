import React, {useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import { AccountContext } from '../Components/AccountState';
import Status from '../Utilities/Status'
import { toIntermediateSignUpPage } from '../Utilities/Page_Redirect_Utils'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AccountContext);
    const cookies = new Cookies();

    const onSubmit = (event) => {
        event.preventDefault();
        
        authenticate(username, password)
        .then((data) => {
            console.log("Success!!!", data);
            cookies.set("access_token", data.accessToken, { secure: true, sameSite: 'strict' });
            cookies.set('id_token', data.idToken, { secure: true, sameSite: 'strict' });
            
            window.location.reload(); //may need to change later to redirect to home page after login
        })
        .catch((err) => {
            console.error("Failed!!!", err);
        })
    };

    const navigate = useNavigate();


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

            <button className="link-button" onClick={() => toIntermediateSignUpPage(navigate)}>Don't have an account? Register here.</button>

        </div>

    );
};

export default Login;
