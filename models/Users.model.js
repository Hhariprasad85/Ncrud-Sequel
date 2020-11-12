module.exports = (database, Sequelize) => {
    return database.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role:{
            type:Sequelize.STRING,
            allowNull:false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        freezeTableName: true
    });
};