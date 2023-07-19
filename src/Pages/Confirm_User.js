import React, { useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js'
import UserPool from '../server-AWS/UserPool'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userPool = UserPool;

  //obtains username that is in the URL
  const { username } = useParams();

  const userData = {
	Username: username, //URL username is put in as user data, and therefore can now dynamically verify addresses
	Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData)
  let navigate = useNavigate();
  const handleConfirmation = async(event) => {
    event.preventDefault();


   cognitoUser.confirmRegistration(confirmationCode, true, function(err, res) {
      if(err) {
        console.error('Error confirming email:', err);
        setErrorMessage('Error confirming email. Please check the confirmation code and try again.');
        setSuccessMessage('');
      } else {
        console.log('SUCCESS', res);
        setSuccessMessage('Email confirmed successfully.');
        setErrorMessage('');
        navigate('/Home')
      }
    });
  }

  const handleReConfirmation = () => {
    cognitoUser.resendConfirmationCode(function(err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      } else {
        setSuccessMessage('New Verification Code was Sent to your inbox');
      }
      console.log('call result: ' + result);
      
    });
  }

  return (
    <div>
        <h2>Email Confirmation</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit = { handleConfirmation }>
        <label htmlFor="confirmationCode">Confirmation Code</label>
        <input
            id="confirmationCode"
            placeholder="Enter the confirmation code received via email"
            value={confirmationCode}
            onChange={(event) => setConfirmationCode(event.target.value)}
        />
        <button type="submit">Confirm Email</button>
        </form>
        <button type="submit" onClick = { handleReConfirmation }>Resend Verification Code</button>
    </div>
  )
}

export default Confirmation
