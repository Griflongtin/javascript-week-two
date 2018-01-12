export class DoctorAPIobj {
  constructor(simtom, place, apiKey) {
    this.simtom = simtom;
    this.place = place;
    this.apiKey = apiKey;
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?query=back%20pain&location=or-portland&skip=0&limit=10&user_key=441b09b2f3253eb4ffee8392bf93a28f`
  }

  callAPI(input) {
    return new Promise(function(returns, error) {
      const request = new XMLHttpRequest();
      const url = input;
      console.log(url);

      request.onload = function() {
        if (this.status === 200){
          returns(request.response);
        } else {
          error(Error(request));
        }
      }
      request.open('GET', url);
      request.send();
    });
  }
}
