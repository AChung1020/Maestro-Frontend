import React, { useState, useEffect } from "react";
import Pool from '../server-AWS/UserPool';

function Create_Group() {
    const [newMember, setNewMember] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [formData, setFormData] = useState({
        group_type: '',
        group_name: '',
        owner: '', // Change to string, not array
        members: [],
        instruments: [],
    });

  const cognitoUser = Pool.getCurrentUser();

  //renders onto the page before the page loads, so we only do this once
  useEffect(() => {
    // When ownerEmail changes, update the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      owner: ownerEmail,
    }));
    if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            console.error('Error getting user session:', err);
          } else {
            console.log('success!!!', session);
          }
    
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.error('Error fetching user attributes:', err);
            } else {
              // Find the 'email' attribute and get its value
              const emailAttribute = attributes.find(attr => attr.getName() === 'email');
              const email = emailAttribute ? emailAttribute.getValue() : null;
              setOwnerEmail(email);
              console.log('User email:', email);
            }
          });
        });
      }
  }, [ownerEmail]);

  const handleAddMember = () => {
    if (newMember.trim() === '') return; // Don't add empty member
    setFormData((prevFormData) => ({
      ...prevFormData,
      members: [...prevFormData.members, newMember],
    }));
    setNewMember(''); // Clear the newMember input field after adding
  };

  
  //handle changes to the input boxes, and then allows the edit of key value pairs.
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Convert formData to JSON string before storing or sending
    const formDataJson = JSON.stringify(formData);
    console.log("IT FUCKING WORKED", formDataJson)

    // Here you can also send the formDataJson to the server
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Group Name:</label>
        <input type="text" name="group_name" value={formData.group_name} onChange={handleInputChange} />
        <label>Group Type:</label>
        <input type="text" name="group_type" value={formData.group_type} onChange={handleInputChange}/>
        <label>New Member:</label>
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button type="button" onClick={handleAddMember}>Add Member</button>

        {/* Display added members */}
        <div>
          <label>Members:</label>
          {formData.members.map((member, index) => (
            <div key={index}>{member}</div>
          ))}
        </div>

        <button type='submit' >Submit</button>
      </form >
    </div>
  );
}

export default Create_Group;
