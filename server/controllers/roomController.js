const { Room } = require('../models');

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getRooms };
