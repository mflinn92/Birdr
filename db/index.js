const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Birdr', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sightingSchema = new mongoose.Schema({
  userFirstName: String,
  userLastName: String,
  location: String,
  species: String,
  userID: Number,
  img: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const sightingDetails = mongoose.model('sightings', sightingSchema);
sightingDetails.create({location: 'massachusetts'})
  .then((res) => {
    console.log(res);
  });
module.exports = sightingDetails;
