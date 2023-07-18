import React, { useState } from 'react'
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import UserPool from '../server-AWS/UserPool'

const Confirmation = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userPool = UserPool;
  //TODO: figure out a way to push the username from the sign up page into the confirm user page
  const username = 'andrewchung1212'

  const userData = {
	Username: username,
	Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData)

  const handleConfirmation = async(event) => {
    event.preventDefault();


    const confirmResponse = await cognitoUser.confirmRegistration(confirmationCode, true, function(err, res) {
      if(err) {
        console.error('Error confirming email:', err);
        setErrorMessage('Error confirming email. Please check the confirmation code and try again.');
        setSuccessMessage('');
      } else {
        setSuccessMessage('Email confirmed successfully.');
        setErrorMessage('');
      }
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
    </div>
  )
}

export default Confirmation
