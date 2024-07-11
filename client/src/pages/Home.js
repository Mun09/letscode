import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/rooms')
            .then(response => setRooms(response.data))
            .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    return (
        <div className="home">
            <h1>Available Rooms</h1>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
