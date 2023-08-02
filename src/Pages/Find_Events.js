import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { CognitoUser } from 'amazon-cognito-identity-js'
import UserPool from '../server-AWS/UserPool'

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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ color: "black" }}>List of Events</h1>
            <center>
                {data.map((dataObj, index) => (
                    <div key={index} style={{ marginBottom : '1rem'}}>
                        <Button onClick={() => handleShowModal(index)} variant="outline-primary">
                            {dataObj.eventDescription}
                        </Button>
                        <Modal show={showModals[index]} onHide={() => handleCloseModal(index)}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{ color: 'blue', fontSize: '24px' }}>{dataObj.eventDescription}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Cost: {dataObj.cost}</p>
                                {/* Add other event information here */}
                            </Modal.Body>
                            <Modal.Footer>
                                {/*<Button variant="secondary" onClick={(dataObj) => }*/}
                                <Button variant="secondary" onClick={() => handleCloseModal(index)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                ))}
            </center>
            {/*{data.map((dataObj, index) => (*/}
            {/*    <MyModal*/}
            {/*        key={index}*/}
            {/*        show={showModals[index]}*/}
            {/*        onHide={() => handleCloseModal(index)}*/}
            {/*        eventDescription={dataObj.eventDescription}*/}
            {/*        cost={dataObj.cost}*/}
            {/*    />*/}
            {/*))}*/}

        </div>
    );
}

function MyModal({ show, onHide, eventDescription, cost }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{eventDescription}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Cost: {cost}</p>
                {/* Add other event information here */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Find_Events;
