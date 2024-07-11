import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Room = ({ match }) => {
    const [code, setCode] = useState('');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = io('http://localhost:5000');

    useEffect(() => {
        const roomId = match.params.id;
        socket.emit('joinRoom', { roomId, userName: 'User1' });

        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('codeUpdate', (newCode) => {
            setCode(newCode);
        });

        return () => {
            socket.disconnect();
        };
    }, [messages, match.params.id]);

    const sendMessage = () => {
        socket.emit('sendMessage', { roomId: match.params.id, userId: 1, content: input });
        setInput('');
    };

    const updateCode = (newCode) => {
        setCode(newCode);
        socket.emit('codeUpdate', { roomId: match.params.id, content: newCode });
    };

    return (
        <div className="room">
            <div className="code-editor">
                <textarea value={code} onChange={(e) => updateCode(e.target.value)} />
            </div>
            <div className="chat">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index}>{msg.user}: {msg.text}</div>
                    ))}
                </div>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
            </div>
        </div>
    );
};

export default Room;
