const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const LogModel = sequelize.import('../models/log');

let validateSession = require('../middleware/validate-session');

router.post('/', validateSession, function (request, response){
    console.log(request.body);
    let Exercise = request.body.log.exercise;
    let MuscleGroup = request.body.log.musclegroup;
    let Reps = request.body.log.reps;
    let Weight = request.body.log.weight;
    let Owner = request.user.id;

    LogModel
    .create({
        exercise: Exercise,
        musclegroup: MuscleGroup,
        reps: Reps,
        weight: Weight,
        owner_id: Owner
    })
    .then(
        function createSuccess(log){
            response.json({
                log: log
            });
        },
        function createError(err) {
            response.send(500, err.message);
        }
    );
});

router.get('/getall', validateSession, function(request, response){
    let userid = request.user.id;

    LogModel.findAll({
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

    LogModel
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

router.put('/:id', function(request, response){
    let data = request.params.id;
    let Exercise = request.body.log.exercise;
    let MuscleGroup = request.body.log.musclegroup;
    let Reps = request.body.log.reps;
    let Weight = request.body.log.weight;

    LogModel
    .update({
        exercise: Exercise,
        musclegroup: MuscleGroup,
        reps: Reps,
        weight: Weight

    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog) {
            response.json({
                exercise: Exercise
            });
        },
        function updateError(err){
            response.send(500, err.message);
        }
    )
});

router.delete('/:id', function(req, res){
    let data = req.params.id;
    

    LogModel
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