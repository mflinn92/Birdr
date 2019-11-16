const sightingDetails = require('./index.js');

class sightingModel {
  constructor() {
    this.model = sightingDetails;
  }

  async getMostRecentSightings() {
    try {
      return await this.model.find().sort('-date').limit(15);
    }
    catch(err) {
      console.log(err);
      throw err;
    }
  }

  async addSighting(sighting) {
    try {
       await this.model.create(sighting);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = new sightingModel();