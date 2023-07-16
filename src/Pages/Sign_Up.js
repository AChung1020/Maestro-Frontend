import React, {useState } from 'react'
import UserPool from '../server-AWS/UserPool'
import { useNavigate } from "react-router-dom";

const Sign_Up = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();

        UserPool.signUp(username, password, [], null, (err,data) => {
            if(err) {
                console.error(err);
            } 
            console.log(data);      
        });
    };

    let navigate = useNavigate();
    const routeChange= () => {
        let path = `/login`;
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
                <button type='submit'>Sign Up</button>
            </form>
            <button className="link-button" onClick={routeChange}>Already have an account? Login here.</button>
        </div>

    );
};

export default Sign_Up;
