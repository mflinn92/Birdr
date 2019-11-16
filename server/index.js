const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const upload = multer({dest: './uploads'})
const db = require('../db/models.js');


const PORT = 1234;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('./dist'));

//gets 15 most recent sightings
app.get('/sightings', async (req, res) => {
  try {
    const sightings = await db.getMostRecentSightings();
    res.json(sightings);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

app.post('/sightings', upload.single('sightingPhoto'), async (req, res) => {
  console.log(req.file);
  const { sighting } = req.body;
  try {
    await db.addSighting(sighting);
    res.send('sighting saved!');
  } catch(err) {
    console.log(err);
    res.status(404).send('Error saving sighting');
  }
});

app.listen(PORT, () => {
  console.log('listening at port ' + PORT);
});