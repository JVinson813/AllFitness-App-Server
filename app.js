require('dotenv').config();

var CronJob = require('cron').CronJob;
var cors = require('cors');

let express = require('express');
let app = express();
let test = require('./controllers/testcontroller');
let user = require('./controllers/usercontroller');
let log = require('./controllers/logcontroller');
let food = require('./controllers/foodcontroller');

let sequelize = require('./db');

const http = require("http");
const querystring = require('querystring');
app.use(cors());
sequelize.sync(); //{force:true} for resetting tables

app.use(express.json());
// app.use(require('./middleware/headers'));
app.use('/test', test);
app.use('/user', user);

app.use('/log', log);
app.use('/food', food);




const credentials = JSON.stringify({
    username: process.env.FITNESS_USERNAME,
    password: process.env.FITNESS_PASSWORD
 });
 const global_get_params = {exercisename: 'burpee'};
 
 const global_auth_link_host = "204.235.60.194";
 const global_auth_link_path = "/consumer/login";
 const global_request_host = "204.235.60.194";
 const global_request_path = "/exrxapi/v1/allinclusive/exercises";
 const user_agent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13";
 
 
 function jwt_auth_for_token(credentials) {
    let options = {
        host: global_auth_link_host,
        path: global_auth_link_path,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "User-Agent": user_agent,
          "Connection": "keep-alive",
          "Accept": "*/*",
          "accept-encoding": "gzip, deflate"
        }
      };
     
      let req = http.request(options, function(res) {
          let ended = "";
          res.on('data', (chunk) => {
              ended += chunk;
          });
          res.on("end", () => {
              res = JSON.parse(ended);
              if(typeof res["token"]!=="undefined") {
                let token = res["token"];
                process.env.FITNESS_TOKEN = token;
              } else {
                  console.log("ERROR: Failed API Test. Username/password incorrectly set up at Fusio side or at index.js.");
                  console.log(" Error log: " + res);
              }
          });
      });
     
      req.on('error', (e) => {
          console.log('problem with request: ' + e.message);
      });
     
      // write data to request body
      req.write(credentials);
      req.end();
 
    }


jwt_auth_for_token(credentials);

/*********
 * PROTECTED
 ***********/



app.post('/workout', (request, response) => {
    let options = {
      host: global_request_host,
      path: global_request_path + "?" + querystring.stringify(request.body),
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "User-Agent": user_agent,
        "Connection": "keep-alive",
        "Accept": "*/*",
        "accept-encoding": "gzip, deflate",
        "Authorization": "Bearer " + process.env.FITNESS_TOKEN
      }
    };
   
    let req = http.request(options, function(res) {
        let ended = "";
        res.on('data', (chunk) => {
            ended += chunk;
        });
        res.on("end", () => {
            res = JSON.parse(ended);
            console.log('WORKING', res);
            response.send(res);
        });
    });
   
    req.on('error', (e) => {
        console.log('problem with request: ' + e.message);
    });
   
    // write data to request body
    req.write("");
    req.end();
  }
  )

//   CronJob.schedule('*/59 * * *', function () {
//         jwt_auth_for_token(credentials);
//      }
//   );

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
});

