import React, { useState, useEffect } from 'react';
import Pool from '../server-AWS/UserPool';

function CreateEvent() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [eventHost, setEventHost] = useState('');
  const [formData, setFormData] = useState({
    eventHost: '',
    eventName: '',
    eventDate: '',
    eventDescription: '',
    eventCost: '',
    eventInstruments: [],
})

  //renders onto the page before the page loads, so we only do this once
  useEffect(() => {
    // When ownerEmail changes, update the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      eventHost: eventHost,
    }));

    const cognitoUser = Pool.getCurrentUser();

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
              setEventHost(email);
              console.log('User email:', email);
            }
          });
        });
      }
  }, [eventHost]);

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

    const formDataWithInstruments = {
      ...formData,
      eventInstruments: selectedOptions,
    };
    // Convert formData to JSON string before storing or sending
    const formDataJson = JSON.stringify(formDataWithInstruments);
    console.log("IT FUCKING WORKED", formDataJson)

    // Here you can also send the formDataJson to the server
  };


  return (
    <div>
      <form onSubmit ={handleSubmit}>
      <label>Event Name:</label>
        <input type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
        <label>Event Date:</label>
        <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange}/>
        <label>Event Description:</label>
        <input type = "text" name="eventDescription" value={formData.eventDescription} onChange={handleInputChange}/>
        <label>Event Pay</label>
        <input type="number" name="eventCost" value={formData.eventCost} onChange={handleInputChange}/>
        <div><DropdownMenu /></div>
        <button type="submit">Create Event</button>
      </form >
    </div>
  );

function DropdownMenu() {
  const options = [
    'Guitar',
    'Viola',
    'Violin',
    'Drums',
    'Saxophone',
    'Trumpet',
    'Tuba',
    'Clarinet',
    'Flute',
    'Cello',
    'Triangle',
    'Bass',
    'Bass Clarinet',
    'Harp',
    'Piano',
    'Bagpipes'
  ];

  const handleOptionToggle = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <h2>Select Instruments</h2>
      <select multiple value={selectedOptions} onChange={() => {}}>
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
            onClick={() => handleOptionToggle(option)}
          >
            {option}
          </option>
        ))}
      </select>
      <p>Selected Instruments: {selectedOptions.join(', ')}</p>
    </div>
  );
}
}
export default CreateEvent;
