const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});
const User = require('./models/userModel.js')(sequelize, DataTypes);
const addUser = async(id) => {
    await User.sync();
    const user = await User.create({ user_id: id });
    console.log(user instanceof User); // true
    console.log(user.user_id); // "456456513"
}

const findAllUsers = async() => {
    await User.sync();
    // Find all users
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
}

const findUsersWhere = async(id) => {
    await User.sync();
    const users = await User.findAll({
        where: {
            user_id: id
        }
    });
    return users;
}

const incrementMessagesOf =  async(id) => {
    findUsersWhere(id)
    .then(users => {
        users.forEach(async (user) => {
            await user.increment('messages');
        });
    });    
}

module.exports = {
    addUser,
    findAllUsers, 
    findUsersWhere, 
    incrementMessagesOf
}