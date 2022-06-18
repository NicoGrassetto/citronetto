module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        user_id: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        tasks: {
            type: DataTypes.JSON
        },
        freezeTableName: true
    });
    return User;
}