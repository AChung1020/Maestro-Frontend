import React, { useState, useEffect } from 'react';

function Find_Musicians() {
    const [data, setData] = useState([]);

    const fetchInfo = () => {
        return fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error getting data:', error));
                setData([]);
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

    return (
        <div>
            <h1 style={{ color: "black" }}>List of Musicians</h1>
            <center>
                {data.map((dataObj, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                width: "15em",
                                backgroundColor: "gray",
                                padding: 2,
                                borderRadius: 10,
                                marginBlock: 10,
                            }}
                        >
                            <p style={{ fontSize: 20, color: "white" }}>{dataObj.id}</p>
                        </div>
                    );
                })}
            </center>
        </div>
    );
}

export default Find_Musicians;
