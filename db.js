const Sequelize = require('sequelize');

const sequelize = new Sequelize('AllFitness', 'postgres', 'qwerty', {
    host: 'localhost', 
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to AllFitness');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;