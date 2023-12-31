import React, {useState, useEffect } from 'react'
import UserPool from '../server-AWS/UserPool'
import { useNavigate } from "react-router-dom";


const Sign_Up = () => {

    //user and pass
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [data, setData] = useState("");
    
    let navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();


        //commented out the fetch to test custom:UUID NOTE: we cannot have this function within an event handler like onSubmit, 
        //we need to move it outside the event handle onsubmit. test what happens when we do.

      
      //   const fetchInfo = () => {
      //     return fetch("http:localhost8080/api/v1/artist/artist/registerArtist")
      //         .then((response) => response.text())
      //         .then((data) => setData(data))
      //         .catch((error) => console.error('Error getting data:', error));
      // };
  
      // useEffect(() => {
      // //     fetchInfo()
      // //         .then(() => {
      // //             // Handle successful fetch if needed (optional)
      // //         })
      // //         .catch((error) => {
      // //             // Handle error if needed (optional)
      // //         });
      // // }, []);

        const userAttributes = [
            {
              Name: "email",
              Value: email,
            },
            {
              Name: "phone_number",
              Value: phoneNumber,
            },
            {
              Name: "birthdate",
              Value: birthdate,
            },
            {
              Name: "address",
              Value: address,
            },
            {
              Name: "name",
              Value: name,
            },
            {
              Name: "custom:UUID", //changed to custom:UUID so communication does not fail
              Value: "ReplaceMeLaterWith Data variable please",
            }
            // Add other custom attributes as needed
          ];

        UserPool.signUp(username, password, userAttributes, null, (err,data) => {
            if(err) {
                console.error(err);
            } else {
                console.log(data);
                //username shows up in the address bar
                navigate(`/Confirm_User/${username}`)
            }
        });
    };


    // for the already signed up button
    const routeChangeLogin = () => {
        let path = `/login`;
        navigate(path);
      };

    return(

        <div class = "form-container">
            <h1 class = "header" >Create an Account:</h1>
            <form class = "sign-up-form" onSubmit = {onSubmit}>
                <label htmlFor = "Username">Username</label>
                <input 
                id = 'Username'
                placeholder="ex: example123"
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

                <label htmlFor="email">Email</label>
                <input
                id="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                id="phoneNumber"
                placeholder="e.g., +1234567890"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                />

                <label htmlFor="birthdate">Birth Date</label>
                <input
                id="birthdate"
                type="date"
                value={birthdate}
                onChange={(event) => setBirthDate(event.target.value)}
                />

                <label htmlFor="address">Address</label>
                <textarea
                id="address"
                placeholder="Enter your address here"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                ></textarea>

                <label htmlFor="name">Full Name</label>
                <input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
                
                <button type='submit'>Sign Up</button>
            </form>
            <button className="link-button" onClick={ routeChangeLogin }>Already have an account? Login here.</button>
        </div>

    );
};

export default Sign_Up;
