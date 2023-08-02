import React, { useState, useEffect } from 'react';

function Find_Musicians() {
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        return fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error getting data:', error));
    };

    useEffect(() => {
        fetchInfo()
            .then(() => {
                // Handle successful fetch if needed (optional)
            })
            .catch((error) => {
                // Handle error if needed (optional)
            });
    }, []);

    return (
        <div className="container">
            <h1>Musician List</h1>
            <div className="musician-list">
                {/* Musician items will be generated here */}
                {data.map((musician, index) => (
                    <div className="musician-item" key={index}>
                        <div className="musician-details">
                            <button>
                                <div className="musician-image">
                                    <img src="/Screen Shot 2023-08-02 at 6.09.55 PM.png" alt="Musician Image" width = "200" />
                                </div>
                                <h2>Musician Name: {musician.name}</h2>
                                <p>Instrument: {musician.instrument}</p>
                                <p>Description: {musician.description}</p>
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Find_Musicians;

