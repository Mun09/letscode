const { User, Message } = require('../models');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('joinRoom', ({ roomId, userName }) => {
            socket.join(roomId);
            io.to(roomId).emit('message', { user: 'system', text: `${userName} has joined!` });
        });

        socket.on('sendMessage', async (message) => {
            const { roomId, userId, content } = message;
            const newMessage = await Message.create({ userId, roomId, content });
            const user = await User.findByPk(userId);
            io.to(roomId).emit('message', { user: user.username, text: newMessage.content });
        });

        socket.on('codeUpdate', (code) => {
            const { roomId, content } = code;
            io.to(roomId).emit('codeUpdate', content);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
