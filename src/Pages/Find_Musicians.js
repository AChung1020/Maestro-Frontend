import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Find_Musicians() {
    const [data, setData] = useState([]);
    const [showModals, setShowModals] = useState([]);

    const fetchInfo = () => {
        return fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setShowModals(new Array(data.length).fill(false));
            })

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

    const handleShowModal = (index) => {
        const newShowModals = [...showModals];
        newShowModals[index] = true;
        setShowModals(newShowModals);
    };

    const handleCloseModal = (index) => {
        const newShowModals = [...showModals];
        newShowModals[index] = false;
        setShowModals(newShowModals);
    };

    return (
        <div className="container">
            <h1>Musician List</h1>
            <div className="musician-list">
                {/* Musician items will be generated here */}
                {data.map((musician, index) => (
                    <div className="musician-item" key={index}>
                        <Button onClick={() => handleShowModal(index)} variant="outline-primary">
                            {musician.username}
                        </Button>
                        <div className="musician-details">
                            <Modal show={showModals[index]} onHide={() => handleCloseModal(index)}>
                                <Modal.Header closeButton>
                                    <Modal.Title style={{ color: 'blue', fontSize: '24px' }}>{musician.username}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Instrument: {musician.details}</p>
                                    <p>Description: {musician.description}</p>
                                    <div className="musician-image">
                                        <img src="/Screen Shot 2023-08-02 at 6.09.55 PM.png" alt="Musician Image" width="200" />
                                    </div>
                                    {/* Add other event information here */}
                                </Modal.Body>
                                <Modal.Footer>
                                    {/*<Button variant="secondary" onClick={(dataObj) => }*/}
                                    <Button variant="secondary" onClick={() => handleCloseModal(index)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/*<h2>Musician Name: {musician.name}</h2>*/}
                            {/*<p>Instrument: {musician.details}</p>*/}
                            {/*<p>Description: {musician.description}</p>*/}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Find_Musicians;

