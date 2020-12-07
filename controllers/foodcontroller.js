const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const FoodModel = sequelize.import('../models/food');

let validateSession = require('../middleware/validate-session');

router.post('/', validateSession, function (request, response){
    
    let Name = request.body.name;
    let Servings = request.body.servings;
    let Calories = request.body.calories;
    let Date_Eaten = request.body.date_eaten;
    let Meal = request.body.meal;
    let Carbs_in_Grams = request.body.carbs_in_grams;
    let Fat_in_Grams = request.body.fat_in_grams;
    let Protein_in_Grams = request.body.protein_in_grams;
    let Owner = request.user.id;

    FoodModel
    .create({
        name: Name,
        servings: Servings,
        calories: Calories,
        date_eaten: Date_Eaten,
        meal: Meal,
        carbs_in_grams: Carbs_in_Grams,
        fat_in_grams: Fat_in_Grams,
        protein_in_grams: Protein_in_Grams,
        owner_id: Owner
    })
    .then(
        function createSuccess(food){
            response.json({
                food: food
            });
        },
        function createError(err){
            response.send(500, err.message);
        }
    );
});

router.get('/getall', validateSession, function(request, response){
    let userid = request.user.id;

    FoodModel.findAll({
        where: {owner_id: userid}
    })
    .then(
        function findAllSuccess(data) {
            response.json(data);
        },
        function findAllError(err){
            response.send(500, err.message);
        }
    );
});

router.get('/:id', validateSession, function(request, response){
    let data = request.params.id;
    let userid = request.user.id;

    FoodModel
    .findOne({
        where: { id: data }
    }).then(
        function findOneSuccess(data){
            response.json(data);
        },
        function findOneError(err) {
            response.send(500, err.message);
        }
    );

});

router.put('/:id', function (request, response){
    let data = request.params.id
    let Name = request.body.name;
    let Servings = request.body.servings;
    let Calories = request.body.calories;
    let Date_Eaten = request.body.date_eaten;
    let Meal = request.body.meal;
    let Carbs_in_Grams = request.body.carbs_in_grams;
    let Fat_in_Grams = request.body.fat_in_grams;
    let Protein_in_Grams = request.body.protein_in_grams;
    

    FoodModel
    .update({
        name: Name,
        servings: Servings,
        calories: Calories,
        date_eaten: Date_Eaten,
        meal: Meal,
        carbs_in_grams: Carbs_in_Grams,
        fat_in_grams: Fat_in_Grams,
        protein_in_grams: Protein_in_Grams,
        
    },
    {where: {id: data}})
    
    .then(
        function updateSuccess(updatedFood){
            response.json({
                name: Name
            });
        },
        function updateError(err){
            response.send(500, err.message);
        }
    );
});

router.delete('/:id', function(req, res){
    let data = req.params.id;
    

    FoodModel
    .destroy({
        where: { id: data}
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a log");
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    );
});

module.exports = router;