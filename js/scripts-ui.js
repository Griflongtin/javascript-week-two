import { DoctorAPIobj } from './../js/scripts.js';
const apiKey = require('./../.env').apiKey;


$(function() {
  $('#inputs').submit(function(event) {
    event.preventDefault();

    const user = new DoctorAPIobj("back%20pain", 'or-portland', apiKey);

    const data = user.callAPI(user.url);

    data.then(function(data){
      const doc = JSON.parse(data);
      console.log(doc.data[0].profile);
      console.log(doc.data);
      for (var i = 0; i < 10; i++) {
        $(".output").append(`<ul>
          <h4>New Profile</h4>
          <li>Name:${doc.data[i].profile.first_name} ${doc.data[i].profile.last_name}</li>
          <img src="${doc.data[i].profile.image_url}" alt="${doc.data[i].profile.first_name} ${doc.data[i].profile.last_name}">
          <li>Gender: ${doc.data[i].profile.gender}</li>
          <li>BIO: ${doc.data[i].profile.bio}</li>
          </ul>`)
      }
    });
  });
});
