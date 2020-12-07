module.exports = function (sequelize, DataTypes) {
    return sequelize.define('food', {
        name: DataTypes.STRING,
        servings: DataTypes.INTEGER,
        calories: DataTypes.INTEGER,
        date_eaten: DataTypes.DATEONLY,
        meal: DataTypes.STRING,
        owner_id: DataTypes.INTEGER,
        protein_in_grams: DataTypes.INTEGER,
        fat_in_grams: DataTypes.INTEGER,
        carbs_in_grams: DataTypes.INTEGER
    });
};