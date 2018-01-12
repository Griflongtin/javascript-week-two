export class DoctorAPIobj {
  constructor(simtom, place, apiKey) {
    this.simtom = simtom;
    this.place = place;
    this.apiKey = apiKey;
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${this.simtom}&location=${this.place}&skip=0&limit=10&user_key=${this.apiKey}`
  }

  

}
