import { DoctorAPIobj } from './../js/scripts.js';
const apiKey = require('./../.env').apiKey;


$(function() {
  $('#inputs').submit(function(event) {
    event.preventDefault();
    const symptoms = $('#symptoms').val().replace(/ /i, '%20');
    const place = $('#place').val();
    const name = $('#name').val();
    const urlSymptoms = 'query=' + symptoms + '&';
    const urlName = 'name=' + name + '&';
    const user = new DoctorAPIobj(urlSymptoms, urlName, place, apiKey);

    const data = user.callAPI(user.url);

    data.then(function(data){
      const doc = JSON.parse(data);
      console.log(doc.data[0].practices[0].visit_address.city);
      console.log(doc.data);
      for (var i = 0; i < 10; i++) {
        $(".output").append(`<ul>
          <h4>New Profile</h4>
          <li>Name:${doc.data[i].profile.first_name} ${doc.data[i].profile.last_name}</li>
          <img src="${doc.data[i].profile.image_url}" alt="${doc.data[i].profile.first_name} ${doc.data[i].profile.last_name}">
          <li>Gender: ${doc.data[i].profile.gender}</li>
          <li>Office: ${doc.data[i].practices[0].name}</li>
          <ul>
            <li>Address:</li>
            <li>City: ${doc.data[i].practices[0].visit_address.city}</li>
            <li>State: ${doc.data[i].practices[0].visit_address.state_long}</li>
            <li>Street: ${doc.data[i].practices[0].visit_address.street}</li>
            <li>Zip: ${doc.data[i].practices[0].visit_address.zip}</li>
          </ul>
          <li>BIO: ${doc.data[i].profile.bio}</li>
          </ul>`);
      }
    });
  });
});
