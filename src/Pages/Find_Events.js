import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Find_Events() {
    const [data, setData] = useState([]);
    const [showModals, setShowModals] = useState([]); // Separate state for each listing's modal

    const fetchInfo = () => {
        return fetch("http://localhost:8080/api/v1/listing/listing/all")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setShowModals(new Array(data.length).fill(false)); // Initialize all modals to false
            })
            .catch((error) => console.error('Error getting data:', error));
    };

    useEffect(() => {
        fetchInfo()
            .then(() => {
                console.log("success!", data);
            })
            .catch((err) => {
                console.error("Fail!!!", err);
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
        <div>
            <h1 style={{ color: "black" }}>List of Events</h1>
            <center>
                {data.map((dataObj, index) => (
                    <div key={index}>
                        <Button onClick={() => handleShowModal(index)} variant="outline-primary">
                            {dataObj.eventDescription}
                        </Button>
                        <Modal show={showModals[index]} onHide={() => handleCloseModal(index)}>
                            <Modal.Header closeButton>
                                <Modal.Title>{dataObj.eventDescription}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Cost: {dataObj.cost}</p>
                                {/* Add other event information here */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => handleCloseModal(index)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ))}
            </center>
        </div>
    );
}

export default Find_Events;
