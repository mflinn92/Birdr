const express = require('express');
const morgan = require('morgan');
// const Promise = require('bluebird');
const fs = require('fs')
const multer = require('multer');
const upload = multer({dest: './uploads'})
const db = require('../db/models.js');


const PORT = 1234;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.static('./dist'));

//gets 15 most recent sightings
app.get('/sightings', async (req, res) => {
  try {
    const sightings = await db.getMostRecentSightingsData();
    res.json(sightings);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});
//Used to retrieve the image from a particular sighting
app.get('/sightings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { img, contentType } = await db.getSightingImage(id);
    res.contentType = contentType
    res.send(img.data);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

app.post('/sightings', upload.single('sightingPhoto'), async (req, res) => {
  const { file, body } = req;
  console.log(body);
  let imgData = fs.readFileSync(file.path,);
  imgData = imgData.toString('base64');
  let imgBuffer = new Buffer(imgData, 'base64');
  let contentType = file.mimetype;
  // const { sighting } = req.body;
  let sighting = {
		userFirstName: body.userFirstName,
		userLastName: body.userLastName,
		location: body.location,
		species: body.species,
		userID: 45
	};
  sighting.img = {
    data: imgBuffer,
    contentType
  }
  try {
    let response = await db.addSighting(sighting);
    res.json(response);
  } catch(err) {
    console.log(err);
    res.status(404).send('Error saving sighting');
  }
});

app.delete('/sightings', async (req, res) => {
  const { id } = req.body;
  try {
    await db.deleteSighting(id);
    res.send('sighting deleted');
  } catch (err) {
    res.status(400).send('Error deleting sighting');
  }
});

app.listen(PORT, () => {
  console.log('listening at port ' + PORT);
});