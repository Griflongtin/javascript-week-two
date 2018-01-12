import { DoctorAPIobj } from './../js/scripts.js';
const apiKey = require('./../.env').apiKey;


const user = new DoctorAPIobj("back%20pain", 'or-portland', apiKey);

user.callAPI(user.url, function(data){
  console.log(data, '2');

});
