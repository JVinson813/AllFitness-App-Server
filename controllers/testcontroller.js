let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let TestModel = sequelize.import('../models/test');

/**************************
 * Controller Method #1 Simple Response
 ***********************************/

 router.post('/one', function(req,res){
     res.send('Test 1 worked')
 });

 /*****************************
  * Method #2
  *****************************/

  router.post('/two', function (req,res){
      let testData = "Test data for endpoint two";

      TestModel.create({
          testdata: testData
      }).then(dataFromDatabase => {
          res.send('test two came through')
      })
  });

  /****************************
   * Method #3 req.body
   *****************************/

   router.post('/three', function (req,res){
       let testData = req.body.testdata.item;

       TestModel.create({
           testdata: testData
       })
       res.send('test 3 went through')
       console.log('test three went through');
   });


   router.post('/four', function (req,res){
       let testData = req.body.testdata.item;

       TestModel.create({
           testdata: testData
       })
       .then(
           function message(){
               res.send('test 4 go go');
           }
       );
   });

   /**************************
    * Return data in promise
    ***********************/

    router.post('/five', function(req, res){
        let testData = req.body.testdata.item;

        TestModel.create({
            testdata: testData
        })
        .then(
            function message(data){
                res.send(data);
            }
        );
    });

    /************************
     * Return response as Json
     **************************/

     router.post('/six', function (req,res){
         let testData = req.body.testdata.item;

         TestModel.create({
             testdata: testData
         })
         .then(
             function message(testdata){
                 res.json({
                     testdata: testdata
                 });
             }
         );
     });


     /**************************
      * Handle Errors
      **************************/

      router.post('/seven', function (req,res){
          let testData = req.body.testdata.item;

          TestModel.create({
              testdata: testData
          })
          .then(
              function createSuccess(testdata){
                  res.json({
                      testdata: testdata
                  });

              },
              function createError(err){
                  res.send(500, err.message);
              }
          );
      });


module.exports = router;