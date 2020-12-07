module.exports = function (sequelize, DataTypes) {
    return sequelize.define('log', {
        exercise: DataTypes.STRING,
        musclegroup: DataTypes.STRING,
        reps: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
        owner_id: DataTypes.INTEGER
    });
};