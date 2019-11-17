const sightingDetails = require('./index.js');

class sightingModel {
  constructor() {
    this.model = sightingDetails;
  }

  async getMostRecentSightingsData() {
    try {
      return await this.model.find({}, '-img').sort('-date').limit(15);
    }
    catch(err) {
      console.log(err);
      throw err;
    }
  }

  async addSighting(sighting) {
    try {
      return await this.model.create(sighting);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getSightingImage(id) {
    try {
      return await this.model.findById(id, 'img');
    } catch(err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = new sightingModel();