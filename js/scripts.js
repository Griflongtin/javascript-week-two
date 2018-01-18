export class DoctorAPIobj {
  constructor(symptoms, name, place, apiKey) {
    this.symptoms = symptoms;
    this.place = place;
    this.apiKey = apiKey;
    this.name = name;
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?${this.name}${this.symptoms}location=${this.place}&skip=0&limit=10&user_key=${this.apiKey}`;
  }

  callAPI(input) {
    return new Promise(function(returns, error) {
      const request = new XMLHttpRequest();
      const url = input;
      console.log(input);

      request.onload = function() {
        if (this.status === 200){
          returns(request.response);
        } else {
          error(Error(request));
        }
      };
      request.open('GET', url);
      request.send();
    });
  }
}
