const express = require('express');
const PORT = 1234;

const app = express();

app.get('/', (req, res) => {
  res.send('Server up');
})

app.listen(PORT, () => {
  console.log('listening at port ' + PORT);
})