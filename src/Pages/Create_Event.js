import React, { useState } from 'react';

function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCost, setEventCost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, such as sending data to a backend server.
    // For this example, we'll just log the event details.
    console.log('Event Name:', eventName);
    console.log('Event Date:', eventDate);
    console.log('Event Description:', eventDescription);
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cost:</label>
          <input
          type="number"
          value={eventCost}
          onChange={(e) => setEventCost(e.target.value)}
          required
          />
        </div>
        <div><DropdownMenu /></div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

function DropdownMenu() {
  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4'
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedValues);
  };

  return (
    <div>
      <h2>Select Options</h2>
      <select multiple value={selectedOptions} onChange={handleOptionChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedOptions.length > 0 && (
        <div>
          <p>Selected options:</p>
          <ul>
            {selectedOptions.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateEvent;
