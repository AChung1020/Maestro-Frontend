import React, {useState } from 'react'
import UserPool from '../server-AWS/UserPool'

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

                <button type='submit'>Sign Up</button>
            </form>
        </div>

    );
};

export default Sign_Up;
