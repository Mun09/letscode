const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('colab', 'mjy', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const User = require('./user')(sequelize, DataTypes);
const Room = require('./room')(sequelize, DataTypes);
const Message = require('./message')(sequelize, DataTypes);

User.hasMany(Message);
Room.hasMany(Message);
Message.belongsTo(User);
Message.belongsTo(Room);

module.exports = { sequelize, User, Room, Message };
