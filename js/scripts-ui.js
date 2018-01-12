import { DoctorAPIobj } from './../js/scripts.js';
const apiKey = require('./../.env').apiKey;


const user = new DoctorAPIobj("back%20pain", 'or-portland', apiKey);

const data = user.callAPI(user.url);

data.then(function(data){
  const doc = JSON.parse(data);
  console.log(doc.data);
  console.log(doc.data[1].profile);
});
